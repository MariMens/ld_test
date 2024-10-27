<template>
  <td>
    <a v-if="value" target="_blank" :href="'https://mail.google.com/mail/?view=cm&fs=1&to=' + value + ''">{{ value }}</a>
    <span v-else>-</span>
    <slot />
  </td>
</template>

<script>

export default {
  props: {
    value: {
      type: String,
      default: null,
    }
  },
};

</script>