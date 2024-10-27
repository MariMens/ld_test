import { createApp } from 'vue';

import DataGrid from './components/DataGrid.vue';
import DataGridTh from './components/DataGridTh.vue';
import DataGridTdSelect from './components/DataGridTdSelect.vue';
import DataGridThReload from './components/DataGridThReload.vue';
import DataGridThSelectAll from './components/DataGridThSelectAll.vue';
import DataForm from './components/DataForm.vue';
import DataFormButton from './components/DataFormButton.vue';
import DataFormContainer from './components/DataFormContainer.vue';
import DataFormInput from './components/DataFormInput.vue';
import DataFormTextArea from './components/DataFormTextArea.vue';
import DataFormSelect from './components/DataFormSelect.vue';
import DataFormCheck from './components/DataFormCheck.vue';
import DataFormCheckList from './components/DataFormCheckList.vue';
import DataFormCheckWithNote from './components/DataFormCheckWithNote.vue';
import DataFormMultiselect from './components/DataFormMultiselect.vue';
import BaseGridDropdownItem from './components/BaseGridDropdownItem.vue';
import BaseGridDropdownSeparator from './components/BaseGridDropdownSeparator.vue';
import BaseGridDropdownItemModal from './components/BaseGridDropdownItemModal.vue';
import BaseGridFilter from '@/components/BaseGridFilter.vue';
import BaseGridExportButton from '@/components/BaseGridExportButton.vue';
import axios from 'axios';
import Form from '@/views/Form.vue';

import './assets/css/base.css';
import './assets/css/adds.css';
import './assets/css/toaster.css';
import './assets/css/multiselect.css';
import './assets/css/portal.css';
import './assets/css/vue-tel-input.css';
import './assets/css/mentions.css';


import App from './App.vue';
import { createWebHistory, createRouter } from 'vue-router';
import VueToast from 'vue-toast-notification';

const router = createRouter({
    history: createWebHistory(),
    routes: Object.values([{name: 'form', path: '/form-dite', component: Form}]),
});



axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'https://httpbin.org/';
axios.defaults.headers.common['Authorization'] = '';
axios.defaults.withCredentials = true;
const scope = import.meta.env.VITE_SCOPE;

const app = createApp(App);
app.use(router);
app.use(VueToast, {position: 'top'});

// workaround for Webstorm
const Vue = app;

Vue.component('DataGrid', DataGrid);
Vue.component('DataGridTh', DataGridTh);
Vue.component('DataGridTdSelect', DataGridTdSelect);
Vue.component('DataGridThReload', DataGridThReload);
Vue.component('DataGridThSelectAll', DataGridThSelectAll);
Vue.component('DataForm', DataForm);
Vue.component('DataFormButton', DataFormButton);
Vue.component('DataFormContainer', DataFormContainer);
Vue.component('DataFormInput', DataFormInput);
Vue.component('DataFormTextArea', DataFormTextArea);
Vue.component('DataFormSelect', DataFormSelect);
Vue.component('DataFormCheck', DataFormCheck);
Vue.component('DataFormCheckList', DataFormCheckList);
Vue.component('DataFormCheckWithNote', DataFormCheckWithNote);
Vue.component('DataFormMultiselect', DataFormMultiselect);
Vue.component('BaseGridDropdownItem', BaseGridDropdownItem);
Vue.component('BaseGridDropdownSeparator', BaseGridDropdownSeparator);
Vue.component('BaseGridDropdownItemModal', BaseGridDropdownItemModal);
Vue.component('BaseGridFilter', BaseGridFilter);
Vue.component('BaseGridExportButton', BaseGridExportButton);


app.config.globalProperties.$scope = scope;

app.mount('#app');


