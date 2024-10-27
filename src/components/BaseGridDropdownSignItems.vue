<template>
  <div>
    <template v-if="allowIndividual">
      <BaseGridDropdownItem v-if="!item.googleDocumentId" :disabled="item.state !== 'concept' || disabled" disabled-message="Jen ve stavu koncept" @click="requestOperation(url, 'cloneGoogleDocument', item.uuid, {}, {}, false, 'Vytvořena individuální kopie dokumentu', null, () => $emit('templateChanged'))">
        <i class="fa fa-plus pe-1" style="position: relative; top: 2px;" /> Použít individuální sml.
      </BaseGridDropdownItem>
      <BaseGridDropdownItem v-if="item.googleDocumentId && !onlyIndividual" :disabled="item.state !== 'concept' || disabled" disabled-message="Jen ve stavu koncept" @click="requestOperation(url, 'deleteGoogleDocument', item.uuid, {}, {}, false, 'Smazána individuální kopie dokumentu', null, () => $emit('templateChanged'))">
        <i class="fa fa-undo pe-1" style="position: relative; top: 2px;" /> Použít vzorovou sml.
      </BaseGridDropdownItem>
    </template>
    <a v-if="item.googleDocumentId" class="dropdown-item" :class="{'disabled': item.signedDate}" :href="$helpers.getGoogleFileLink(item.googleDocumentId)" target="_blank">
      <template v-if="!onlyIndividual"><i class="fa fa-external-link pe-1" style="position: relative; top: 2px;" /> Indiduální smlouva</template>
      <template v-else><i class="fa fa-external-link pe-1" style="position: relative; top: 2px;" /> Dodatek</template>
    </a>
    <template v-if="modal">
      <BaseGridDropdownItemModal :disabled="!canSign || !!item.signedDate || disabled" :disabled-message="disabledMessage" :modal-target="'#modal-signContract' + ns + item?.uuid" @click="openModal = item.uuid">K podpisu</BaseGridDropdownItemModal>
    </template>
    <template v-else>
      <BaseGridDropdownSeparator />
      <BaseGridDropdownItem :disabled="!canSign || disabled || !!item.signedDate" :disabled-message="disabledMessage" @click="requestOperation(url + '?type=remote', 'sign', item.uuid, {}, {}, false, 'Posláno k podpisu', null, () => $emit('signed'))">Podepsat vzdáleně</BaseGridDropdownItem>
      <BaseGridDropdownItem :disabled="!canSign || disabled || !!item.signedDate" :disabled-message="disabledMessage" @click="requestOperation(url + '?type=physical', 'sign', item.uuid, {}, {}, false, 'Posláno k podpisu', null, () => $emit('signed'))">Podepsat zde</BaseGridDropdownItem>
      <BaseGridDropdownItem :disabled="!canSign || disaled || !!item.signedDate" :disabled-message="disabledMessage" @click="requestOperation(url, 'sign', item.uuid, {}, {}, false, 'Označeno jako podepsáno', null, () => $emit('signed'))">Označit jako podepsané</BaseGridDropdownItem>
    </template>
    <BaseGridDropdownSeparator />
    <BaseGridDropdownItem v-if="!onlyIndividual && !noTemplate" :disabled="disabled" @click="requestDownload(url + '/' + item?.uuid + '/downloadTemplate', item?.uuid)">Stáhnout vzor smlouvy</BaseGridDropdownItem>
    <BaseGridDropdownItem :disabled="!item.signedDate || disabled || !item.contractId" :disabled-message="!item.contractId && item.signedDate ? 'Smlouva k dispozici jen offline' : 'Není podepsaná'" @click="requestDownload(url + '/' + item?.uuid + '/downloadSigned', item?.uuid)">Stáhnout podepsanou smlouvu</BaseGridDropdownItem>
  </div>
  <Teleport to="#modals">
    <BaseModalSign :id="openModal" :send-success-text="sendSuccessText" :ns="ns + item?.uuid" :proposers="proposers" :url="url" @success="$emit('signed');" />
  </Teleport>
</template>

<script>

import useRequests from '@/composables/useRequests.js';
import BaseModalSign from '@/components/BaseModalSign.vue';
import BaseGridDropdownItemModal from '@/components/BaseGridDropdownItemModal.vue';

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
    disabled: {
      type: Boolean,
      default: false,
    },
    modal: {
      type: Boolean,
      default: true,
    },
    sendSuccessText: {
      type: String,
      default: 'Žádosti na podpis byly poslány'
    },
    ns: {
      type: String,
      required: true,
    },
    disabledMessage: {
      type: String,
      default: null,
    },
    proposers: {
      type: Array,
      default: () => [],
    },
    canSign: {
      type: Boolean,
      required: true,
    },
    allowIndividual: {
      type: Boolean,
      default: true,
    },
    onlyIndividual: {
      type: Boolean,
      required: false,
    },
    noTemplate: {
      type: Boolean,
      required: false,
    }
  },
  emits: ['signed', 'templateChanged'],
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