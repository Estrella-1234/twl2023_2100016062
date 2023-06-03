<template>
    <div>
        <Toast></Toast>
        <h3 class="font-serif font-semibold text-3xl pt-4">Data Mahasiswa</h3>

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
    <div class="pl-8 pr-8">
        <div class="overflow-x-auto">
            <table class="border border-collapse border-black table-auto">
                <thead>
                    <tr class="bg-slate-600 text-white m-5 mt-2 mb-2">
                        <th class="border border-black w-1/8 pt-2 pb-2">NIM</th>
                        <th class="border border-black w-1/2">Nama</th>
                        <th class="border border-black w-1/2">Alamat</th>
                        <th class="border border-black w-1/2">E-Mail</th>
                        <th class="border border-black w-1/8">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="post in posts" :key="post.nim">
                        <td class="border border-black py-2 px-2 text-center">{{ post.nim }} </td>
                        <td class="border border-black py-2 px-2 text-left">{{ post.nama }}</td>
                        <td class="border border-black py-2 px-2 text-left">{{ post.alamat }}</td>
                        <td class="border border-black py-2 px-2 text-left">{{ post.email }}</td>
                        <td class="border border-black py-2 px-2">

                            <!-- Edit Data -->
                            <div class="flex justify-center space-x-2">
                                <Button class="mr-10" icon="pi pi-user-edit" severity="success" text raised
                                    aria-label="Edit" @click="editPost(post)" />
                                <Dialog v-model:visible="visible1" modal header="Edit Data Mahasiswa"
                                    :style="{ width: '50vw' }">
                                    <div>
                                        <form @submit.prevent="updatePost()">
                                            <div class="mb-4">
                                                <label for="nama" class="block font-semibold mb-2">Nama: </label>
                                                <InputText id="nama" v-model="selectedPost.nama" class="w-full" />
                                            </div>
                                            <div class="mb-4">
                                                <label for="nim" class="block font-semibold mb-2">NIM:</label>
                                                <InputNumber v-model="selectedPost.nim" inputId="withoutgrouping"
                                                    :useGrouping="false" class="w-full" id="nim" />
                                            </div>
                                            <div class="mb-4">
                                                <label for="alamat" class="block font-semibold mb-2">Alamat:</label>
                                                <InputText id="alamat" v-model="selectedPost.alamat" class="w-full" />
                                            </div>
                                            <div class="mb-4">
                                                <label for="email" class="block font-semibold mb-2">Email:</label>
                                                <InputText id="email" v-model="selectedPost.email" class="w-full" />
                                            </div>
                                            <div class="text-center">
                                                <Button label="Update" type="submit"
                                                    class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded" />
                                            </div>
                                        </form>
                                    </div>
                                </Dialog>

                                <!-- Delete Data -->
                                <Button icon="pi pi-trash" severity="danger" text raised aria-label="Delete"
                                    @click="confirm2(post), test()" />
                                <Dialog v-model:visible="visible2" modal header="Hapus Data" :style="{ width: '400px' }">
                                    <p>Are you sure you want to delete this data?</p>
                                    <div class="flex justify-end space-x-4 pt-6 ">
                                        <Button label="Cancel" class="p-button-text" @click="visible2 = false" />
                                        <Button label="Delete" class="p-button-danger" @click="deletePost" />
                                    </div>

                                </Dialog>
                            </div>

                        </td>
                    </tr>
                </tbody>

            </table>
        </div>

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
import { useToast } from "primevue/usetoast";



export default {
    name: 'App',

    mounted() {
        this.fetchPosts();
    },


    components: {
        InputText,
        Button,
        Dialog,
        InputNumber,

    },


    setup() {
        const visible = ref(false);
        const visible1 = ref(false);

        const toast = useToast();
        const success = () => {
            toast.add({ severity: 'success', summary: 'Success Message', detail: 'Data Berhasil Disimpan', life: 3000 });
        };
        const change = () => {
            toast.add({ severity: 'success', summary: 'Success Message', detail: 'Data Berhasil Diubah', life: 3000 });
        };
        const del = () => {
            toast.add({ severity: 'error', summary: 'Delete Message', detail: 'Data Berhasil Dihapus', life: 3000 });
        };

        


        return {
            visible,
            visible1,
            success,
            change,
            del,
        };
    },


    data() {
        return {
            visible2: false,
            posts: [],
            showForm: false,
            id: '',
            nama: '',
            nim: 0,
            alamat: '',
            email: '',
            newPost: {
                nama: "",
                nim: 0,
                alamat: "",
                email: "",
            },
            selectedPost: null,
        }
    },

    methods: {

        fetchPosts() {
        axios.get('http://localhost:3001/api/products')
            .then(response => {
                this.posts = response.data;
            })
            .catch(error => {
                console.log(error);
            })
    },



        submitForm() {
            // Check if all fields are filled
            if (this.newPost.nama === '' || this.newPost.nim === 0 || this.newPost.alamat === '' || this.newPost.email === '') {
                alert('Data tdak boleh kosong');
                return;
            }

            // Check if email is valid
            if (!this.validateEmail(this.newPost.email)) {
                alert('Email tidak valid');
                return;
            }


            // Send a POST request to add the new post to the server
            axios.post('http://localhost:3001/api/products', this.newPost)
                .then(response => {
                    this.posts.push(response.data);
                    console.log(response.data);
                    // Clear the form fields
                    this.nama = '';
                    this.nim = '';
                    this.alamat = '';
                    this.email = '';
                    this.success();
                    // Close the dialog
                    this.visible = false;
                    // Refresh fetch posts
                    this.fetchPosts();
                })
                .catch(error => {
                    console.log(error);
                });
        },

        validateEmail(email) {
            // Regular expression to validate email format
            const re = /\S+@\S+\.\S+/;
            return re.test(email);
        },


        editPost(post) {
            this.visible1 = true;
            this.selectedPost = { ...post };
        },

        updatePost() {
            axios.put(`http://localhost:3001/api/products/${this.selectedPost.nim}`, this.selectedPost)
                .then(response => {
                    const updatedPost = response.data;
                    const index = this.posts.findIndex(post => post.id === updatedPost.id);

                    this.posts.splice(index, 1, updatedPost);
                    this.visible1 = false;
                    this.change();
                    // Refresh fetch posts
                    this.fetchPosts();

                })

        },

        deletePost(post) {
            const index = this.posts.indexOf(post);
            this.posts.splice(index, 1);
            this.deleteConfirmed()
            this.visible2 = false;
        },

        confirm2(post) {
            this.visible2 = true;
            this.selectedPost = post;

        },

        deleteConfirmed() {
            axios.delete(`http://localhost:3001/api/products/${this.selectedPost.nim}`, this.selectedPost)
                .then(() => {
                    console.log('Post deleted successfully!');
                    this.del()
                })
        },

    },


};
</script>






