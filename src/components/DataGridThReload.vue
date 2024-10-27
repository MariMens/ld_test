<template>
  <th class="minimal">
    <slot />
    <div class="d-inline me-2 text-secondary" style="font-size: 0.8em;" @click="handleClick">
      <i class="fa fa-check-square-o" /> {{ $parent?.selectedCount ?? 0 }} / <i class="fa fa-list" /> {{ $parent?.itemsCount ?? 0 }}
    </div>
  </th>
</template>

<script>

export default {
  methods: {
    handleClick: function () {
      this.$parent.loadData();
    }
  },
};
</script>

<style scoped>

</style>