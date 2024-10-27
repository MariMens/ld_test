<template>
  <span v-if="!abraId" title="ABRA: -" class="text-warning"><span class="text-secondary bg-light px-1 rounded" style="cursor: help;">A</span></span>
  <span v-if="abraId" :title="'ABRA: #' + abraId" class="text-warning"><span class="text-white bg-warning px-1 rounded" style="cursor: help;">A</span></span>
</template>

<script>

export default {
  props: {
    abraId: {
      type: Number,
      default: null,
    },
  },
};

</script>