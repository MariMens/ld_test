<template>
  <div ref="scroller" style="overflow: auto" @scroll.passive="scrollScroller" @mousewheel.passive="scrollScroller">
    <div :style="'width:' + width + 'px; height: 1px;'" />
  </div>
  <div ref="tableContainer" class="table-responsive vue-grid" v-bind="$attrs" @mousewheel.passive="scrollGrid">
    <loading :active="loading && !infinityLoading" :can-cancel="false" :is-full-page="false" loader="bars" color="gray" />
    <table ref="myElement" class="mb-1 table vue-grid" :class="{'table-sm': sm}">
      <thead>
        <slot name="header" :select-all="selectAll" :order-by="(value) => executeOrderBy(value)" />
      </thead>
      <tbody>
        <template v-for="item in items" :key="item.uuid">
          <slot name="body" :item="item" :selected="selected" :changed="changed[item.uuid]" :delete-row="(callback = null) => deleteRow(item, callback)" :update-row="(value) => updateRow(item, value)" />
        </template>
        <tr v-if="Object.values(items).length === 0 || loading">
          <td v-if="!loading && !error" class="text-sm-left text-center text font-italic" colspan="100%">
            <slot name="empty">K zobrazení nejsou žádné záznamy. Přidejte záznam nebo změňte nastavení filtru.</slot>
          </td>
          <td v-if="infinityLoading" class="text-sm-left text-center text font-italic" colspan="100%">
            <i class="fa fa-spinner fa-pulse" /> Záznamy se načítají ...
          </td>
          <td v-if="error" colspan="100%" class="text-sm-left text-center text font-italic text-danger">
            <i class="fa fa-exclamation-triangle" /> Nastala chyba při načítání dat. Opakujte akci nebo se zkuste znovu přihlásit.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import {debounce} from 'lodash-es';
import axios from 'axios';

