<template>
    <h3 class="font-serif font-semibold text-3xl pt-5 ">Data Mahasiswa</h3>
    <div class="">
        <uploadProfile @update-data="handleDataUpdate, showToast"></uploadProfile>
    </div>
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
                        <th class="border border-black w-1/2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="mahasiswa in mahasiswas" :key="mahasiswa.id">
                        <td class="border border-black py-2 px-2 ">
                            <div class="flex justify-center items-center h-full">
                                <img :src="mahasiswa.imageName" class="rounded-full object-contain h-20 w-20 block"
                                    id="foto" alt="foto" />
                            </div>
                        </td>
                        <td class="border border-black py-2 px-2 text-center">{{ mahasiswa.nim }}</td>
                        <td class="border border-black py-2 px-2 text-left">{{ mahasiswa.nama }}</td>
                        <td class="border border-black py-2 px-2 text-left">{{ mahasiswa.email }}</td>
                        <td class="border border-black py-2 px-2 text-left">{{ mahasiswa.alamat }}</td>
                        <td class="border border-black py-2 px-2 text-center">
                            <div class="flex justify-center space-x-2">
                                <editProfile></editProfile>


                                
                                <Button label="" @click="visible = true" class="bg-red-500 text-white"
                                    icon="pi pi-user-minus" severity="danger" />
                                <Dialog v-model:visible="visible" modal header="Hapus Data" :style="{ width: '400px' }">
                                    <p>Are you sure you want to delete this data?</p>
                                    <div class="flex justify-end space-x-4 pt-6">
                                        <Button label="Cancel" class="p-button-text text-gray-500"
                                            @click="visible = false" />
                                        <Button label="Delete" class="p-button-danger" @click="deletePost(mahasiswa.nim)" />
                                    </div>
                                </Dialog>
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
import editProfile from '../components/editProfile.vue';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import Dialog from 'primevue/dialog';





export default {
    components: {
        uploadProfile,
        Button,
        editProfile,
        Dialog,
    },
    data() {
        return {
            visible: false,
            nim: null,
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
            try {
                const apiEndpoint = `http://localhost:3000/api/products/${nim}`;
                await axios.delete(apiEndpoint);
                this.fetchData(); // Trigger the fetch function to update the data after deletion
                
                this.toast.add({
                    severity: 'success',
                    summary: 'Success Message',
                    detail: 'Data Berhasil Dihapus',
                    life: 3000,
                });
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
                summary: 'Alert',
                detail: 'Data Berhasil Dihapus',
                life: 5000,
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
                console.log(this.mahasiswas.a);

                // Menambahkan base url pada imageName
                this.mahasiswas.forEach(mahasiswa => {
                    mahasiswa.imageName = 'http://localhost:3000/Images/Profiles/' + mahasiswa.imagePath;
                });

            } catch (error) {
                console.log(error);
            }
        },

    }



}


</script>
<style></style>