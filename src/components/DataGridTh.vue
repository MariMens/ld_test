<template>
  <th v-bind="$attrs" style="white-space: nowrap" @click="handleClick"><slot /><span v-if="order" class="ms-1 pe-1"><i class="fa" :class="icon" /></span></th>
</template>

<script>

export default {
  props: {
    order: {
      type: String,
      default: null,
    }
  },
  computed: {
    icon: function () {
      if (this.$parent.orderby.column === this.order) {
        return this.$parent.orderby.direction ? 'fa-sort-up' : 'fa-sort-down';
      }

      return 'fa-sort';
    }
  },
  methods: {
    handleClick: function () {
      if (this.order) {
        this.$parent.executeOrderBy(this.order);
      }
    }
  },
};
</script>

<style scoped>

</style>