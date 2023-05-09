<template>
    <div>
        <h2>Upload File</h2>
        <form @submit.prevent="uploadFile">
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
    methods: {
        uploadFile() {
            const fileInput = this.$refs.fileInput;
            const file = fileInput.files[0];
            const formData = new FormData();
            formData.append('image', file);

            axios.post('http://localhost:3000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}
</script>
