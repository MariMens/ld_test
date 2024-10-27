<template>
  <button class="btn btn-outline-secondary btn-xs me-1" v-bind="$attrs" type="button" @click="exportData">
    <i v-if="!loading" class="fa fa-download" />
    <span v-if="loading" class="fa fa-spinner fa-spin" />
  </button>
</template>

<script>
import axios from 'axios';

export default {
  components: {},
  inject: ['lists'],
  props: {
    url: {
      required: true,
      type: String,
    },
    filters: {
      default: () => ({}),
      type: Object
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    exportData: function () {
      let data = {_op: 'export'};
      this.$toast.info('Data se exportují, prosím strpení ... ');
      this.loading = true;
      axios.request({
        method: 'post',
        url: this.url,
        params: this.filters,
        data: data,
      }).then((response) => {
        this.$helpers.download(response.data, 'export.csv');
        this.loading = false;
      });
    },
  }
};
</script>