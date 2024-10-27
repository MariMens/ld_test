<template>
  <div :class="[label ? 'position-relative form-group' : '']">
    <label v-if="label" :for="id" class="">{{ label }}</label>
    <textarea v-model="$parent.inputsData[name]" v-bind="$attrs" :disabled="isDisabled" :class="{'form-control-sm' : true, 'form-control' :true, 'is-invalid': isInvalid, 'is-empty': !$parent.inputsData[name]}" />
    <div v-if="error" class="invalid-feedback">
      {{ error }}
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
    label: {
      default: null,
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    isDisabled() {
      return this.$parent?.isDisabled || this.disabled;
    },
    isInvalid() {
      return !!this.$parent.inputsValidation[this.name]?.$errors?.length;
    },
    error() {
      return this.$parent.inputsValidation[this.name]?.$errors[0]?.$message ?? null;
    },
    id() {
      return this.$attrs.id ?? null;
    }
  }
};
</script>

<style scoped>

</style>
