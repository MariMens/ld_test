<template>
  <BaseGridDropdown v-if="!isSlotEmpty" v-bind="$attrs" :disabled="disabled || notAllowed" icon="fa-trash-o" :small="small" :class="!outlined ? 'btn-danger' : 'btn-outline-danger'">
    <slot />
    <BaseGridDropdownSeparator />
    <BaseGridDropdownItem :disabled="disabledDelete || notAllowed" :not-allowed="notAllowed || !hasPermission(['A'])" :disabled-message="disabledMessage" @click.prevent="$refs.modal.show();"><i class="fa fa-trash-o pe-1" />Smazat trvale</BaseGridDropdownItem>
  </BaseGridDropdown>
  <button v-if="isSlotEmpty" class="btn" :class="{'btn-outline-danger': outlined, 'btn-danger': !outlined, 'btn-xs': small, 'btn-sm': !small}" :disabled="disabledDelete || disabled || notAllowed || !hasPermission(['A'])" @click.prevent="$refs.modal.show();"><span class="btn-icon-wrapper pr-1 opacity-0"><i class="fa fa-trash-o" /></span></button>
  <teleport to="#modal-wrapper">
    <ModalTestConfirmation ref="modal" action-label="Smazat" @confirmed="$emit('confirmed')">Skutečne smazat položku/y?</ModalTestConfirmation>
  </teleport>
</template>

<script>
import { useSlots, computed } from 'vue';
import BaseGridDropdown from './BaseGridDropdown.vue';
import ModalTestConfirmation from '@/components/ModalTestConfirmation.vue';
export default {
  components: {ModalTestConfirmation, BaseGridDropdown },
  inject: ['hasPermission'],
  props: {
    disabledDelete: { type: Boolean, default: false },
    disabled: {type: Boolean, default: false},
    notAllowed: {type: Boolean, default: false},
    disabledMessage: {type: String, default: null},
    small: {type: Boolean, default: true},
    outlined: {type: Boolean, default: true}
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
