<template>
  <div class="w-full h-full flex overflow-auto">
    <sidebar :dataOpenSideBar="openSidebar" />
    <div class="w-full h-full">
      <headerTop :dataOpenSideBar="openSidebar" :clickHambuger="toggleSidebar" />
      <div class="w-full h-[calc(100vh-50px)] overflow-auto">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import headerTop from './../../components/header.vue'
import sidebar from './../../components/sidebar.vue'

export default {
  components: { headerTop, sidebar },
  data() {
    return {
      openSidebar: true
    }
  },
  methods: {
    toggleSidebar() {
      this.openSidebar = !this.openSidebar
    }
  }

}
</script>

<style>

</style>