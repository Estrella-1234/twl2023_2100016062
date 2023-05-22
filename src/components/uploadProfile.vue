<template >
    <div class="justify-content-center text-left pl-8 pb-3">

        <div class="pt-8">
            <Button @click="visible = true" label="Tambah Data" class="text-center" icon="pi pi-user-plus" severity="success" />
        </div>
        <Dialog v-model:visible="visible" @close="handleDialogClose" modal header="Upload Data" :style="{ width: '50vw' }">
            <form @submit.prevent="uploadFile">
                <div class="mb-4">
                    <label for="nim" class="block font-semibold mb-2">NIM:</label>
                    <!-- <input type="text" id="nim" v-model="nim" /> -->
                    <InputNumber placeholder="2100000000" v-model="nim" inputId="withoutgrouping" :useGrouping="false"
                        class="w-full" id="nim" />
                </div>

                <div class="mb-4">
                    <label for="nama" class="block font-semibold mb-2">Nama:</label>
                    <!-- <input type="text" id="nama" v-model="nama" /> -->
                    <InputText id="nama" v-model="nama" class="w-full" />
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
                    <label for="image" class="block font-semibold mb-2">File:</label>
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
        return {
            visible,

        }
    },

    data() {
        return {
            nim: 0,
            nama: '',
            email: '',
            alamat: '',

            mahasiswas: [],
            imageName: null,
        }
    },


    methods: {
        // method / function untuk menutup dan mengupdate data
        handleDialogClose() {
            const updatedData = {
                nim: this.nim,
                nama: this.nama,
                email: this.email,
                alamat: this.alamat,
                imageName: this.imageName,
            };
            this.$emit('update-data', updatedData);
            this.visible = false; // Close the dialog
        },



        // method / fuction untuk mengupload file
        async uploadFile() {
            console.log('Button works');
            const fileInput = this.$refs.fileInput;
            const file = fileInput.files[0];
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await axios.post('http://localhost:3000/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                const imageName = response.data.path;

                const { nim, nama, email, alamat } = this;
                const data = { nim, nama, email, alamat, imageName };

                // console.log(data); // menampilkan data produk di console

                await axios.post('http://localhost:3000/api/products', data)
                    .then(response => {
                        this.response = response;
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });

                alert('Data berhasil ditambahkan');
                this.handleDialogClose();
            } catch (error) {
                console.log(error);
            }
        },

        async fetchData() {
            try {
                const response = await axios.get('http://localhost:3000/api/products');
                this.mahasiswas = response.data;
                console.log(this.mahasiswas);

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


<style ></style>