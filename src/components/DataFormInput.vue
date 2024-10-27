<template>
  <div :class="[wrap ? wrap + (isRequiredByCondition ? ' input-required' : '') : (isRequiredByCondition ? 'input-required' : '')]">
    <div :class="[label ? 'position-relative form-group' : '']">
      <label v-if="label || $slots.default" :for="id" class=""><slot />{{ label }}</label>
      <input
        v-if="type !== 'tel'"
        :id="id"
        ref="input"
        v-model="parentControl.inputsData[name]"
        :name="$attrs['autocomplete'] ? name : null"
        :type="type === 'float' ? 'number' : (type === 'fromDate' || type === 'toDate') ? 'date' : type"
        :min="type === 'fromDate' && !unlockValidation ? today : ''"
        :max="type === 'toDate' && !unlockValidation ? today : ''"
        v-bind="$attrs"
        class="pe-2"
        :class="{'form-control-sm' : true, 'form-control' :true, 'is-invalid': isInvalid, 'is-empty': parentControl.inputsData[name] === null || parentControl.inputsData[name] === undefined}"
        :disabled="isDisabled"
        @keypress="filter"
        @keydown.enter.prevent="enter"
        @change="change"
      >

      <vue-tel-input v-if="type === 'tel'" ref="phoneEl" v-bind="$attrs" v-model="computedPhone" :disabled="isDisabled" :mode="'international'" :input-options="{ id: id, type: 'tel' }" :style-classes="{'border-left-danger': isRequiredByCondition, 'is-empty': !parentControl.inputsData[name]}" :valid-characters-only="true" @keydown.enter.prevent="enter" />

      <div v-if="error" class="invalid-feedback">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import { VueTelInput } from 'vue-tel-input';
import moment from 'moment';

export default {
  components: { VueTelInput },
  props: {
    id: {
      default: null,
      type: String,
    },
    unlockValidation: {
      default: false,
      type: Boolean,
    },
    name: {
      default: null,
      type: String,
    },
    regex: {
      default: null,
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
    isRequired: {
      type: Boolean,
      default: null,
    },
    // 'fromDate, toDate, date, tel, float, number, text (default)'
    type: {
      default: 'text',
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
    submitOnEnter: {
      default: true,
      type: Boolean,
    },
  },
  emits: ['mount'],
  computed: {
    computedPhone: {
      get() {
        return this.parentControl.inputsData[this.name] ? this.parentControl.inputsData[this.name].toString() : '';
      },
      set(val) {
        this.parentControl.inputsData[this.name] = val;
      }
    },
    parentControl() {
      return this.parent ? this.parent : this.$parent;
    },
    isDisabled() {
      return this.parentControl?.isDisabled || this.disabled;
    },
    isInvalid() {
      return !!this.parentControl.inputsValidation[this.name]?.$errors?.length;
    },
    isRequiredByCondition() {
      return this.isRequired === null ? (this.parentControl?.inputsValidation && !!this.parentControl?.inputsValidation[this.name]?.required) : this.isRequired;
    },
    error() {
      return this.parentControl.inputsValidation[this.name]?.$errors[0]?.$message ?? null;
    },
    today: function () {
      return moment().format('YYYY-MM-DD');
    }
  },
  mounted() {
    this.$emit('mount');
  },
  methods: {
    resetPhone() {
      this.$refs.phoneEl.choose('CZ');
      this.parentControl.inputsData[this.name] = '';
    },
    enter: function () {
      if (this.submitOnEnter && (this.type !== 'date' && this.type !== 'datetime-local' && this.type !== 'toDate' && this.type !== 'fromDate')) {
        this.parentControl.parentControl.submit();
      }
    },
    change: function () {
      if (this.type === 'date' || this.type === 'datetime-local' || this.type === 'toDate' || this.type === 'fromDate') {
        this.parentControl.inputsData[this.name] = this.parentControl.inputsData[this.name] === '' || this.parentControl.inputsData[this.name] === null ? null : this.parentControl.inputsData[this.name];
      }

      if (this.type === 'number') {
        this.parentControl.inputsData[this.name] = this.parentControl.inputsData[this.name] === '' || this.parentControl.inputsData[this.name] === null ? null : parseInt(this.parentControl.inputsData[this.name]);
      }

      if (this.type === 'float') {
        this.parentControl.inputsData[this.name] = this.parentControl.inputsData[this.name] === '' || this.parentControl.inputsData[this.name] === null ? null : parseFloat(this.parentControl.inputsData[this.name]);
      }
    },
    filter: function ($event) {
      if (this.regex) {
        const regexp = new RegExp(this.regex);
        if (!regexp.test($event.key) || $event.key === 'Enter') {
          $event.preventDefault();
          return;
        }
      }
      if (this.type === 'number') {
        let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
          $event.preventDefault();
        }
      }
    },
  },
};
</script>

<style scoped>

</style>