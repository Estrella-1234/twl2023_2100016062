<template>
    <div>
        <input type="file" @change="handleFileUpload" accept="image/*">
        <button @click="uploadImage">Upload</button>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            selectedFile: null
        };
    },
    methods: {
        handleFileUpload(event) {
            this.selectedFile = event.target.files[0];
        },
        uploadImage() {
            const formData = new FormData();
            formData.append('image', this.selectedFile);

            axios.post('http://localhost:3000/api/upload', formData)
                .then(response => {
                    console.log(response.data);
                    // Handle the response as needed
                })
                .catch(error => {
                    console.error(error);
                    // Handle the error as needed
                });
        }
    }
};
</script>
  