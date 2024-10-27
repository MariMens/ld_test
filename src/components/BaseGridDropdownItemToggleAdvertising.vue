<template>
  <BaseGridDropdownItem v-bind="$attrs" @click="toggleAdvertising()">{{ isAdvertisingActive ? 'Pozastavit inzerci' : 'Aktivovat inzerci' }}</BaseGridDropDownItem>
</template>
<script>
import {useBaseRequests} from '../requests/useBaseRequests.js';

export default {
  props: {
    ids: {
        type: Array,
        default: null,
    },
    propertyIds: {
      type: Array,
      default: null,
    },
    isAdvertisingActive: {
        type: Boolean,
        required: true,
    }

  },
  emits: ['success'],
  setup() {
      return {...useBaseRequests('estates-properties')};
  },
  methods: {
    toggleAdvertising() { 
      const msg = this.isAdvertisingActive ? 'Inzerce deaktivovány' : 'Inzerce aktivovány';

      this.requestOperation(this.isAdvertisingActive ? 'deactivateAdvertising' : 'activateAdvertising', {gridIds: this.ids, requestIds: this.propertyIds}, {}, () => this.$emit('success'), msg);
    }
  }
};
</script>

