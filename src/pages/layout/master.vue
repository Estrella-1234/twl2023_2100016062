<template>
  <div v-if="hasToken">
    <div class="w-full h-full flex overflow-auto">
      <sidebar :dataOpenSideBar="openSidebar" />
      <div class="w-full h-full">
        <headerTop :dataOpenSideBar="openSidebar" :clickHambuger="toggleSidebar" />
        <div class="w-full h-[calc(100vh-50px)] overflow-auto">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <Toast></Toast>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="bg-white p-8 rounded shadow-lg">
        <template v-if="mode === 'login'">
          <LoginForm @switch-mode="switchMode"/>
        </template>
        <template v-else-if="mode === 'registration'">
          <RegistrationForm @switch-mode="switchMode" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import headerTop from './../../components/header.vue'
import sidebar from './../../components/sidebar.vue'
import LoginForm from '../../components/loginForm.vue';
import RegistrationForm from '../../components/registrationForm.vue';

export default {
  components: {
    headerTop,
    sidebar,
    LoginForm,
    RegistrationForm,
  },

  setup() {
    const hasToken = localStorage.getItem('token')


    return {
      hasToken,
    }
  },

  data() {
    return {
      openSidebar: true,
      mode: 'login', // Initial mode is set to login
    }
  },
  methods: {
    toggleSidebar() {
      this.openSidebar = !this.openSidebar
    },

    switchMode(mode) {
      this.mode = mode;
    },
  }

}
</script>

<style></style>