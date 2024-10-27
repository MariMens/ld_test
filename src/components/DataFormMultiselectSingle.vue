<template>
  <div :class="[wrap ? wrap + (isRequired ? ' input-required' : '') : (isRequired ? 'input-required' : '')]">
    <div :class="[label ? 'position-relative form-group' : '']">
      <label v-if="label" :for="id" class="">{{ label }}</label>
      <Multiselect v-model="model" style="min-width: 130px;" :append-new-option="false" mode="single" :searchable="true" :close-on-select="true" :options="options" :placeholder="placeholder" @select="emit('select', model)" />
    </div>
  </div>
</template>

<script setup>

import {defineModel, defineProps, defineEmits, computed, getCurrentInstance} from 'vue';
import Multiselect from '@vueform/multiselect';

let model = defineModel();
const emit = defineEmits(['select']);

const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: '',
  },
  options: {
    type: Object,
    required: true,
  },
  id: {
    default: null,
    type: String,
  },
  name: {
    default: null,
    type: String,
  },
  wrap: {
    default: null,
    type: String,
  },
});


const instance = getCurrentInstance();
const isRequired = computed(() => props.name ? (instance.parent?.proxy.inputsValidation && !!instance.parent?.proxy.inputsValidation[props.name]?.required) : false);

</script>

<style scoped>

</style>
