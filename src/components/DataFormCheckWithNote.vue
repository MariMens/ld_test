<template>
  <div :class="[wrap ? wrap : '']">
    <div :class="[label ? 'position-relative form-group' : '']">
      <div class="position-relative form-check">
        <input :id="id" v-model="$parent.inputsData[name]" v-bind="$attrs" type="checkbox" :class="{'form-check-input' : true, 'is-invalid': isInvalid}" @click="$parent.inputsData[name + 'Note'] = ''">
        <label v-if="label" :for="id" class="form-check-label">{{ label }}</label>
      </div>
      <input v-model="$parent.inputsData[name + 'Note']" placeholder="Poznámka ..." :class="{'form-control-sm' : true, 'form-control' :true}" :disabled="!$parent.inputsData[name]">
      <div v-if="error" class="invalid-feedback">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  inject: ['data', 'validation'],
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
    wrap: {
      default: null,
      type: String,
    },
  },
  computed: {
    isInvalid() {
      return !!this.$parent.inputsValidation[this.name]?.$errors?.length;
    },
    error() {
      return this.$parent.inputsValidation[this.name]?.$errors[0]?.$message ?? null;
    },
    id() {
      return this.$attrs.id ?? ((this.parentControl?.name ?? '') + this.name);
    }
  },
};
</script>

<style scoped>

</style>
