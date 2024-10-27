<template>
  <button class="btn btn-xs me-1" v-bind="$attrs" :class="{'text-danger': danger, 'btn-outline-secondary': !danger, 'btn-outline-danger': danger}">
    <i class="fa fa-comment-o" />&nbsp;{{ count }}
  </button>
</template>

<script>

export default {
  components: { },
  props: {
    count: {
      type: Number,
      required: true
    },
    danger: {
      type: Boolean,
      default: false
    },
  },
};
</script>

<style scoped>

</style>
