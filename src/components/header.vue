<template>
  <Toast></Toast>
  <div class="w-full bg-gray-100 ">
    <div class="flex justify-between items-center h-[50px]">
      <div class="p-4 cursor-pointer  hover:bg-gray-50" @click="clickHambuger">
        <i class="pi pi-bars"></i>
      </div>
      <div class="py-2">
        <!-- <InputText type="text" v-model="value"  placeholder="Search.." /> -->
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <!-- <InputText v-model="value1" class="h-[40px]" placeholder="Search" /> -->
          <InputText class="h-[40px]" placeholder="Search" />
        </span>
      </div>
      <div class="flex space-x-3 items-center justify-center px-3 pr-5">
        <div class="text-md">{{ getUsernameFromToken() }} </div>
        <Avatar icon="pi pi-prime" class="mr-2" style="background-color:#9c27b0; color: #ffffff" shape="circle"
          @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />

        <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
      </div>
    </div>
    <!-- Profile Dialog -->
    <Dialog v-model:visible="showProfileDialog" header="User Profile" width="400px">
      <div class="p-d-flex p-flex-column">
        <div class="p-field">
          <label for="name">Name</label>
          <InputText id="name" v-model="userProfile.name" />
        </div>
        <div class="p-field">
          <label for="email">Email</label>
          <InputText id="email" v-model="userProfile.email" />
        </div>

        <div class="p-d-flex p-jc-end">
          <Button label="Save" @click="saveProfile" />
          <Button label="Cancel" @click="cancelProfile" />
        </div>
      </div>
    </Dialog>

  </div>
</template>

<script>
import Dialog from 'primevue/dialog';

export default {
  components: {
    Dialog,
  },

  props: {
    dataOpenSideBar: Boolean,
    clickHambuger: Function
  },
  data() {
    return {
      items: [
        {
          label: 'Logout',
          icon: 'pi pi-power-off',
          command: this.logout,
        },
        {
          label: 'Profile',
          icon: 'pi pi-user',
          command: this.showProfileDialog,
        },
        {
          label: 'Setting',
          icon: 'pi pi-cog',
        },
        {
          label: 'Change Password',
          icon: 'pi pi-lock',
        },
      ],
      showProfileDialog: false,
      userProfile: {
        fullname: '',
        email: '',
        username: '',
      },
    }
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },

    logout() {
      // Remove the token from localStorage
      localStorage.removeItem('token');
      // Refresh the page to redirect the user to the login page
      location.reload();
    },

    getUsernameFromToken() {
      const token = localStorage.getItem('token');
      if (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const decodedToken = JSON.parse(window.atob(base64));
        return decodedToken.username; // Assuming the username is stored in the token
      }
      return '';
    },
  
  
  }

}
</script>

<style></style>