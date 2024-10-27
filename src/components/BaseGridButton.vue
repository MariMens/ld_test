<template>
  <button class="btn btn-xs btn-outline-secondary ms-1 me-1"><i v-if="loading" class="fa fa-spinner fa-spin" /><i v-else :class="'fa ' + icon" /> <slot /></button>
</template>

<script>

export default {
  props: {
    icon: {
      type: String,
      default: ''
    },
    loading: {
      default: false,
      type: Boolean,
    },
  },
};

</script>