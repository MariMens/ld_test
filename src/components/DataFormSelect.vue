<template>
  <div :class="[wrap ? wrap + (isRequiredByCondition ? ' input-required' : '') : (isRequiredByCondition ? 'input-required' : '')]">
    <div :class="[label ? 'position-relative form-group' : (label === null ? 'd-inline-block' : '')]">
      <label v-if="label" :for="id" class="">{{ label }}</label>
      <select v-model="parentControl.inputsData[name]" v-bind="$attrs" :disabled="isDisabled" :class="{'form-select' : true, 'form-select-sm' :true, 'form-control' : true, 'is-invalid': isInvalid, 'is-empty': parentControl.inputsData[name] === null || parentControl.inputsData[name] === undefined}" @change="$emit('change')">
        <option v-if="prompt" :value="null">
          <template v-if="!dashes">{{ prompt }}</template>
          <template v-else>- {{ prompt }} -</template>
        </option>
        <slot />
        <option v-for="(option, value) in values" :key="propertyValue ? option[propertyValue] : value" :value="propertyValue ? option[propertyValue] : value">{{ propertyName ? option[propertyName] : option }}</option>
      </select>
      <div v-if="error" class="invalid-feedback">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    name: {
      required: true,
      type: String,
    },
    propertyName: {
      default: null,
      type: String,
    },
    propertyValue: {
      default: null,
      type: String,
    },
    label: {
      default: null,
      type: String,
    },
    parent: {
      default: null,
      type: Object,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    prompt: {
      default: null,
      type: String,
    },
    wrap: {
      default: null,
      type: String,
    },
    dashes: {
      default: true,
      type: Boolean,
    },
    values: {
      default: () => {},
      type: Object,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  emits: ['change'],
  computed: {
    parentControl() {
      return this.parent ? this.parent : this.$parent;
    },
    isDisabled() {
      return this.parentControl?.isDisabled || this.disabled;
    },
    isInvalid() {
      return !!this.parentControl.inputsValidation[this.name]?.$errors?.length;
    },
    error() {
      return this.parentControl.inputsValidation[this.name]?.$errors[0]?.$message ?? null;
    },
    isRequiredByCondition() {
      return (this.parentControl?.inputsValidation && !!this.parentControl?.inputsValidation[this.name]?.required) || this.isRequired;
    },
    id() {
      return this.$attrs.id ?? null;
    }
  }
};
</script>

<style scoped>

</style>
