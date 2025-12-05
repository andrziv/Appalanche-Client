<script setup lang="ts">
import {reactive, ref} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/authentication';
import LoadingButton from "@/components/widget/LoadingButton.vue";
import FormComponent from "@/components/widget/FormComponent.vue";

const router = useRouter();
const auth = useAuthStore();

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
});

const errors = ref<Record<string, string>>({});

const handleSignup = async () => {
  errors.value = {};
  const success = await auth.signup(form.firstName, form.lastName, form.email, form.password);

  if (success) {
    await router.push('/');
  } else {
    if (auth.error) {
      errors.value = auth.error;
    }
  }
}
</script>

<template>
  <div class="flex min-h-screen flex-col justify-start bg-gray-50 dark:bg-neutral-950">
    <div class="py-8 px-4 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="py-8 text-xl font-semibold text-gray-900 dark:text-gray-200">
        Sign Up
      </h2>

      <form class="space-y-2" @submit.prevent="handleSignup">
        <div class="space-y-6">
          <div class="flex flex-wrap items-center justify-between">
            <FormComponent id="firstName" v-model="form.firstName" label="First Name" type="text"
                           autocomplete="first-name" placeholder="First Name"/>

            <FormComponent id="lastName" v-model="form.lastName" label="Last Name" type="text"
                           autocomplete="last-name" placeholder="Last Name"/>
          </div>

          <FormComponent id="email" v-model="form.email" label="Email Address" :error="errors.message" type="email"
                         autocomplete="email" placeholder="Email Address"/>

          <FormComponent id="password" v-model="form.password" label="Password" :error="errors.password" type="password"
                         autocomplete="current-password" placeholder="Password"/>
        </div>

        <LoadingButton class="mt-8" :isSpinning="auth.isLoading" text="Sign Up"/>

        <p class="text-center text-sm text-gray-600 dark:text-gray-400">
          Have an account already?
          <RouterLink to="/signup"
                      class="font-semibold text-blue-600 dark:text-blue-900 hover:text-blue-700 hover:underline">
            Sign in Here
          </RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>