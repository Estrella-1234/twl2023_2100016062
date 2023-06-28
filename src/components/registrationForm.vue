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
                    id="email" type="text" placeholder="Enter your email">
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
import { useToast } from "primevue/usetoast";

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

    setup() {
        const toast = useToast();
        const success = (Message) => {
            toast.add({ severity: 'success', summary: 'Success Message', detail: Message, life: 5000 });
        };
        const failed = (Message) => {
            toast.add({ severity: 'error', summary: 'Login Failed', detail: Message, life: 5000 });
        };

        return {
            success,
            failed
        };
    },

    methods: {
        switchToLogin() {
            this.$emit('switch-mode', 'login');
        },
        register() {
            // Write if statement to check if the registration data is valid
            // If the data is invalid, show a toast message and return early
            if (this.registrationData.fullname == '' || this.registrationData.email == '' || this.registrationData.username == '' || this.registrationData.password == '') {
                this.failed('Mohon isi semua data');
                return;
            }
            if (!this.registrationData.email.includes('@') || !this.registrationData.email.includes('.')) {
                this.failed('Email tidak valid');
                return;
            }
            if (this.registrationData.password.length < 8) {
                this.failed('Password harus lebih dari 8 karakter');
                return;
            }
            // if (!this.registrationData.password.match(/[0-9]/g)) {
            //     this.failed('Password harus mengandung angka');
            //     return;
            // }
            // if (!this.registrationData.password.match(/[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]/g)) {
            //     this.failed('Password harus mengandung simbol');
            //     return;
            // }




            axios.post('http://localhost:3008/register', this.registrationData)
                .then(response => {
                    // Handle the successful registration response
                    this.success(response.data.message);
                })
                .catch(error => {
                    // Handle the registration error
                    this.failed(error.response.data.message);
                });
        },
    },
};
</script>
  
<style>
/* No custom styles needed for this component */
</style>
  