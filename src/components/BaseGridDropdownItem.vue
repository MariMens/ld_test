<template>
  <span :title="disabled && !notAllowed ? disabledMessage : (notAllowed ? messages.notAllowed : null)" :style="{cursor: disabled && disabledMessage ? 'help' : 'auto'}">
    <button v-bind="$attrs" type="button" class="dropdown-item" :class="{disabled: disabled || notAllowed}">
      {{ name }}
      <slot />
      <i v-if="disabled && disabledMessage && !notAllowed" class="fa fa-question-circle-o" style="position:relative; top: 1px; right: -3px;" />
      <i v-if="notAllowed" class="fa fa-lock" style="position:relative; top: 1px; right: -3px;" />
    </button>
  </span>
</template>

<script>
import messages from '../data/messages.js';

export default {
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    notAllowed: {
      type: Boolean,
      default: false,
    },
    disabledMessage: {
      type: String,
      default: null,
    }
  },
  data() {
    return {
      messages: messages
    };
  }
};
</script>
