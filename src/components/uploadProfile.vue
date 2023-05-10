<template >
    <div class="justify-content-center text-left pl-8 pb-7" @click="visible = true">
        <Button label="Tambah Data" class="text-center" icon="pi pi-user-plus" />
        <Dialog v-model:visible="visible" modal header="Upload Data" :style="{ width: '50vw' }">
        <form @submit.prevent="uploadFile">
            <div class="mb-4">
                <label for="nim" class="block font-semibold mb-2">NIM:</label>
                <!-- <input type="text" id="nim" v-model="nim" /> -->
                <InputNumber v-model="nim" inputId="withoutgrouping" :useGrouping="false" class="w-full"
                    id="nim" />
            </div>

            <div class="mb-4">
                <label for="nama" class="block font-semibold mb-2">Nama:</label>
                <!-- <input type="text" id="nama" v-model="nama" /> -->
                <InputText id="nama" v-model="nama" class="w-full" />
            </div>

            <div class="mb-4">
                <label for="email">Email:</label>
                <!-- <input type="email" id="email" v-model="email" /> -->
                <InputText id="email" v-model="email" class="w-full" />
            </div>

            <div class="mb-4">
                <label for="alamat">Alamat:</label>
                <!-- <input type="text" id="alamat" v-model="alamat" /> -->
                <InputText id="alamat" v-model="alamat" class="w-full" />
            </div>
        
            <div class="mb-4">
                <label for="image">File:</label>
                <input type="file" id="image" ref="fileInput" />
            </div>
            <button type="submit">Upload</button>
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
            nim: '',
            nama: '',
            email: '',
            alamat: '',

            mahasiswas: [],
            imagePath: null,
        }
    },


methods: {

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
            const imagePath = response.data.path;

            console.log(' Foto berhasil diupload');

            const { nim, nama, email, alamat } = this;
            const data = { nim, nama, email, alamat, imagePath };

            console.log(data); // menampilkan data produk di console

            await axios.post('http://localhost:3000/api/products', data)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });

            console.log('Data mahasiswa berhasil ditambahkan');
        } catch (error) {
            console.log(error);
        }
    },

    async fetchData() {
            try {
                const response = await axios.get('http://localhost:3000/api/products');
                this.mahasiswas = response.data;
                console.log(this.mahasiswas);

                // Menambahkan base url pada imagePath
                this.mahasiswas.forEach(mahasiswa => {
                    mahasiswa.imagePath = 'http://localhost:3000/Images/Profiles/' + mahasiswa.imagePath;
                });
            } catch (error) {
                console.log(error);
            }
        },

}

}
</script>


<style ></style>