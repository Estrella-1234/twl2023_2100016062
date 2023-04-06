<template>
    <div class="bg-gray-200 min-h-screen p-4">
        <h1 class="font-bold text-4xl text-center mb-6">Daftar Post</h1>
        <div></div>
        <table class="border border-collapse border-black">
            <thead>
                <tr>
                    <th class="border border-black">Nama</th>
                    <th class="border border-black">NIM</th>
                    <th class="border border-black">Alamat</th>
                    <th class="border border-black">E-Mail</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post in posts" :key="post.id">
                    <td class="border border-black">{{ post.nama }}</td>
                    <td class="border border-black">{{ post.nim }}</td>
                    <td class="border border-black">{{ post.alamat }}</td>
                    <td class="border border-black">{{ post.email }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'App',
    data() {
        return {
            posts: []
        }
    },
    mounted() {
        axios.get('http://localhost/api/index.php')
            .then(response => {
                this.posts = response.data;
            })
            .catch(error => {
                console.log(error);
            })
    }
}
</script>
  