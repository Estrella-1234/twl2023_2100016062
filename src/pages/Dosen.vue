<template>
    <div>
        <div>
            <div>
                <h3 class="font-serif font-semibold text-3xl pt-5 ">Data Dosen</h3>
                <!-- Pop Up Form Input-->
                <div class="justify-content-center text-left pl-8 pb-7">
                    <Button label="Tambah Data" class="text-center" icon="pi pi-user-plus" @click="visible = true"
                        severity="success" />
                    <Dialog v-model:visible="visible" modal header="Form Data Dosen" :style="{ width: '50vw' }">
                        <div class="p-4 bg-white rounded-lg shadow-md">

                            <form @submit.prevent="submitForm">
                                <div class="mb-4">
                                    <label for="NIY" class="block font-semibold mb-2">NIY:</label>
                                    <InputNumber v-model="newPost.NIY" inputId="withoutgrouping" :useGrouping="false"
                                        class="w-full" id="NIY" />
                                </div>

                                <div class="mb-4">
                                    <label for="Nama" class="block font-semibold mb-2">Nama:</label>
                                    <InputText id="Nama" v-model="newPost.nama" class="w-full" />
                                </div>

                                <div class="mb-4">
                                    <label for="Alamat" class="block font-semibold mb-2">Alamat:</label>
                                    <InputText id="Alamat" v-model="newPost.alamat" class="w-full" />
                                </div>

                                <div class="mb-4">
                                    <label for="Jabatan" class="block font-semibold mb-2">Jabatan:</label>
                                    <InputText id="Jabatan" v-model="newPost.jabatan" class="w-full" />

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
        </div>
        <!-- Read Data -->
        <div class="pl-8 pr-8">
            <div class="overflow-x-auto">
                <table class="border border-collapse border-black table-auto bg-white">
                    <thead>
                        <tr class="bg-slate-600 text-white ">
                            <th class="border border-black w-1/8 pt-2 pb-2">NIY</th>
                            <th class="border border-black w-1/2">Nama</th>
                            <th class="border border-black w-1/2">Alamat</th>
                            <th class="border border-black w-1/6">Jabatan</th>
                            <th class="border border-black w-1/8">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(post, index) in posts" :key="post.NIY">
                            <td class="border border-black py-2 px-2 text-center">{{ post.NIY }} </td>
                            <td class="border border-black py-2 px-2 text-left">{{ post.nama }}</td>
                            <td class="border border-black py-2 px-2 text-left">{{ post.alamat }}</td>
                            <td class="border border-black py-2 px-2 text-left">{{ post.jabatan }}</td>
                            <td class="border border-black py-2 px-2">
                                <div class="flex justify-center space-x-2">
                                    <Button label="" class="bg-yellow-500 text-white" icon="pi pi-user-edit"
                                        @click="showEditDialog(index)" text raised outlined />
                                    <Button label="" @click="showDeleteConfirmation(index)" class="bg-red-500 text-white"
                                        icon="pi pi-user-minus" severity="danger" text raised outlined />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Dialog v-model:visible="editingDialogVisible" modal header="Edit Data" :style="{ width: '50vw' }">
                    <div>
                        <form @submit.prevent="updateData">
                            <div class="mb-4">
                                <label for="NIY" class="block font-semibold mb-2">NIY:</label>
                                <InputNumber v-model="selectedPost.NIY" inputId="withoutgrouping" :useGrouping="false"
                                    class="w-full" id="NIY" />
                            </div>
                            <div class="mb-4">
                                <label for="Nama" class="block font-semibold mb-2">Nama: </label>
                                <InputText id="Nama" v-model="selectedPost.nama" class="w-full" />
                            </div>
                            <div class="mb-4">
                                <label for="Alamat" class="block font-semibold mb-2">Alamat:</label>
                                <InputText id="Alamat" v-model="selectedPost.alamat" class="w-full" />
                            </div>
                            <div class="mb-4">
                                <label for="Jabatan" class="block font-semibold mb-2">Jabatan:</label>
                                <InputText id="Jabatan" v-model="selectedPost.jabatan" class="w-full" />
                            </div>
                            <div class="text-center">
                                <Button label="Update" type="submit"
                                    class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded" />
                            </div>
                        </form>
                    </div>
                </Dialog>

                <Dialog v-model:visible="visible2" modal header="Hapus Data" :style="{ width: '400px' }">
                    <p>Are you sure you want to delete this data?</p>
                    <div class="flex justify-end space-x-4 pt-6 ">
                        <Button label="Cancel" class="p-button-text" @click="visible2 = false" />
                        <Button label="Delete" class="p-button-danger" @click="deletePost()" />
                    </div>
                </Dialog>
            </div>
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
        const success = (Message, summary) => {
            toast.add({ severity: 'success', summary: summary, detail: Message, life: 5000 });
        };
        const warn = (Message, summary) => {
            toast.add({ severity: 'warn', summary: summary, detail: Message, life: 5000 });
        };
        const error = (Message, summary) => {
            toast.add({ severity: 'error', summary: summary, detail: Message, life: 5000 });
        };

        const hasToken = ref(!!localStorage.getItem('token'));


        return {
            visible,
            visible1,
            success,
            warn,
            error,
            hasToken,
        };
    },


    data() {
        return {
            mode: 'login', // Initial mode is set to login
            posts: [],
            id: '',
            nama: '',
            NIY: null,
            alamat: '',
            jabatan: '',
            newPost: {
                nama: "",
                NIY: null,
                alamat: "",
                jabatan: "",
            },
            visible2: false,
            selectedPost: null,
            editingDialogVisible: false,
            deleteDialogVisible: false,
            deletingIndex: null,
            editingIndex: null,

        }
    },

    methods: {
        switchMode(mode) {
            this.mode = mode;
        },

        fetchPosts() {
            // Retrieve the token from localStorage
            const token = localStorage.getItem('token');

            // Include the token in the Authorization header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            axios
                .get('http://localhost:3008/dosen', config)
                .then((response) => {
                    this.posts = response.data;
                    this.sortPostsByNIY(); // Sort the posts array by NIY
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        sortPostsByNIY() {
            this.posts.sort((a, b) => a.NIY - b.NIY);
        },

        async submitForm() {
            try {
                // Retrieve the token from localStorage
                const token = localStorage.getItem('token');

                // Include the token in the Authorization header
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                // Check if all fields are filled
                if (!this.newPost.NIY || !this.newPost.nama || !this.newPost.alamat || !this.newPost.jabatan) {
                    this.warn('Data tidak boleh kosong', 'Alert Message');
                    return;
                }

                // Send a POST request to add the new post to the server
                const response = await axios.post('http://localhost:3008/dosen', this.newPost, config);
                this.posts.push(response.data);

                // Clear the form fields
                this.newPost.nama = '';
                this.newPost.NIY = null;
                this.newPost.alamat = '';
                this.newPost.jabatan = '';

                this.success('Data berhasil ditambahkan', 'Success Message');

                // Close the dialog
                this.visible = false;

                // Refresh fetch posts
                this.fetchPosts();
            } catch (error) {
                const errorMessage = error.response.data.message;
                this.error("Data Gagal Ditambahkan: " + errorMessage, 'Error Message');
            }
        },

        showDeleteConfirmation(index) {
            this.deletingIndex = index;
            this.visible2 = true;
        },

        async deletePost() {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const id = this.posts[this.deletingIndex]._id;
                const apiEndpoint = `http://localhost:3008/dosen/${id}`;
                await axios.delete(apiEndpoint, config);
                this.posts.splice(this.deletingIndex, 1);
                this.success('Data berhasil dihapus', 'Success Message');
            } catch (error) {
                console.log(error);
                this.error('Data gagal dihapus', 'Error Message');
            } finally {
                this.visible2 = false;
                this.deletingIndex = null;
            }
        },

        showEditDialog(index) {
            this.selectedPost = { ...this.posts[index] };
            this.editingIndex = index;
            this.editingDialogVisible = true;
        },

        async updateData() {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                // Check if all fields are filled
                if (!this.selectedPost.NIY || !this.selectedPost.nama || !this.selectedPost.alamat || !this.selectedPost.jabatan) {
                    this.warn('Data tidak boleh kosong', 'Alert Message');
                    return;
                }
                const id = this.posts[this.editingIndex]._id;
                const apiEndpoint = `http://localhost:3008/dosen/${id}`;
                await axios.put(apiEndpoint, this.selectedPost, config);
                this.posts[this.editingIndex] = { ...this.selectedPost };
                this.success('Data berhasil diupdate', 'Success Message');
                this.editingDialogVisible = false;
            } catch (error) {
                const errorMessage = error.response.data.message;
                this.error("Data Gagal Diubah : " + errorMessage, 'Error Message');
                this.editingDialogVisible = false;
            }
        },

    },

};
</script>






