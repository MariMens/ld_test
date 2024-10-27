<template>
  <div class="dropdown d-inline-block" :class="{disabled: disabled || loading || notAllowed}">
    <!-- eslint-disable vue/no-v-html -->
    <button
      class="btn dropdown-toggle btn me-1"
      :class="{'btn-xs': small, 'btn-sm': !small}"
      v-bind="$attrs"
      type="button"
      aria-haspopup="true"
      data-bs-toggle="dropdown"
      data-bs-boundary="body"
      data-boundary="body"
      data-bs-auto-close="true"
      data-toggle="dropdown"
      v-html="html"
    />
    <!--eslint-enable-->
    <div class="dropdown-menu  dropdown-menu" :class="{'dropdown-menu-start' : toggleRight, 'dropdown-menu-end' : !toggleRight}" tabindex="-1" role="menu" aria-hidden="true">
      <slot />
    </div>
  </div>
</template>

<script>

export default
{
  inheritAttrs: false,
  props: {
    loading: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean
    },
    notAllowed: {
      type: Boolean,
      default: false,
    },
    toggleRight: {
      default: false,
      type: Boolean
    },
    small: {
      default: true,
      type: Boolean,
    },
    label: {
      default: null,
      type: String,
    },
    icon: {
      type: String,
      default: 'fa-bolt',
    }
  },
  computed: {
    html() {
      return  this.loading ? ' <i class=\'fa fa-spinner fa-spin\'></i>' + (this.label ? ' ' + this.label : '') : '<i class=\'fa ' + this.icon + '\'></i>' + (this.label ? ' ' + this.label : '') ;
    }
  }
};
</script>

<style scoped>

</style>
