<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  },

  methods: {
    fetchData() {
      this.mahasiswas.forEach(mahasiswa => {
        mahasiswa.imageName = 'http://localhost:3000/Images/Profiles/' + mahasiswa.imageName;
        mahasiswa.id = mahasiswa.nim; // Menambahkan properti 'id' dengan nilai 'nim'
      });

    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
