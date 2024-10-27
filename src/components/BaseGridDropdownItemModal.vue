<template>
  <span :title="disabled && !notAllowed ? disabledMessage : (notAllowed ? messages.notAllowed : null)" :style="{cursor: disabled && disabledMessage ? 'help' : 'auto'}">
    <button v-bind="$attrs" type="button" class="dropdown-item" data-bs-toggle="modal" :data-bs-target="modalTarget" :class="{disabled: disabled || notAllowed}">
      {{ name }}
      <slot />
      <i v-if="disabled && disabledMessage && !notAllowed" class="fa fa-question-circle-o" style="position:relative; top: 2px; right: -3px;" />
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
    modalTarget: {
      type: String,
      required: true,
    },
    notAllowed: {
      type: Boolean,
      default: false,
    },
    disabled: {
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
