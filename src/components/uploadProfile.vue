<template >
    <div>
        <h2>Upload File</h2>
        <form @submit.prevent="uploadFile">
            <div>
                <label for="nim">NIM:</label>
                <input type="text" id="nim" v-model="nim" />
            </div>
            <div>
                <label for="nama">Nama:</label>
                <input type="text" id="nama" v-model="nama" />
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" />
            </div>
            <div>
                <label for="alamat">Alamat:</label>
                <input type="text" id="alamat" v-model="alamat" />
            </div>
            <div>
                <label for="image">File:</label>
                <input type="file" id="image" ref="fileInput" />
            </div>
            <button type="submit">Upload</button>
        </form>
    </div>
</template>


<script>
import axios from 'axios';
export default {
    name: 'uploadProfile',

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



    async uploadFile() {
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
    }

}
</script>


<style ></style>