<template>
    <div>
        <h1>Registration</h1>
        <form @submit.prevent="submit">
            <label>
                Name:
                <input type="text" v-model="name" required>
            </label>
            <br>
            <label>
                Email:
                <input type="email" v-model="email" required>
            </label>
            <br>
            <label>
                Password:
                <input type="password" v-model="password" required>
            </label>
            <br>
            <button type="submit">Register</button>
        </form>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            password: ''
        };
    },
    methods: {
        submit() {
            // You can handle the form submission here
            console.log('Name:', this.name);
            console.log('Email:', this.email);
            console.log('Password:', this.password);
        }
    }
};
</script>
  