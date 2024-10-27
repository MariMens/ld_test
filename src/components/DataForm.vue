<template>
  <div :class="[wrap ? wrap : '']">
    <form ref="form" v-bind="$attrs" @submit.prevent="submit">
      <slot />
    </form>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'DataForm',
  provide() {
    return {
      validation: this.validation,
      data: this.data,
    };
  },
  props: {
    request: {
      type: Object,
      default: null
    },
    url: {
      default: null,
      type: String,
    },
    include: {
      default: null,
      type: String,
    },
    dataIndex: {
      default: 'inputs',
      type: String,
    },
    id: {
      default: null,
      type: String,
    },
    validation: {
      default: null,
      type: Object
    },
    data: {
      type: Object,
      required: true
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    omit: {
      type: Array,
      default: () => [],
    },
    successMessage: {
      default: '',
      type: String,
    },
    errorMessage: {
      default: 'Akce se nezdařila',
      type: String,
    },
    wrap: {
      default: null,
      type: String,
    },
  },
  emits: ['submit', 'success', 'error', 'load'],
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    parentControl() {
      return this;
    },
    inputsData() {
      return this.data;
    },
    inputsValidation() {
      return this.validation ? this.validation[this.dataIndex] : {};
    },
    isDisabled() {
      return this.disabled;
    },
  },
  activated() {
    if (this.url && this.id) {
      let url = this.url + '/' + this.id;
      if (this.include) {
        url += '?include=' + this.include;
      }

      axios.get(url).then((response) => {
        Object.assign(this.data, response.data.result);
        this.$emit('load', response);
      });
    }
  },
  methods: {
    reload() {
      if (this.url && this.id) {
        axios.get(this.url + '/' + this.id).then((response) => {
          Object.assign(this.data, response.data.result);
        });
      }
    },
    submit(amend = {}, customSuccessMessage = null, customErrorMessage = null) {
      if (this.validation && this.validation[this.dataIndex]) {
        this.validation[this.dataIndex].$touch();
      }

      let currentRequest = {};

      if (!this.request && this.url) {
        Object.assign(currentRequest, this.id ? {url: this.url + '/' + this.id, method: 'patch'} : {url: this.url, method: 'post'});
      } else if (this.request) {
        Object.assign(currentRequest, this.request);
      }


      Object.keys(amend).forEach((key) => {
        if (currentRequest.data === undefined) {
          currentRequest.data = {};
        }

        currentRequest.data[key] = amend[key];
      });

      if (Object.keys(currentRequest).length !== 0 && (!this.validation || !this.validation[this.dataIndex] || !this.validation[this.dataIndex].$invalid)) {

        this.$emit('submit');
        Object.assign(currentRequest, {data: Object.assign(Object.assign({}, this.data), currentRequest.data ?? {})});

        this.omit.forEach(value => {
          delete currentRequest.data[value];
        });
        this.loading = true;

        axios.request(currentRequest).then((response) => {
          this.loading = false;

          if (this.validation && this.validation[this.dataIndex]) {
            this.validation[this.dataIndex].$reset();
          }

          if (customSuccessMessage || this.successMessage) {
            this.$toast.success(customSuccessMessage || this.successMessage);
          }

          this.$emit('success', response.data.result);
        }).catch((response) => {
          this.loading = false;

          if (customErrorMessage || this.errorMessage) {
            this.$toast.error(customErrorMessage || this.errorMessage);
          }

          this.$emit('error', response);
        });
      } else if (this.validation && this.validation[this.dataIndex] && this.validation[this.dataIndex].$invalid) {
        this.validation[this.dataIndex].$errors.every(error => {
          const element = document.getElementById(error.$property);
          if (element) {
            element.focus();
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});

            return false;
          }

          return true;
        });
      }
    }
  },
};
</script>

<style scoped>

</style>
