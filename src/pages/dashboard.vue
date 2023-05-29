<template>
  <div class="flex">
    <uploadProfile @update-data="handleDataUpdate, showToast"></uploadProfile>
    <!-- <Button @click="showToast" label="Show" /> -->
  </div>

  <h3 class="font-serif font-semibold text-3xl pb-3">Data Mahasiswa</h3>
  <div class="pl-8 pr-8">
    <div class="overflow-x-auto">
      <table class="border border-collapse border-black table-auto">
        <thead>
          <tr class="bg-slate-600 text-white m-5">
            <th class="border border-black w-1/6 pt-2 pb-2">Foto</th>
            <th class="border border-black w-1/8">NIM</th>
            <th class="border border-black w-1/2">Nama</th>
            <th class="border border-black w-1/6">Email</th>
            <th class="border border-black w-1/2">Alamat</th>
            <th class="border border-black w-1/2">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mahasiswa in mahasiswas" :key="mahasiswa.id">
            <td class="border border-black py-2 px-2 ">
              <div class="flex justify-center items-center h-full">
                <img :src="mahasiswa.imageName" class="rounded-full object-contain h-20 w-20 block" id="foto"
                  alt="foto" />
              </div>
            </td>
            <td class="border border-black py-2 px-2 text-center">{{ mahasiswa.nim }}</td>
            <td class="border border-black py-2 px-2 text-left">{{ mahasiswa.nama }}</td>
            <td class="border border-black py-2 px-2 text-left">{{ mahasiswa.email }}</td>
            <td class="border border-black py-2 px-2 text-left">{{ mahasiswa.alamat }}</td>
            <td class="border border-black py-2 px-2 text-center">
              <div class="flex justify-center space-x-2">
                <editProfile></editProfile>
                <!-- <Button label="" class="" icon="pi pi-user-edit" severity="warning" /> -->
                <deleteProfile @delete="deletePost(mahasiswas)"></deleteProfile>
                <!-- <Button label="" class="" icon="pi pi-user-minus" severity="danger" /> -->
              </div>
            </td>

          </tr>
        </tbody>
      </table>
    </div>
    <Toast></Toast>
  </div>
</template>

<script>
import axios from 'axios';
import uploadProfile from '../components/uploadProfile.vue';
import deleteProfile from '../components/deleteProfile.vue';
import editProfile from '../components/editProfile.vue';
// import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';






export default {
  components: {
    uploadProfile,
    // Button,
    deleteProfile,
    editProfile,
  },
  data() {
    return {
      nim: '',
      nama: '',
      email: '',
      alamat: '',

      mahasiswas: [],
      imageName: null,
    }
  },

  setup() {
    const toast = useToast();
    return {
      toast,
    };
  },


  mounted() {
    this.fetchData();
  },

  methods: {
    // Delete Data
    async deletePost(nim) {
      console.log('Delete button clicked'+ nim);
      try {
        const apiEndpoint = `http://localhost:3000/api/products/${nim}`;
        await axios.delete(apiEndpoint);
        this.fetchData(); // Trigger the fetch function to update the data after deletion
      } catch (error) {
        console.log(error);
      }
    },
  
    // Toast Message
    showToast() {
      console.log('Show Toast button clicked');
      const toast = this.$toast;
      toast.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Message Content',
        life: 3000,
      });
    },

    handleDataUpdate() {
      // Update your main component's data with the updatedData object
      this.fetchData();
      this.show();
    },

    async fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        this.mahasiswas = response.data;
        console.log(this.$toast);

        // Menambahkan base url pada imageName
        this.mahasiswas.forEach(mahasiswa => {
          mahasiswa.imageName = 'http://localhost:3000/Images/Profiles/' + mahasiswa.imageName;
        });
      } catch (error) {
        console.log(error);
      }
    },

  }



}


</script>
<style></style>