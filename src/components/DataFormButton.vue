<template>
  <button v-bind="$attrs" type="button" class="btn">
    <span v-if="loading" class="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true" />
    <slot />
  </button>
</template>

<script>

export default {
  props: {
    parent: {
      default: null,
      type: Object,
    },
  },
  computed: {
    form() {
      return this.parent ? this.parent.form : this.$parent.form;
    },
    loading() {
      return this.form ? this.form.loading : false;
    }
  }
};
</script>

<style scoped>

</style>