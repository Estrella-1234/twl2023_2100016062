<template>
  <div class="bg-gray-200 p-4 pl-50">
    <h1 class="font-bold text-4xl text-center mb-6">Daftar Post</h1>
    <div></div>
    <table class="border border-collapse border-black">
      <thead>
        <tr>
          <th class="border border-black">ID</th>
          <th class="border border-black">Title</th>
          <th class="border border-black">Body</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td class="border border-black">{{ post.id }}</td>
          <td class="border border-black">{{ post.title }}</td>
          <td class="border border-black">{{ post.body }}</td>
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
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        this.posts = response.data;
      })
      .catch(error => {
        console.log(error);
      })
  }
}
</script>
