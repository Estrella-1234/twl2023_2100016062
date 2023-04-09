<template>
    <div class="justify-content-center text-center">
        <Button label="Show" class="text-center" icon="pi pi-external-link" @click="visible = true" />
        <Dialog v-model:visible="visible" modal header="Form Data Mahasiswa" :style="{ width: '50vw' }">
        <div class="p-4 bg-white rounded-lg shadow-md">

            <form @submit.prevent="submitForm">
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
</template>

<script>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { ref } from 'vue';

export default {
    components: {
        Button,
        Dialog,
    },
    setup() {
        const visible = ref(false);

        return {
            visible,
        };
    },
};
</script>
  