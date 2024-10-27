<template>
  <BaseGridDropdown v-if="!isSlotEmpty || massDelete" v-bind="$attrs" :disabled="disabled || notAllowed" icon="fa-trash-o" :small="small" :class="!outlined ? 'btn-danger' : 'btn-outline-danger'">
    <slot />
    <div v-if="!isSlotEmpty && modalKey" tabindex="-1" class="dropdown-divider" />
    <BaseGridDropdownItemModal v-if="modalKey" :not-allowed="disabledDelete || notAllowed" :modal-target="`#modal-confirmDelete${modalKey}`"><i class="fa fa-trash-o pe-1" />Smazat trvale</BaseGridDropdownItemModal>
  </BaseGridDropdown>
  <button v-if="isSlotEmpty && modalKey && !massDelete" class="btn btn-sm btn-xs" :class="!outlined ? 'btn-danger' : 'btn-outline-danger'" data-bs-toggle="modal" :data-bs-target="`#modal-confirmDelete${modalKey}`" :disabled="disabledDelete || disabled || notAllowed" @click.prevent=""><span class="btn-icon-wrapper pr-1 opacity-0"><i class="fa fa-trash-o" /></span></button>
  <Teleport to="#modals">
    <BaseModalConfirmDelete
      :id="`confirmDelete${modalKey}`"
      @confirmed="$emit('confirmed')"
    />
  </Teleport>
</template>

<script>
import { useSlots, computed } from 'vue';
import BaseModalConfirmDelete from './BaseModalConfirmDelete.vue';
import BaseGridDropdown from './BaseGridDropdown.vue';
export default {
  components: { BaseModalConfirmDelete, BaseGridDropdown },
  props: {
    modalKey: { type: String, default: null },
    disabledDelete: { type: Boolean, default: false },
    disabled: {type: Boolean, default: false},
    massDelete: {type: Boolean, default: false},
    notAllowed: {type: Boolean, default: false},
    small: {type: Boolean, default: true},
    outlined: {type: Boolean, default: false}
  },
  emits: ['confirmed'],
  setup() {
    const isSlotEmpty = computed(() => !useSlots()._);
    return {
      isSlotEmpty,
    };
  },
};
</script>

<style scoped></style>
