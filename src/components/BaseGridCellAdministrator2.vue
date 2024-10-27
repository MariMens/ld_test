<template>
  <td class="nowrap">
    <BaseAvatar v-if="userId" :id="userId" :size="18" :image-name="userImageName" />
    <template v-else-if="emptyValue">{{ emptyValue }}</template>
    <button v-if="url" class="btn btn-xs btn-light" v-bind="$attrs" @click="$refs.modal1.show()">
      <template v-if="!userId"><i class="fa fa-plus" /> {{ inputLabel }}</template>
      <template v-if="userId">{{ userNickname }}</template>
    </button>
    <span v-else class="ms-1" :class="background ? (background === 'danger' ? 'bg-light-orange' : 'bg-light-success') : ''">{{ userNickname }}</span>
    <slot />
  </td>
  <teleport to="#modal-wrapper">
    <BaseModal2 ref="modal1">
      <DataForm ref="changeAdminForm" :data="inputs" class="" :request="request" @success="$refs.modal1.hide();$emit('success')">
        <div class="row">
          <DataFormSelect :values="administrators" property-name="nickname" property-value="uuid" wrap="col-lg-6" :name="prefix" :label="inputLabel" :prompt="inputLabel" />
        </div>
      </DataForm>
      <template #footer>
        <button type="button" class="btn btn-sm btn-primary" @click="$refs.changeAdminForm.submit()">Uložit</button>
      </template>
    </BaseModal2>
  </teleport>
</template>

<script>

import BaseAvatar from '@/components/BaseAvatar.vue';
import BaseModal2 from '@/components/BaseModal2.vue';

export default {
  components: {BaseModal2, BaseAvatar},
  inject: ['lists'],
  props: {
    item: {
      type: Object,
      required: true,
    },
    adminItem: {
      type: Object,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
    prefix: {
      type: String,
      default: '',
    },
    emptyValue: {
      type: String,
      default: '',
    },
    inputLabel: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: null,
    },
    manager: {
      type: String,
      default: null,
    },
    background: {
      type: String,
      default: null,
    },
    changeValues: {
      type: Boolean,
      default: false,
    },
    limitAdministrators: {
      type: Object,
      default: null
    },
  },
  emits: ['success'],
  data() {
    return {
    };
  },
  computed: {
    request() {
      return this.changeValues ? {url: this.url, method: 'post', params: [], data: {'_op': 'changeValues'}} : {url: this.url, method: 'patch', params: []};
    },
    inputs() {
      const obj = {};

      obj[this.prefix] = this.userId ?? null;

      return  obj;
    },
    userId: function () {
      return this.adminItem?.uuid ?? this.item[this.prefix + '_uuid'];
    },
    userNickname: function () {
      return this.adminItem?.nickname ?? this.item[this.prefix + '_nickname'];
    },
    userImageName: function () {
      return this.adminItem?.imageName ?? this.item[this.prefix + '_imageName'];
    },
    administrators: function () {
      return this.limitAdministrators ? this.limitAdministrators : ( this.role ? (this.lists['administrators']?.[this.role] ?? {}) : (this.lists['managers']?.[this.manager] ?? {}));
    }
  },
};

</script>