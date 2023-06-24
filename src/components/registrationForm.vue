<template>
    <div>
        <h2 class="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form @submit.prevent="register">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="fullname">Nama Lengkap</label>
                <input v-model="registrationData.fullname"
                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="fullname" type="text" placeholder="Enter your full name">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                <input v-model="registrationData.email"
                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email" type="email" placeholder="Enter your email">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
                <input v-model="registrationData.username"
                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username" type="text" placeholder="Enter your username">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                <input v-model="registrationData.password"
                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password" type="password" placeholder="Enter your password">
            </div>
            <div class="flex items-center justify-between">
                <button
                    class="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button" @click="switchToLogin">Log In</button>
                <button
                    class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">Register</button>
            </div>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    name: 'RegistrationForm',
    data() {
        return {
            registrationData: {
                fullname: '',
                email: '',
                username: '',
                password: '',
            },
        };
    },
    methods: {
        switchToLogin() {
            this.$emit('switch-mode', 'login');
        },
        register() {
            axios.post('http://localhost:3008/register', this.registrationData)
                .then(response => {
                    // Handle the successful registration response
                    console.log(response.data);
                })
                .catch(error => {
                    // Handle the registration error
                    console.error(error);
                });
        },
    },
};
</script>
  
<style>/* No custom styles needed for this component */</style>
  