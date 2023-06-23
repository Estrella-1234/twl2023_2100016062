<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded shadow-lg">
            <template v-if="mode === 'login'">
                <LoginForm @switch-mode="switchMode" />
            </template>
            <template v-else-if="mode === 'registration'">
                <RegistrationForm @switch-mode="switchMode" />
            </template>
        </div>
    </div>
</template>

<script>
import LoginForm from '../components/loginForm.vue';
import RegistrationForm from '../components/registrationForm.vue';

export default {
    name: 'LoginAndRegistrationPage',
    components: {
        LoginForm,
        RegistrationForm,
    },
    data() {
        return {
            mode: 'login', // Initial mode is set to login
        };
    },
    methods: {
        switchMode(mode) {
            this.mode = mode;
        },
    },
};
</script>

<style>
/* No custom styles needed for this component */
</style>
