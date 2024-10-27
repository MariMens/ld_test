<template>
  <div :class="[wrap ? wrap + (isRequired ? ' input-required' : '') : (isRequired ? 'input-required' : '')]">
    <div :class="[label ? 'position-relative form-group' : '']">
      <label v-if="label" :for="id" class="">{{ label }}</label>
      <Multiselect v-model="$parent.inputsData[name]" :disabled="isDisabled" :style="'min-width: ' + minWidth + 'px;'" :class="{'disabledFix': isDisabled}" mode="tags" :close-on-select="false" :options="options" :placeholder="placeholder" />
      <div v-if="error" class="invalid-feedback">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect';

export default {
  components: {Multiselect},
  props: {
    label: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    name: {
      default: null,
      type: String,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      required: true,
    },
    id: {
      default: null,
      type: String,
    },
    wrap: {
      default: null,
      type: String,
    },
    parent: {
      default: null,
      type: Object,
    },
    minWidth: {
      default: 130,
      type: Number,
    },
},
  computed: {
    parentControl() {
      return this.parent ? this.parent : this.$parent;
    },
    error() {
      return this?.$parent?.inputsValidation[this.name]?.$errors[0]?.$message ?? null;
    },
    isDisabled() {
      return this.parentControl?.isDisabled || this.disabled;
    },
  }
};
</script>
<style scoped>
.disabledFix {
  align-items: unset !important;
  background-color: red !important;
}
</style>
