<template>
  <td>
    <template v-if="email"><i class="fa fa-envelope-o" /> <a target="_blank" :href="'https://mail.google.com/mail/?view=cm&fs=1&to=' + email + ''">{{ email }}</a></template>
    <template v-if="email && phone"> <br> </template>
    <template v-if="phone"><i class="fa fa-phone" /> <a :href="'tel:' + phone">{{ phone.replaceAll(' ', '').replace('+420', '') }}</a></template>
  </td>
</template>

<script>

export default {
  props: {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    }
  },
};

</script>