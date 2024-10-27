<template>
  <th class="minimal">
    <input v-model="$parent.selected[rowId]" type="checkbox" :class="{'form-check-input' : true}">
  </th>
</template>

<script>

export default {
  props: {
    rowId: {
      required: true,
      type: String,
    },
  },
  methods: {
  },
};
</script>

<style scoped>

</style>