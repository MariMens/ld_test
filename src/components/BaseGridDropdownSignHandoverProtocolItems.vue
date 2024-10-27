<template>
  <div>
    <BaseGridDropdownItemModal :disabled="(!canSign || !item[prefix + '_handoverDate']) && !unlockCanSign" :modal-target="'#modal-signContract' + ns + 'Handover'" :disabled-message="!item[prefix + '_handoverDate'] ? 'Jen s doplněným datumem předání' : disabledMessage" @click="openModal = item.uuid">
      PP k podpisu
    </BaseGridDropdownItemModal>
    <BaseGridDropdownSeparator />
    <BaseGridDropdownItem @click="requestDownload(url + '/' + item.uuid + '/handoverDocument', item.id)">Stáhnout vzor PP</BaseGridDropdownItem>
    <BaseGridDropdownItem :disabled="!item[prefix + '_signedDate'] || !item[prefix + '_contractId'] " :disabled-message="!item[prefix + '_contractId'] && item[prefix + '_signedDate'] ? 'PP k dispozici jen offline' : 'Není podepsán'" @click="requestDownload(url + '/' + item.uuid + '/handoverDocumentSigned', item.id)">
      Stáhnout podepsaný PP
    </BaseGridDropdownItem>
  </div>
  <Teleport to="#modals">
    <BaseModalSign :id="openModal" :ns="ns + 'Handover'" :url="url" suffix="Handover" @success="$emit('signed');" />
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
    item: {
      type: Object,
      default: null,
    },
    ns: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      default: 'handoverProtocol',
    },
    disabledMessage: {
      type: String,
      default: null,
    },
    canSign: {
      type: Boolean,
      default: true,
    },
    unlockCanSign: {
      type: Boolean,
      default: false,
    },

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