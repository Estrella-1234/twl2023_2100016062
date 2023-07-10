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
        <div class="text-md">{{ username }}</div>
        <Avatar icon="pi pi-prime" class="mr-2" style="background-color:#9c27b0; color: #ffffff" shape="circle"
          @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />

        <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
      </div>
    </div>
    <!-- Profile Dialog -->
    <Dialog v-model:visible="profileDialogVisible" modal header="User Profile" :style="{ width: '30vw' }">
      <div class="p-4 bg-white rounded-lg shadow-md">
        <div class="mb-4">
          <label for="username" class="block font-semibold mb-2">Username</label>
          <InputText id="username" disabled v-model="userProfile.username" class="w-full" />
        </div>
        <div class="mb-4">
          <label for="name" class="block font-semibold mb-2">Full Name</label>
          <InputText id="name" v-model="userProfile.name" class="w-full" />
        </div>
        <div class="mb-4">
          <label for="email" class="block font-semibold mb-2">Email</label>
          <InputText id="email" v-model="userProfile.email" class="w-full" />
        </div>

        <div class="flex justify-center mt-4 space-x-6">
          <Button label="Save" severity="success" @click="saveProfile" />
          <Button label="Cancel" @click="cancelProfile" />
        </div>

      </div>
    </Dialog>
  </div>
</template>

<script>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';

export default {
  created() {
    this.getUsernameFromId().then(username => {
      this.username = username;
    }).catch(error => {
      console.error(error);
    });
  },

  setup() {
    const toast = useToast();
    const success = (Message, summary) => {
            toast.add({ severity: 'success', summary: summary, detail: Message, life: 5000 });
        };

        const warn = (Message, summary) => {
            toast.add({ severity: 'warn', summary: summary, detail: Message, life: 5000 });
        };

        const error = (Message, summary) => {
            toast.add({ severity: 'error', summary: summary, detail: Message, life: 5000 });
        };
    return { 
      success, 
      warn, 
      error 
    };
  },

  components: {
    Dialog,
    Button,
    InputText,
  },

  props: {
    dataOpenSideBar: Boolean,
    clickHambuger: Function,
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
      profileDialogVisible: false,
      userProfile: {
        name: '',
        email: '',
        username: '', // Add username property
      },
      username: '', // Menambahkan properti username
    };
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

    async getUsernameFromId() {
      const id = this.getUserIdFromToken();
      const token = localStorage.getItem('token');

      if (!token) {
        this.error('You are not logged in', 'Error');
        return '';
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get(`http://localhost:3008/user/${id}`, config);
        const data = response.data;
        return data.fullname;
      } catch (error) {
        this.error(error.data.message, 'Error');
        return '';
      }
    },


    getUserIdFromToken() {
      const token = localStorage.getItem('token');
      if (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const decodedToken = JSON.parse(window.atob(base64));
        return decodedToken.Id; // Assuming the user ID is stored in the token
      }
      return '';
    },


    showProfileDialog() {
      // Fetch the user data from the API based on the username
      const id = this.getUserIdFromToken();
      const token = localStorage.getItem('token');
      // Include the token in the Authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .get(`http://localhost:3008/user/${id}`, config)
        .then((response) => {
          const data = response.data;
          this.userProfile.name = data.fullname;
          this.userProfile.email = data.email;
          this.userProfile.username = data.username; // Set the username
          this.profileDialogVisible = true; // Open the dialog after fetching the data
        })
        .catch((error) => {
          this.error(error.data.message, 'Error');
        });
    },

    async saveProfile() {
      try {
        // Send the updated user profile to the API for saving
        const id = this.getUserIdFromToken();
        const updatedProfile = {
          username: this.userProfile.username,
          fullname: this.userProfile.name,
          email: this.userProfile.email,
        };

        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.put(`http://localhost:3008/user/${id}`, updatedProfile, config);

        // Handle the response or show a success message
        this.success(response.data.message, 'Success');

        // Update username
        this.username = this.userProfile.username;

        this.profileDialogVisible = false;
      } catch (error) {
        this.error(error.response.data.message, 'Error');
      }
    },


    cancelProfile() {
      // Reset the user profile data
      this.userProfile.name = '';
      this.userProfile.email = '';
      this.userProfile.username = '';

      // Close the profile dialog
      this.profileDialogVisible = false;
    },
  },
};
</script>


<style></style>