export default {
  components: {Loading},
  props: {
    filters: {
      default: () => {},
      type: Object
    },
    order: {
      default: () => {},
      type: Object
    },
    url: {
      required: true,
      type: String
    },
    sm: {
      type: Boolean,
      default: true,
    },
    page: {
      type: Number,
      default: 1,
    },
    onPage: {
      type: Number,
      default: 30,
    }
  },
  emits: ['load', 'select'],
  data() {
    return {
      ro: null,
      width: 0,
      selected: {},
      changed: {},
      items: {},
      itemsCount: 0,
      orderby: {},
      loading: false,
      infinityLoading: false,
      error: false,
      scrollingPage: 1,
      lastLoadCount: null,
      processData: debounce(function() {
        this.scrollingPage = 1;
        this.loadData();
      }, 50)
    };
  },
  computed: {
    selectAll: {
      get: function () {
        return this.items ? (this.selectedCount === Object.keys(this.items).length && Object.keys(this.items).length > 0) : false;
      },
      set: function (value) {
        Object.keys(this.selected).forEach(v => this.selected[v] = value);
      }
    },
    selectedCount: function () {
      return this.selectedIds().length;
    },
  },
  watch: {
    selected: {
      handler: function () { this.$emit('select', this); },
      deep: true
    },
    filters: {
      handler: function (filters) {
        this.processData(filters);
      },
      deep: true
    }
  },
  created() {
    window.onscroll = this.scroll;
    this.loadData();
    this.orderby = Object.assign(this.orderby, this.order);
    this.justLoaded = true;
  },
  mounted() {
    this.ro = new ResizeObserver(this.onResize);
    this.ro.observe(this.$refs.myElement);
  },
  beforeUnmount () {
    this.ro.unobserve(this.$refs.myElement);
  },
  unmounted() {
    window.onscroll = null;
  },
  activated () {
    if (!this.justLoaded) {
      this.loadData(null, false, false);
      this.orderby = Object.assign(this.orderby, this.order);
    }

    window.onscroll = this.scroll;

    this.justLoaded = false;
  },
  deactivated() {
    window.onscroll = null;
  },
  methods: {
    onResize () {
      if (this.$refs.myElement) {
        this.width = this.$refs.myElement.clientWidth;
      }
    },
    scrollGrid: function () {
      let container = this.$refs.tableContainer;
      let scroller = this.$refs.scroller;

      scroller.scrollLeft = container.scrollLeft;
    },
    scrollScroller: function () {
      let container = this.$refs.tableContainer;
      let scroller = this.$refs.scroller;

      container.scrollLeft = scroller.scrollLeft;
    },
    scroll: function () {
      let element = this.$refs.tableContainer;

      if (element.getBoundingClientRect().bottom - 10 < window.innerHeight) {

        if (!this.loading && this.itemsCount > Object.values(this.items).length) {
          this.loadData( ++this.scrollingPage, true, false);
        }
      }
    },
    reloadRows(uuids) {
      console.log('reloading rows', uuids);
      if (uuids.length === 0) {
        return;
      }

      axios.get(this.url, {params: {ids: uuids},}).then(response => {
        for (let uuid in response.data.items) {
          if (this.items[uuid]) {
            this.items[uuid] = response.data.items[uuid];
            console.log('marked as change');
            this.markRowsAsChanged(uuid);
          }
        }
      });
    },
    removeRows: function (uuids) {
      for (let uuid in uuids) {
        delete this.items[uuid];
      }
    },
    markRowsAsChanged(uuid) {
      this.changed[uuid] = true;

      setTimeout(() => {
        delete this.changed[uuid];
      }, 1000);
    },
    removeSelected() {
      Object.keys(this.items).forEach((value) => this.selected[value] = false);
    },
    loadData: function (page = null, append = false, loadMoreIfScreenNotFit = true) {
      if (append) {
        this.infinityLoading = true;
      }
      this.loading = true;

      let params = {};
      params.page = page ? page : this.page;
      params.onpage = this.onPage;

      if (this.orderby && Object.keys(this.orderby).length) {
        params.order = this.orderby.column + '-' + (this.orderby.direction ? 'ASC' : 'DESC');
      }

      if (this.filters) {
        Object.keys(this.filters).forEach((key) => {
          params[key] = this.filters[key];
        });
      }

      this.error = false;

      axios.get(this.url, { params: params,}).then(response => {
        if (append) {
          Object.keys( response.data.items).forEach((value) => this.items[value] = response.data.items[value]);
        } else {
          Object.keys( this.items).forEach((value) => delete this.items[value]);
          Object.keys( response.data.items).forEach((value) => this.items[value] = response.data.items[value]);
        }

        this.lastLoadCount = Object.keys(response.data.items).length;
        if (response.data.totalItemCount !== null) {
          this.itemsCount = response.data.totalItemCount;
        }

        this.selected = {};
        Object.keys(this.items).forEach((value) => this.selected[value] = false);

        this.$emit('load', this);
      }).catch(() => {
        this.error = true;
        if (Object.values(this.items).length) {
          this.$toast.error('Nasatala chyba při načítání dat');
        }

      }).finally(() => {
        this.loading = false;
        this.infinityLoading = false;
      }).then(() => {
        let element = this.$refs.tableContainer;
        if ((window.innerHeight > element.getBoundingClientRect().bottom - 10 && this.lastLoadCount >= this.onPage) && loadMoreIfScreenNotFit) {
          this.loadData( ++this.scrollingPage, true);
        }
      });
    },
    reload: function () {
      this.loadData();
    },
    updateRow: function (item, data) {
      if (JSON.stringify(item) === JSON.stringify(Object.assign(item, data))) {
        return;
      }

      axios.patch(this.url + '/' + item.uuid, data).then(() => {
        this.$toast.success('Položka upravena');
      });
    },
    removeRow: function (item) {
      delete this.items[item.uuid];
    },
    deleteRows: function (ids, callback = null) {
      axios.delete(this.url, {params: {ids: ids}}).then(() => {
        Object.keys(this.selected).forEach((value) => delete this.selected[value]);
        this.itemsCount = this.itemsCount - ids.length;
        this.loadData();
        if (callback) {
          callback();
        }
        this.$toast.success('Položky smazány');
      }).catch(() => {
        this.$toast.error('Položky nelze smazat');
      });
    },
    deleteRow: function (item, callback = null) {
      axios.delete(this.url + '/' + item.uuid).then(() => {
        delete this.selected[item.uuid];
        this.itemsCount--;
        this.loadData();
        if (callback) {
          callback();
        }
        this.$toast.success('Položka smazána');
      }).catch(() => {
        this.$toast.error('Položku nelze smazat');
      });
    },
    executeOrderBy: function (order) {
      // this.$router.push({ query: {order: order + '-' + (order.direction ? 'ASC' : 'DESC')}});
      if (this.orderby.column === order) {
        this.orderby.direction = !this.orderby.direction;
      } else {
        this.orderby.direction = true;
      }

      this.orderby.column = order;
      this.loadData();
      //this.selected = [];

    },
    selectedIds: function (filterCallback = null, propertyName = null) {
      Object.filter = (obj, predicate) =>
          Object.keys(obj)
              .filter( key => predicate(obj[key]) )
              .reduce( (res, key) => (res[key] = obj[key], res), {} );

      const ids = filterCallback ? Object.keys(Object.filter(this.selected, w => w === true)).filter(filterCallback) : Object.keys(Object.filter(this.selected, w => w === true));

      if (!propertyName) {
        return ids;
      }

      const propertyIds = [];
      ids.forEach((id) => {
        propertyIds.push(this.items[id][propertyName]);
      });

      return propertyIds;
    }
  }
};
</script>

<style scoped>

</style>
