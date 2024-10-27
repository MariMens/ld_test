<template>
  <button class="btn btn-xs btn-success me-1" @click="$router.push(route)">
    <i class="fa fa-edit" />
    <slot />
  </button>
</template>

<script>

export default {
  props: {
    route: {
      type: Object,
      required: true,
    }
  }
};
</script>

<style scoped>

</style>
