<template>
  <td class="nowrap">
    <template v-if="!isEmpty">
      <slot />
      <span v-if="item['questionnaire_fk_propertyDisposition']">{{ lists['dispositions']?.[item['questionnaire_fk_propertyDisposition']]?.name }}, </span> 
      <a :href="'https://www.google.com/maps/search/?api=1&query=' + (item[prefix + 'street'] || '') + ',' + (item[prefix + 'city'] || '') + ' ' + (item[prefix + 'zipcode'] || '')" target="_blank"><i v-if="0 && item[prefix + 'street']" class="fa fa-map-marker" /> {{ item[prefix + 'street'] }}<template v-if="item[prefix + 'city']">, {{ item[prefix + 'city'] }}</template><slot name="behind" /></a>
    </template>
    <template v-else>-</template>
    <slot name="after" />
  </td>
</template>

<script>

export default {
  inject: ['lists'],
  props: {
    item: {
      type: Object,
      required: true,
    },
    prefix: {
      type: String,
      default: 'address_',
    },
    isEmpty: {
      type: Boolean,
      default: false,
    }
  },
};

</script>