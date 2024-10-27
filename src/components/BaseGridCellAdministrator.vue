<template>
  <td class="text-nowrap">
    <i v-if="icon" class="me-1 fa" :class="icon" />
    <BaseAvatar v-if="userId" :id="userId" :size="18" :image-name="userImageName" />
    <button v-if="modalTarget" :disabled="disabled" class="btn btn-xs btn-light" data-bs-toggle="modal" :data-bs-target="modalTarget" @click="$emit('click', adminItem ?? item)">
      <template v-if="!userId"><i class="fa fa-plus" /> {{ label }}</template> 
      <template v-if="userId">{{ userNickname }}</template>
    </button>
    <span v-else-if="userNickname" class="ms-1" :class="background ? (background === 'danger' ? 'bg-light-orange' : 'bg-light-success') : ''">{{ userNickname }}</span>
    <span v-if="!userNickname && !modalTarget">-</span>
    <slot />
  </td>
</template>

<script>

import BaseAvatar from './BaseAvatar.vue';
export default {
  components: {BaseAvatar},
  props: {
    item: {
      type: Object,
      required: true,
    },
    adminItem: {
      type: Object,
      default: ()=>{},
    },
    prefix: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: 'OM',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    modalTarget: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    background: {
      type: String,
      default: null,
    }
  },
  emits: ['click'],
  computed: {
    userId: function () {
      return this.adminItem?.uuid ?? this.item[this.prefix + '_uuid'];
    },
    userNickname: function () {
      return this.adminItem?.nickname ?? this.item[this.prefix + '_nickname'];
    },
    userImageName: function () {
      return this.adminItem?.imageName ?? this.item[this.prefix + '_imageName'];
    }
  },
};

</script>