<template>
  <button class="btn btn-xs me-1" v-bind="$attrs" :class="{'text-danger': danger, 'btn-outline-secondary': !danger, 'btn-outline-danger': danger}" data-bs-toggle="modal" :data-bs-target="'#modal-comment' + ns">
    <i :class="'fa ' + icon" />&nbsp;{{ count }}
  </button>
</template>

<script>

export default {
  props: {
    count: {
      type: Number,
      required: true
    },
    icon: {
      type: String,
      default: ''
    },
    danger: {
      type: Boolean,
      default: false
    },
  },
  created() {
    this.ns = this.$route.name;
  }
};
</script>

<style scoped>

</style>
