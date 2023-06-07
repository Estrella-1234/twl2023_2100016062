<template>
    <h3 class="font-serif font-semibold text-3xl pt-5">Data Mahasiswa</h3>
    <div class="">
        <uploadProfile @update-data="handleDataUpdate"></uploadProfile>
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
                    <tr v-for="(mahasiswa, index) in mahasiswas" :key="mahasiswa.id">
                        <td class="border border-black py-2 px-2">
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
                                <Button label="" class="bg-yellow-500 text-white" icon="pi pi-user-edit"
                                    @click="editvisible[index] = true" />
                                <Dialog v-model:visible="editvisible[index]" modal header="Edit Data"
                                    :style="{ width: '50vw' }">
                                    <form @submit.prevent="updateData">
                                        <div class="mb-4">
                                            <label for="nim" class="block font-semibold mb-2">NIM:</label>
                                            <InputNumber placeholder="2100000000" v-model="selectedMahasiswa.nim"
                                                inputId="withoutgrouping" :useGrouping="false" class="w-full" id="nim" />
                                        </div>

                                        <div class="mb-4">
                                            <label for="nama" class="block font-semibold mb-2">Nama:</label>
                                            <InputText id="nama" v-model="selectedMahasiswa.nama" class="w-full" />
                                        </div>

                                        <div class="mb-4">
                                            <label for="email" class="block font-semibold mb-2">Email:</label>
                                            <InputText placeholder="example@gmail.com" id="email"
                                                v-model="selectedMahasiswa.email" class="w-full" />
                                        </div>

                                        <div class="mb-4">
                                            <label for="alamat" class="block font-semibold mb-2">Alamat:</label>
                                            <InputText id="alamat" v-model="selectedMahasiswa.alamat" class="w-full" />
                                        </div>

                                        <div class="text-center">
                                            <Button label="Update" type="submit"
                                                class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded select-none"
                                                severity="success" />
                                        </div>
                                    </form>
                                </Dialog>
                                <Button label="" @click="showDeleteConfirmation(index)" class="bg-red-500 text-white"
                                    icon="pi pi-user-minus" severity="danger" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Dialog v-model:visible="visible" modal header="Hapus Data" :style="{ width: '400px' }">
                <p>Are you sure you want to delete this data?</p>
                <div class="flex justify-end space-x-4 pt-6">
                    <Button label="Cancel" class="p-button-text text-gray-500" @click="visible = false" />
                    <Button label="Delete" class="p-button-danger" @click="deletePost" />
                </div>
            </Dialog>
            <Toast></Toast>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import uploadProfile from '../components/uploadProfile.vue';

import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';

export default {
    components: {
        uploadProfile,
        Button,
        Dialog,
        InputNumber,
    },
    data() {
        return {
            nim: null,
            nama: '',
            email: '',
            alamat: '',
            mahasiswas: [],
            editvisible: [],
            visible: false,
            deletingIndex: null,
            imageName: null,
            selectedMahasiswa: {
                nim: null,
                nama: '',
                email: '',
                alamat: '',
            }
        };
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
        async deletePost() {
            try {
                const nim = this.mahasiswas[this.deletingIndex].nim;
                const apiEndpoint = `http://localhost:3000/api/products/${nim}`;
                await axios.delete(apiEndpoint);
                this.mahasiswas.splice(this.deletingIndex, 1);
                this.toast.add({
                    severity: 'success',
                    summary: 'Success Message',
                    detail: 'Data Berhasil Dihapus',
                    life: 3000,
                });
            } catch (error) {
                console.log(error);
            } finally {
                this.visible = false;
                this.deletingIndex = null;
            }
        },
        handleDataUpdate() {
            this.fetchData();
        },


        fetchData() {
            axios
                .get('http://localhost:3000/api/products')
                .then((response) => {
                    this.mahasiswas = response.data;
                    this.mahasiswas.forEach((mahasiswa) => {
                        mahasiswa.imageName = 'http://localhost:3000/Images/Profiles/' + mahasiswa.imagePath;
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        showDeleteConfirmation(index) {
            this.deletingIndex = index;
            this.visible = true;
        },
        showEditDialog(index) {
            this.selectedMahasiswa = { ...this.mahasiswas[index] };
            this.editvisible[index] = true;
        },
        
        updateData() {
            // Perform the update operation using the selectedMahasiswa data
            // ...

            // Emit an event to update the data in the parent component
            this.$emit('update-data');
            this.showToast('success', 'Success Message', 'Data Berhasil Diperbarui');
        },
    },
};
</script>
  
<style></style>
  