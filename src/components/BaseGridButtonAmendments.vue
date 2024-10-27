<template>
  <span :title="disabled ? disabledMessage : null">
    <button class="btn btn-xs me-1" :class="{'text-danger': danger, 'btn-secondary': !danger, 'btn-outline-danger': danger}" :disabled="disabled" data-bs-toggle="modal" :data-bs-target="'#amendmentsModal-' + ns">
      <i :class="'fa ' + icon" />&nbsp;{{ count }}
    </button>
  </span>
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
    disabled: {
      type: Boolean,
      default: false
    },
    ns: {
      type: String,
      default: ''
    },
    disabledMessage: {
      type: String,
      default: ''
    },
  }
};
</script>

<style scoped>

</style>
