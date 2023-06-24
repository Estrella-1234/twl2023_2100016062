<template>
    <div>
        <h2 class="text-2xl font-semibold text-center mb-6">Log In</h2>
        <form @submit.prevent="loginUser">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
                <input v-model="username"
                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username" type="text" placeholder="Enter your username" />
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                <input v-model="password"
                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password" type="password" placeholder="Enter your password" />
            </div>
            <div class="flex items-center justify-between">
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button" @click="switchToRegistration">
                    Sign Up
                </button>
                <button
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    Log In
                </button>
            </div>
        </form>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    name: 'LoginForm',
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        async loginUser() {
            try {
                const response = await axios.post('http://localhost:3008/login', {
                    username: this.username,
                    password: this.password,
                });

                // Handle the response based on your application's logic
                console.log(response.data); // Log the response or perform any other actions

                // Save the token to localStorage
                const token = response.data.token;
                localStorage.setItem('token', token);

                // Reset the form fields
                this.username = '';
                this.password = '';
            } catch (error) {
                // Handle the error
                console.error(error);
            }
        },
        switchToRegistration() {
            this.$emit('switch-mode', 'registration');
        },
        
    },
};

</script>
  
<style>
/* No custom styles needed for this component */
</style>
  