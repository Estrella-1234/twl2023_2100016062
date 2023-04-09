<template>
    <div>
        <h3 class="font-serif font-semibold text-2xl pt-4">Data Mahasiswa</h3>

        <!-- Pop Up Form Input-->
        <div class="justify-content-center text-left pl-8 pb-7">
            <Button label="Tambah Data" class="text-center" icon="pi pi-user-plus" @click="visible = true" />
            <Dialog v-model:visible="visible" modal header="Form Data Mahasiswa" :style="{ width: '50vw' }">
                <div class="p-4 bg-white rounded-lg shadow-md">

                    <form @submit.prevent="submitForm">
                        <div class="mb-4">
                            <label for="nama" class="block font-semibold mb-2">Nama:</label>
                            <InputText id="nama" v-model="newPost.nama" class="w-full" />

                        </div>
                        <div class="mb-4">
                            <label for="nim" class="block font-semibold mb-2">NIM:</label>
                            <InputNumber v-model="newPost.nim" inputId="withoutgrouping" :useGrouping="false" class="w-full"
                                id="nim" />

                        </div>
                        <div class="mb-4">
                            <label for="alamat" class="block font-semibold mb-2">Alamat:</label>
                            <InputText id="alamat" v-model="newPost.alamat" class="w-full" />

                        </div>
                        <div class="mb-4">
                            <label for="email" class="block font-semibold mb-2">Email:</label>
                            <InputText id="email" v-model="newPost.email" class="w-full" />

                        </div>
                        <div class="text-center">
                            <Button label="Submit" type="submit"
                                class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded" />
                        </div>
                    </form>
                </div>
            </Dialog>
        </div>
    </div>

    <!-- Read Data -->
    <div class="pl-8">
        <table class="border border-collapse border-black table-fixed">
            <thead>
                <tr>
                    <th class="border border-black w-28">NIM</th>
                    <th class="border border-black w-44">Nama</th>
                    <th class="border border-black w-80">Alamat</th>
                    <th class="border border-black w-48">E-Mail</th>
                    <th class="border border-black w-36">Tools</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post in posts" :key="post.nim">
                    <td class="border border-black text-left">{{ post.nim }}</td>
                    <td class="border border-black text-left">{{ post.nama }}</td>
                    <td class="border border-black text-left">{{ post.alamat }}</td>
                    <td class="border border-black text-left">{{ post.email }}</td>
                    <td class="border border-black ">
                        <Button class="mr-10" icon="pi pi-pencil" severity="success" text raised aria-label="Edit" />
                        <Button icon="pi pi-trash" severity="danger" text raised  aria-label="Delete" />
                        
                        
                    </td>
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
import axios from 'axios';
import InputNumber from 'primevue/inputnumber';



export default {
    name: 'App',

    mounted() {
        axios.get('http://localhost:3000/mahasiswa')
            .then(response => {

                this.posts = response.data;
            })
            .catch(error => {
                console.log(error);
            })
    },


    components: {
        InputText,
        Button,
        Dialog,
        InputNumber,
    },
    setup() {
        const visible = ref(false);

        return {
            visible,
        };
    },

    data() {
        return {
            posts: [],
            showForm: false,
            nama: '',
            nim: '',
            alamat: '',
            email: '',
            newPost: { nama: '', nim: '', alamat: '', email: '' },
        }
    },

    methods: {

        submitForm() {
            // Check if all fields are filled
            if (this.newPost.nama === '' || this.newPost.nim === '' || this.newPost.alamat === '' || this.newPost.email === '') {
                alert('Please fill all fields');
                return;
            }

            // Check if email is valid
            if (!this.validateEmail(this.newPost.email)) {
                alert('Email is not valid');
                return;
            }



            // Send a POST request to add the new post to the server
            axios.post('http://localhost:3000/mahasiswa', this.newPost)
                .then(response => {
                    this.posts.push(response.data);
                    // Clear the form fields
                    this.nama = '';
                    this.nim = '';
                    this.alamat = '';
                    this.email = '';
                    // Close the dialog
                    this.visible = false;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        validateEmail(email) {
            // Regular expression to validate email format
            const re = /\S+@\S+\.\S+/;
            return re.test(email);
        }


    },


};
</script>






