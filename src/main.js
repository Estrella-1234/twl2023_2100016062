import { createApp } from 'vue'
import App from './App.vue'
import './assets/app.css'
import router from './router'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/tailwind-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';
import Tooltip from 'primevue/tooltip';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

const app = createApp(App);
app.component('InputText', InputText);
app.component('Avatar', Avatar);
app.component('Menu',Menu);
app.component('Toast', Toast);


app.directive('tooltip', Tooltip);
app.directive('Button', Button);
app.directive('Dialog', Dialog);
app.directive('Textarea', Textarea);



app.use(ToastService);
app.use(router);
app.use(PrimeVue);
 app.mount('#app')
