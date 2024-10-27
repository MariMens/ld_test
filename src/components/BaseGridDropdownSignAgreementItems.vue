<template>
  <div>
    <BaseGridDropdownItemModal :disabled="!canSign" :modal-target="'#modal-signContract' + ns + prefix" :disabled-message="disabledMessage" @click="openModal = item[prefix + '_uuid']">
      Dohoda k podpisu
    </BaseGridDropdownItemModal>
    <BaseGridDropdownSeparator />
    <BaseGridDropdownItem v-if="!item[prefix + '_contractUrl']" @click="requestDownload(url + '/' + item[prefix + '_uuid'] + '/downloadTemplate', item.id)">Stáhnout vzor dohody</BaseGridDropdownItem>
    <BaseGridDropdownItem v-if="!item[prefix + '_contractUrl']" :disabled="!item[prefix + '_signedDate'] || !item[prefix + '_contractId']" :disabled-message="!item[prefix + '_contractId'] && item[prefix + '_signedDate'] ? 'Dohoda k dispozici jen offline' : null" @click="requestDownload(url + '/' + item[prefix + '_uuid'] + '/downloadSigned', item.id)">
      Stáhnout podepsanou dohodu
    </BaseGridDropdownItem>
  </div>
  <Teleport to="#modals">
    <BaseModalSign :id="openModal" :proposers="proposers" :ns="ns + prefix" :url="url" @success="$emit('signed');" />
  </Teleport>
</template>
<script>
import BaseGridDropdownItemModal from '@/components/BaseGridDropdownItemModal.vue';
import BaseModalSign from '@/components/BaseModalSign.vue';
import useRequests from '@/composables/useRequests.js';

export default {
  components: {BaseGridDropdownItemModal, BaseModalSign},
  props: {
    url: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      default: '',
    },
    item: {
      type: Object,
      default: null,
    },
    ns: {
      type: String,
      required: true,
    },
    proposers: {
      type: Array,
      default: () => [],
    },
    disabledMessage: {
      type: String,
      default: null,
    },
    canSign: {
      type: Boolean,
      required: true,
    }
  },
  emits: ['signed'],
  setup () {
    return {...useRequests};
  },
  data() {
    return {
      openModal: null,
    };
  },
};

</script>