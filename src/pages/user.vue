<template>
    <div>
        <h3 class="font-serif font-semibold text-2xl pt-4">Data Mahasiswa</h3>
    </div>
    <div class="justify-content-center text-left pl-8 pb-7">
        <Button label="Tambah Data" class="text-center" icon="pi pi-user-plus" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Form Data Mahasiswa" :style="{ width: '50vw' }">
        <div class="p-4 bg-white rounded-lg shadow-md">
            <form>
                <div class="mb-4">
                    <label for="nama" class="block font-semibold mb-2">Nama:</label>
                    <InputText id="nama" v-model="nama" class="w-full" />
                    <p v-if="!nama" class="text-red-500 mt-2">Nama harus diisi</p>
                </div>
                <div class="mb-4">
                    <label for="nim" class="block font-semibold mb-2">NIM:</label>
                    <InputText id="nim" v-model="nim" class="w-full" />
                    <p v-if="!nim" class="text-red-500 mt-2">NIM harus diisi</p>
                    <p v-if="nim && !isNumeric(nim)" class="text-red-500 mt-2">NIM harus berupa angka</p>
                </div>
                <div class="mb-4">
                    <label for="alamat" class="block font-semibold mb-2">Alamat:</label>
                    <InputText id="alamat" v-model="alamat" class="w-full" />
                    <p v-if="!alamat" class="text-red-500 mt-2">Alamat harus diisi</p>
                </div>
                <div class="mb-4">
                    <label for="email" class="block font-semibold mb-2">Email:</label>
                    <InputText id="email" v-model="email" class="w-full" />
                    <p v-if="!email" class="text-red-500 mt-2">Email harus diisi</p>
                    <p v-if="email && !isValidEmail(email)" class="text-red-500 mt-2">Email tidak valid</p>
                </div>
                <div class="text-center">
                    <Button label="Submit" @click.prevent="submitForm"
                        class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded" />
                </div>
            </form>
        </div>
        </Dialog>
    </div>

    <div class="pl-8">
        <table>
            <thead>
                <tr>
                    <th>Nama</th>
                    <th>NIM</th>
                    <th>Alamat</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post in posts" :key="post.id">
                    <td>{{ post.nama }}</td>
                    <td>{{ post.nim }}</td>
                    <td>{{ post.alamat }}</td>
                    <td>{{ post.email }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>



<style scoped>
/* Style PrimeVue Components */
.p-inputtext {
    height: 40px;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 0 8px;
    font-size: 16px;
}

.p-button {
    height: 40px;
}
</style>


<script>
// import { InputText, Button } from 'primevue/inputtext';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import { ref } from 'vue';

export default {
    components: {
        InputText,
        Button,
        Dialog,
    },
    setup() {
        const visible = ref(false);

        return {
            visible,
        };
    },
    data() {
        return {
            showForm: false,
            nama: '',
            nim: '',
            alamat: '',
            email: ''
        }
    },
    methods: {
        submitForm() {
            if (!this.nama || !this.nim || !this.alamat || !this.email || !this.isNumeric(this.nim) || !this.isValidEmail(this.email)) {
                alert("Mohon lengkapi formulir dengan benar");
                return;
            }
            // Lakukan sesuatu dengan data yang dikumpulkan
            console.log("Nama:", this.nama);
            console.log("NIM:", this.nim);
            console.log("Alamat:", this.alamat);
            console.log("Email:", this.email);
        },
        isNumeric(value) {
            return /^[0-9]+$/.test(value);
        },
        isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        },
    },
};
</script>






