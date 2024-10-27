<template>
  <div :class="[wrap ? wrap : '']" class="d-inline-block">
    <div class="position-relative form-check" :class="{'d-inline-block me-2': inline}">
      <input :id="id" v-model="parentControl.inputsData[name]" v-bind="$attrs" type="checkbox" :class="{'form-check-input' : true, 'is-invalid': isInvalid}" @keydown.enter.prevent="parentControl.parentControl.submit()">
      <label v-if="label" :for="id" class="form-check-label">{{ label }}</label>
    </div>
    <div v-if="error" class="invalid-feedback">
      {{ error }}
    </div>
  </div>
</template>

<script>

export default {
  inheritAttrs: false,
  props: {
    name: {
      required: true,
      type: String,
    },
    label: {
      default: null,
      type: String,
    },
    inline: {
      default: false,
      type: Boolean,
    },
    wrap: {
      default: null,
      type: String,
    },
    parent: {
      default: null,
      type: Object,
    },
  },
  computed: {
    parentControl() {
      return this.parent ? this.parent : this.$parent;
    },
    isInvalid() {
      return !!this.parentControl.inputsValidation[this.name]?.$errors?.length;
    },
    error() {
      return this.parentControl.inputsValidation[this.name]?.$errors[0]?.$message ?? null;
    },
    id() {
      return this.$attrs.id ?? ((this.parentControl?.name ?? '') + this.name);
    }
  }
};
</script>

<style scoped>

</style>
