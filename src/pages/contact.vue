<template>
    <div>
        <div v-if="a">
            <div>
                <label for="image" class="block font-semibold mb-2">File:</label>
                <input type="file" id="image" ref="fileInput" />
                <button @click="uploadImage">Upload</button>
            </div>
        </div>
        <div v-else>
            <comingSoon></comingSoon>
        </div>
    </div>
</template>
  
<script>
import comingSoon from '@/components/comingSoon.vue';
import axios from 'axios';

export default {
    components: {
        comingSoon,
    },
    data() {
        return {
            a: false,
        }
    },
    methods: {
        handleFileUpload(event) {
            this.selectedFile = event.target.files[0];
        },
        async uploadImage() {
            const fileInput = this.$refs.fileInput;
            const file = fileInput.files[0];
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await axios.post('http://localhost:3008/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                const fileName = response.data.fileName; // Retrieve the file name from the response
                const filePath = response.data.filePath; // Retrieve the file path from the response
                console.log('File uploaded:', fileName, filePath);

            } catch (error) {
                console.error(error);
            }
        }
    }
}

</script>
