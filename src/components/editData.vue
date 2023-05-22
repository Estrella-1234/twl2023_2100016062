<template >
    <!-- Edit Data -->
    <div class="flex justify-center space-x-2">
        <Button class="mr-10" icon="pi pi-user-edit" severity="success" text raised aria-label="Edit"
            @click="editPost(post)" />
        <Dialog v-model:visible="visible1" modal header="Edit Data Mahasiswa" :style="{ width: '50vw' }">
            <div>
                <form @submit.prevent="updatePost()">
                    <div class="mb-4">
                        <label for="Nama" class="block font-semibold mb-2">Nama: </label>
                        <InputText id="Nama" v-model="selectedPost.Nama" class="w-full" />
                    </div>
                    <div class="mb-4">
                        <label for="NIY" class="block font-semibold mb-2">NIY:</label>
                        <InputNumber v-model="selectedPost.NIY" inputId="withoutgrouping" :useGrouping="false"
                            class="w-full" id="NIY" />
                    </div>
                    <div class="mb-4">
                        <label for="Alamat" class="block font-semibold mb-2">Alamat:</label>
                        <InputText id="Alamat" v-model="selectedPost.Alamat" class="w-full" />
                    </div>
                    <div class="mb-4">
                        <label for="Jabatan" class="block font-semibold mb-2">Jabatan:</label>
                        <InputText id="Jabatan" v-model="selectedPost.Jabatan" class="w-full" />
                    </div>
                    <div class="text-center">
                        <Button label="Update" type="submit"
                            class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded" />
                    </div>
                </form>
            </div>
        </Dialog>
        </div>
</template>

<script>
export default {

}
</script>
<style lang="">
    
</style>