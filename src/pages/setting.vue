<template>
    <div>
        <h1>Products</h1>
        <ul>
            <li v-for="product in products" :key="product.id">
                {{ product.Product }} - {{ product.Price }}
            </li>
        </ul>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            products: [],
        };
    },
    mounted() {
        axios.get('http://localhost:3001/api/products').then((response) => {
            this.products = response.data;
        });
    },
};
</script>
  