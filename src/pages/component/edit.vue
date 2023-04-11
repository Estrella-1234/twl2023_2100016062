<template>
    <div>
        <form @submit.prevent="updatePost">
            <div class="mb-4">
                <label for="nama" class="block font-semibold mb-2">Nama: </label>
                <InputText id="nama" v-model="post.nama" class="w-full" />
            </div>
            <div class="mb-4">
                <label for="nim" class="block font-semibold mb-2">NIM:</label>
                <InputNumber v-model="post.nim" inputId="withoutgrouping" :useGrouping="false" class="w-full" id="nim" />
            </div>
            <div class="mb-4">
                <label for="alamat" class="block font-semibold mb-2">Alamat:</label>
                <InputText id="alamat" v-model="post.alamat" class="w-full" />
            </div>
            <div class="mb-4">
                <label for="email" class="block font-semibold mb-2">Email:</label>
                <InputText id="email" v-model="post.email" class="w-full" />
            </div>
            <div class="text-center">
                <Button label="Update" type="submit"
                    class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded" />
            </div>
        </form>
    </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
// import axios from 'axios';

export default {
    name: 'Edit',


    data() {
        return {
            post: {},
        };
    },


    components: {
        InputText,
        Button,
        InputNumber
    }
}


</script>
