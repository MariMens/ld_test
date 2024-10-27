<template>
  <DataForm :disabled="disabled" :data="filters" class="d-flex align-items-center flex-wrap gap-1 grid-filter">
    <div class="flex-shrink-0">
      <DataFormInput name="idn" min="0" :placeholder="idPlaceholder" :style="idPlaceholder === 'id' ? 'max-width: 70px;' : 'max-width: 90px;'" type="number" />
    </div>
    <slot />
    <div class="flex-shrink-0">
      <BaseButtonCancel :disabled="JSON.stringify(filters) === JSON.stringify(defaultFilters)" @click="clearFilters(false)" />
    </div>
  </DataForm>
</template>

<script>

export default {
  components: {},
  inject: ['lists', 'user'],
  props: {
    filters: {
      required: true,
      type: Object,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    defaultFilters: {
      required: true,
      type: Object,
    },
    idPlaceholder: {
      default: 'id',
      type: String,
    },
  },
  emits: ['clear'],
  data() {
    return {
    };
  },
  mounted() {

  },
  activated() {
    if (this.$route.query.idn) {
      this.filters['idn'] = this.$route.query.idn;
    }

    if (this.$route.query.ide) {
      this.filters['ide'] = this.$route.query.ide;
    }

    if (this.$route.query.type) {
      this.filters['type'] = [this.$route.query.type];
    }

    if (this.$route.query.user) {
      this.filters['user'] = [this.$route.query.user];
    }

    if (this.$route.query.kp) {
      this.filters['kp'] = Array(this.$route.query.kp);
    }

    if (this.$route.query.userID) {
      this.filters['user'] = '#' + this.$route.query.userID;
    }

    if (this.$route.query.propertyID) {
      this.filters['property'] = '#' + this.$route.query.propertyID;
    }

    if (this.$route.query.ido) {
      this.filters['owner'] = '#' + this.$route.query.ido;
    }

    if (this.$route.query.idt) {
      this.filters['tenant'] = '#' + this.$route.query.idt;
    }
  },
  methods: {
    clearFilters: function (raw = false) {
      if (!raw) {
        this.$router.replace({query: {}});
      }

      Object.keys(this.filters).forEach(key => delete this.filters[key]);
      Object.assign(this.filters, this.defaultFilters);

      if (!raw) {
        this.$emit('clear');
      }
    },
  }
};
</script>