<template>
  <BaseGridDropdownItem>
    {{ value ? trueLabel : falseLabel }}
  </BaseGridDropdownItem>
</template>

<script>

export default {
  components: {},
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    trueLabel: {
      type: String,
      required: true,
    },
    falseLabel: {
      type: String,
      required: true,
    },
  }
};
</script>

<style scoped>

</style>
