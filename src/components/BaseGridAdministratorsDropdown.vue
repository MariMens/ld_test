<template>
  <BaseGridDropdown :disabled="disabled" icon=" fa-user-o" class="btn-outline-primary">
    <button v-for="admin in administrators" :key="admin.uuid" type="button" class="dropdown-item" @click="changeAdmin(admin)">
      {{ label }}
      <i class="fa fa-long-arrow-right ms-1 me-1" style="position: relative; top: 2px" />
      {{ admin.nickname }}
    </button>
  </BaseGridDropdown>
</template>

<script>
import axios from 'axios';

export default {
  inject: ['lists'],
  props: {
    grid: {
      default: null,
      type: Object,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    url: {
      required: true,
      type: String,
    },
    label: {
      default: null,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    getId: {
      default: null,
      type: Function,
    },
    administrators: {
      default: () => {},
      type: Object,
    },
  },
  methods: {
    changeAdmin(admin) {
      const ids = this.grid.selectedIds();
      const data = { [this.name]: admin.uuid };
      let realIds = null;

      if (this.getId) {
        realIds = [];
        ids.forEach((id) => {
          realIds.push(this.getId(this.grid.items[id]));
        });
      }

      axios
          .request({method: 'patch', url: this.url, params: { ids: realIds ? realIds : ids }, data: data,})
          .then(() => {
            this.grid.reload();
            this.$toast.success('Administrátoři byli změněni (' + ids.length + 'x)');
          });
    },
  },
};
</script>