<template>
    <div>
        <Button label="" @click="visible = true" class="bg-red-500 text-white" icon="pi pi-user-minus" severity="danger" />

        <Dialog v-model:visible="visible" modal header="Hapus Data" :style="{ width: '400px' }">
            <p>Are you sure you want to delete this data?</p>
            <div class="flex justify-end space-x-4 pt-6">
                <Button label="Cancel" class="p-button-text text-gray-500" @click="visible = false" />
                <Button label="Delete" class="p-button-danger" @click="confirmDelete" />
            </div>
        </Dialog>
    </div>
</template>
  
<script>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
// import axios from 'axios';



export default {
    name: 'deleteProfile',

    components: {
        Button,
        Dialog,
    },

    data() {
        return {
            visible: false,
        };
    },

    methods: {
        confirmDelete() {
            this.$emit('delete', this.nim);
            console.log(this.mahasiswas)

        },

    },
}
</script>
  
<style scoped></style>
  