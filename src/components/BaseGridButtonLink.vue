<template>
  <button v-if="id !== null" type="button" class="btn btn-xs btn-outline-secondary ms-1 me-1" :style="'position: relative; top: -' + top + 'px;'" @click="$router.push({'name': link, 'params': {id: id}})">
    <slot />
  </button>
  <span v-else><slot /><template v-if="isEmpty">{{ defaultValue }}</template></span>
</template>

<script>

export default {
  props: {
    link: {
      type: String,
      required: true,
    },
    id: {
      type: [Number, String],
      default: null,
    },
    top: {
      type: Number,
      default: 1,
    },
    defaultValue: {
      type: String,
      default: '-',
    },
    isEmpty: {
      type: Boolean,
      default: true,
    }
  },
};

</script>