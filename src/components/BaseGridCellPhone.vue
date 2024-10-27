<template>
  <td>
    <a v-if="value" :href="'tel:' + valueFixed" :title="valueFixed" style="white-space: nowrap">{{ phone }}</a>
    <span v-else>-</span>
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
  computed: {
    valueFixed() {
      return this.value.replaceAll(' ', '').replace('++', '+');
    },
    phone() {
      let aux = this.value.replaceAll(' ', '').replace('++', '+').replace('+420', '');

      return aux.substring(0, 1) === '+' ? (aux.substring(0, 4) + ' ' + aux.substring(3, 6) + ' ' + aux.substring(6, 9) + ' ' + aux.substring(9)) : (aux.substring(0, 3) + ' ' + aux.substring(3, 6) + ' ' + aux.substring(6, 9));
    },
  },
};

</script>