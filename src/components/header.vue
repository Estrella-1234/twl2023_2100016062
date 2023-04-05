<template>
  <div class="w-full bg-gray-100 ">
    <div class="flex justify-between items-center h-[50px]">
      <div class="p-4 cursor-pointer  hover:bg-gray-50" @click="clickHambuger">
        <i class="pi pi-bars"></i>
      </div>
      <div class="py-2">
        <!-- <InputText type="text" v-model="value"  placeholder="Search.." /> -->
        <span class="p-input-icon-left">
        <i class="pi pi-search"/>
        <InputText v-model="value1" class="h-[40px]" placeholder="Search" />
        </span>
      </div>
      <div class="flex space-x-3 items-center justify-center px-3">
        <div class="text-md">Admin</div>
        <Avatar icon="pi pi-prime" class="mr-2" style="background-color:#9c27b0; color: #ffffff" shape="circle" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
        <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataOpenSideBar: Boolean,
    clickHambuger: Function
  },
  data() {
    return {
      items: [
        {
          label: 'Logout',
          icon: 'pi pi-power-off',
          command: () => {
            this.$toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
          }
        },
        {
          label: 'Change Password',
          icon: 'pi pi-lock',
          command: () => {
            this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
          }
        },
      ]
    }
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
  }

}
</script>

<style>

</style>