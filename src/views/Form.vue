<template>
  <DataForm ref="form" :data="inputs" :validation="v$" :request="{url: url, method: 'post', data: {_op: 'createPenalty'}}" @success="handleSuccessConfirm">
    <div class="row mt-2">
      <DataFormInput wrap="col-lg-6" name="fullName" label="Celé jméno" type="text" />
      <DataFormInput wrap="col-lg-6" name="birthdate" label="Narození" type="date" />
    </div>
    <div class="row">
      <DataFormSelect :values="{'none':'bez vlasů', 'short': 'krátké', 'long': 'dlouhé'}" wrap="col-lg-6" name="hairType" label="Typ vlasů *" prompt="Typ vlasů" />
    </div>
    <div class="row mt-2">
      <DataFormInput wrap="col-lg-12" name="note" label="Poznámka" />
    </div>
  </DataForm>
  <br>
  <button type="button" class="btn btn-sm btn-primary btn-success" :disabled="v$.$invalid" @click="$refs.form.submit()">Odeslat</button>
  <br>
  <br>
  <strong>Data z formuláře:</strong>
  <br>
  <code>
    {{ inputs }}
  </code>
</template>
<script>

import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { isValidDate, validateAgeUnder18 } from '@/data/validations.js';

export default {
  components: {},
  props: {},
  emits: ['success'],
  setup () {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      url: 'status/200',
      inputs: {
        fullName: null,
        birthdate: null,
        hairType: null,
        note: null,
      },
    };
  },
  validations() {
    return {
      inputs: {
        hairType: { required },
        birthdate: { isValidDate, validateAgeUnder18 },
      }
    };

  },
  mounted() {},
  methods: {
    handleSuccessConfirm: function () {
      this.$toast.success('Záznam byl vytvořen.');
    }
  }
};

</script>