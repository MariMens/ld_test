<template>
  <div v-if="inputsData">
    <slot />
  </div>
</template>

<script>

export default {
  inject: ['validation'],
  expose: ['parentControl', 'inputsData', 'inputsValidation', 'isDisabled', 'parent'],
  props: {
    name: {
      default: '',
      type: String,
    },
    parent: {
      default: null,
      type: Object,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    index: {
      default: null,
      type: [Number, String, Array],
    },
    direct: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    isDisabled() {
      return this.disabled;
    },
    parentControl() {
      return this.parent ? this.parent : this.$parent;
    },
    inputsData() {
      if (this.direct) {
        return this.parentControl.data;
      }

      if (Array.isArray(this.index)) {
        let aux =  this.parentControl.data[this.name];
        this.index.forEach((itemName) => {
          if (itemName) {
            aux = aux[itemName];
          }
        });

        return aux;
      }

      return this.index !== null ? this.parentControl.data[this.name][this.index] : this.parentControl.data[this.name];
    },
    inputsValidation() {
      return this.validation ? (this.validation.inputs[this.name] ?? {}) : {};
    }
  }
};
</script>

<style scoped>

</style>