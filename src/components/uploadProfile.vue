<template >
    <div class="justify-content-center text-left pl-8 pb-3">

        <div class="pt-3">
            <Button label="Tambah Data" class="text-center" icon="pi pi-user-plus" @click="visible = true"
                severity="success" />
        </div>
        <Dialog v-model:visible="visible" @close="handleDialogClose" modal header="Upload Data" :style="{ width: '50vw' }">
            <form @submit.prevent="uploadFile">
                <div class="mb-4">
                    <label for="NIM" class="block font-semibold mb-2">NIM:</label>
                    <!-- <input type="text" id="NIM" v-model="NIM" /> -->
                    <InputNumber placeholder="2100000000" v-model="NIM" inputId="withoutgrouping" :useGrouping="false"
                        class="w-full" id="NIM" />
                </div>

                <div class="mb-4">
                    <label for="Nama" class="block font-semibold mb-2">Nama:</label>
                    <!-- <input type="text" id="Nama" v-model="Nama" /> -->
                    <InputText id="Nama" v-model="Nama" class="w-full" />
                </div>

                <div class="mb-4">
                    <label for="email" class="block font-semibold mb-2">Email:</label>
                    <!-- <input type="email" id="email" v-model="email" /> -->
                    <InputText placeholder="example@gmail.com" id="email" v-model="email" class="w-full" />
                </div>

                <div class="mb-4">
                    <label for="alamat" class="block font-semibold mb-2">Alamat:</label>
                    <!-- <input type="text" id="alamat" v-model="alamat" /> -->
                    <InputText id="alamat" v-model="alamat" class="w-full" />
                </div>

                <div class="mb-4">
                    <label for="image" class="block font-semibold mb-2">Foto:</label>
                    <input type="file" id="image" ref="fileInput" />
                </div>
                <div class="text-center">
                    <Button label="Submit" type="submit"
                        class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded select-none "
                        severity="success" />
                </div>
                <!-- <button type="submit">Upload</button> -->
            </form>
        </Dialog>
    </div>
</template>


<script>
import axios from 'axios';
import Button from 'primevue/button';
import { ref } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';

import { useToast } from "primevue/usetoast";

export default {
    name: 'uploadProfile',


    components: {
        Button,
        Dialog,
        InputText,
        InputNumber,
    },

    setup() {
        const visible = ref(false);
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
            visible,
            success,
            warn,
            error,
        }
    },

    data() {
        return {
            NIM: null,
            Nama: '',
            email: '',
            alamat: '',


            mahasiswas: [],
            imageName: null,

        }
    },


    methods: {
        // method / function untuk menutup dan mengupdate data
        handleDialogClose() {
            this.fetchData(); // Refresh the data
            this.visible = false; // Close the dialog
        },

        validateEmail(email) {
            // Regular expression to validate email format
            const re = /\S+@\S+\.\S+/;
            return re.test(email);
        },

        // method / fuction untuk mengupload file
        async uploadFile() {
            if (!this.NIM || !this.Nama || !this.email || !this.alamat) {
                this.warn('Data tidak boleh kosong', 'Alert Message');
                return;
            }

            if (!this.validateEmail(this.email)) {
                this.warn('Email tidak valid', 'Alert Message');
                return;
            }

            if (!this.$refs.fileInput.files[0]) {
                this.warn('File tidak boleh kosong', 'Alert Message');
                return;
            }

            const fileInput = this.$refs.fileInput;
            const file = fileInput.files[0];
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await axios.post('http://localhost:3008/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                // Retrieve the file name from the response
                const fileName = response.data.fileName;
                // Retrieve the token from localStorage
                const token = localStorage.getItem('token');

                // Include the token in the Authorization header
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                // Include imageName and imagePath in the data object
                const { NIM, Nama, email, alamat } = this;
                const data = {
                    NIM,
                    Nama,
                    email,
                    alamat,
                    imageName: fileName, // Add the fileName property
                };


                await axios.post('http://localhost:3008/mahasiswa', data, config)
                    .then(response => {
                        this.response = response;
                        this.$emit('update-data');
                        this.handleDialogClose();
                        // window.location.reload();
                        this.success("Data Berhasil Disimpan", 'Success Message');
                    });


            } catch (error) {
                const errorMessage = error.response.data.message;
                this.error("Data Gagal Ditambahkan : " + errorMessage, 'Error Message');
            }
        },

        fetchData() {
            const token = localStorage.getItem('token');

            // Include the token in the Authorization header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            axios.get('http://localhost:3008/mahasiswa', config)
                .then((response) => {
                    this.mahasiswas = response.data;
                    this.sortPostsByNIM(); // Sort the posts array by NIY
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        sortPostsByNIM() {
            this.mahasiswas.sort((a, b) => a.NIM - b.NIM);
        },
    }

}
</script>


<style ></style>