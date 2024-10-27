<template>
  <div :class="[wrap ? wrap : '']">
    <DataFormContainer v-if="name" :parent="$parent" :name="name">
      <template v-if="label"><label class="">{{ label }}</label><br></template>
      <DataFormCheck v-for="(lbl, aux) in values" :key="aux" :name="aux" :label="propertyName ? lbl[propertyName] : lbl" :inline="true" />
    </DataFormContainer>
    <DataFormCheck v-for="(lbl, aux) in values" v-else :key="aux" :parent="$parent" :name="aux" :label="lbl" :inline="true" />
  </div>
</template>

<script>

import DataFormCheck from './DataFormCheck.vue';
import DataFormContainer from './DataFormContainer.vue';

export default {
  components: {DataFormCheck, DataFormContainer},
  props: {
    values: {
      required: true,
      type: Object,
    },
    wrap: {
      default: null,
      type: String,

    },
    name: {
      default: null,
      type: String,
    },
    propertyName: {
      default: null,
      type: String,
    },
    label: {
      default: null,
      type: String,
    },
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>

</style>