<template>
  <button v-if="ids !== null" type="button" class="btn btn-xs btn-outline-secondary ms-1 me-1" :style="'position: relative; top: -' + top + 'px;'" @click="$router.push({'name': link, 'query': {[queryName]: ids}, 'hash': hash})">
    <slot />
  </button>
  <span v-else>{{ defaultValue }}</span>
</template>

<script>

export default {
  props: {
    link: {
      type: String,
      required: true,
    },
    ids: {
      type: [Number, String],
      default: null,
    },
    queryName: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      default: null,
    },
    top: {
      type: Number,
      default: 1,
    },
    defaultValue: {
      type: String,
      default: '-',
    }
  },
};

</script>