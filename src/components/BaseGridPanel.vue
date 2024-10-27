<template>
  <div class="pe-2">
    <slot :selected-number="grid?.selectedCount" :delete-rows="handleDelete" />
  </div>
</template>

<script>

import axios from 'axios';

export default {
  props: {
    grid: {
      validator: (p) => {
        return typeof p === 'object' || p === null;
      },
      default: null,
      type: Object,
    },
  },
  methods: {
    handleDelete: function () {
      axios.delete(this.grid.url, {params: {ids: this.grid.selectedIds()}}).then(() => {
        // TODO: vymazat i selected a změnit items count
        this.grid.removeItems(this.grid.selectedIds());

        this.$toast.success('Položky smazána');
      }).catch(() => {
        this.$toast.error('Položku nelze smazat');
      });
    }
  }
};
</script>

<style scoped>

</style>
