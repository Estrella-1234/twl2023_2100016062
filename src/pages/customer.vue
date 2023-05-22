<template>
    <div>
        <uploadProfile @update-data="handleDataUpdate"></uploadProfile>
    </div>

    <h3 class="font-serif font-semibold text-3xl pb-3">Data Mahasiswa</h3>
    <div class="pl-8 pr-8">
        <div class="overflow-x-auto">
            <table class="border border-collapse border-black table-auto">
                <thead>
                    <tr class="bg-slate-600 text-white m-5">
                        <th class="border border-black w-1/6 pt-2 pb-2">Foto</th>
                        <th class="border border-black w-1/8">NIM</th>
                        <th class="border border-black w-1/2">Nama</th>
                        <th class="border border-black w-1/2">Email</th>
                        <th class="border border-black w-1/2">Alamat</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="mahasiswa in mahasiswas" :key="mahasiswa.id">
                        <td class="border border-black py-2 px-2 align-middle flex justify-center items-center">
                            <img :src="mahasiswa.imageName" class="rounded-full" alt="foto" width="100" />
                        </td>
                        <td class="border border-black py-2 px-2 text-center">{{ mahasiswa.nim }}</td>
                        <td class="border border-black py-2 px-2 text-left">{{ mahasiswa.nama }}</td>
                        <td class="border border-black py-2 px-2 text-left">{{ mahasiswa.email }}</td>
                        <td class="border border-black py-2 px-2 text-left">{{ mahasiswa.alamat }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import uploadProfile from '../components/uploadProfile.vue';
export default {
    components: {
        uploadProfile
    },
    data() {
        return {
            nim: '',
            nama: '',
            email: '',
            alamat: '',

            mahasiswas: [],
            imageName: null,
        }
    },





    mounted() {
        this.fetchData();
    },

    methods: {
        handleDataUpdate(mahasiswas) {
            // Update your main component's data with the updatedData object
            this.nim = mahasiswas.nim;
            this.nama = mahasiswas.nama;
            this.email = mahasiswas.email;
            this.alamat = mahasiswas.alamat;
            this.imageName = mahasiswas.imageName;
            console.log(this.imageName);
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
