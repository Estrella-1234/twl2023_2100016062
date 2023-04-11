<template>
    <div>
        <h1>Products</h1>
        <ul>
            <li v-for="product in products" :key="product.id">
                {{ product.name }} - {{ product.price }}
                <button @click="editProduct(product)">Edit</button>
                <button @click="deleteProduct(product)">Delete</button>
            </li>
        </ul>
        <form @submit.prevent="saveProduct">
            <input type="text" v-model="product.name" placeholder="Name">
            <input type="text" v-model="product.description" placeholder="Description">
            <input type="number" v-model="product.price" placeholder="Price">
            <button type="submit">{{ isEdit ? 'Update' : 'Save' }}</button>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios'

export default {
    name: 'Products',
    data() {
        return {
            products: [],
            product: { name: '', description: '', price: 0 },
            isEdit: false,
            apiUrl: 'http://localhost:3000/products'
        }
    },
    async created() {
        this.getProducts()
    },
    methods: {
        async getProducts() {
            const response = await axios.get(this.apiUrl)
            this.products = response.data
        },
        async saveProduct() {
            if (this.isEdit) {
                await axios.put(`${this.apiUrl}/${this.product.id}`, this.product)
            } else {
                await axios.post(this.apiUrl, this.product)
            }
            this.resetForm()
            this.getProducts()
        },
        async editProduct(product) {
            this.product = { ...product }
            this.isEdit = true
        },
        async deleteProduct(product) {
            if (confirm(`Are you sure you want to delete ${product.name}?`)) {
                await axios.delete(`${this.apiUrl}/${product.id}`)
                this.getProducts()
            }
        },
        resetForm() {
            this.product = { name: '', description: '', price: 0 }
            this.isEdit = false
        }
    }
}
</script>
