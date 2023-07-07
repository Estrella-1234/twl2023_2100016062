<template>
  <div v-if="hasToken">
    <div v-if="tokenExpired()">

    </div>
    <div v-else>
      <div class="w-full h-full flex overflow-auto">
        <sidebar :dataOpenSideBar="openSidebar" />
        <div class="w-full h-full">
          <headerTop :dataOpenSideBar="openSidebar" :clickHambuger="toggleSidebar" />
          <div class="w-full h-[calc(100vh-50px)] overflow-auto bg1">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>

  </div>
  <div v-else>
    <Toast></Toast>
    <div class="flex justify-center items-center min-h-screen bg">
      <div class="bg-white p-8 rounded shadow-lg login-section">
        <template v-if="mode === 'login'">
          <LoginForm @switch-mode="switchMode" />
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
    tokenExpired() {
      const token = localStorage.getItem('token');
      const expirationDate = localStorage.getItem('expirationDate');

      if (!token || !expirationDate) {
        return true; // Token is expired if it doesn't exist or no expiration date
      }

      const now = new Date().getTime();
      const expiresAt = new Date(expirationDate).getTime();

      if (now > expiresAt) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        return true; // Token is expired
      }

      return false; // Token is not expired
    },


    toggleSidebar() {
      this.openSidebar = !this.openSidebar
    },

    switchMode(mode) {
      this.mode = mode;
    },
  }

}
</script>

<style scoped>
.bg {
  background-image: url('../../assets/Login.jpg');
  background-size: cover;
  background-position: center;
}

.bg1 {
  background-image: url('../../assets/bg1.jpg');
  background-size: cover;
  background-position: center;
}

.login-section {
  width: 320px;
}
</style>