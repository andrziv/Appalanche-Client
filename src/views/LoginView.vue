<script setup lang="ts">
import {reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/stores/authentication'
import LoadingButton from "@/components/widget/LoadingButton.vue";
import IconExclamation from "@/components/icons/IconExclamation.vue";
import FormComponent from "@/components/widget/FormComponent.vue";

const router = useRouter()
const auth = useAuthStore()

const form = reactive({
  email: '',
  password: ''
});

const errors = ref<Record<string, string>>({});

const handleLogin = async () => {
  errors.value = {};
  const success = await auth.login(form.email, form.password);

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
        Sign In
      </h2>

      <form class="space-y-2" @submit.prevent="handleLogin">
        <div class="space-y-6">
          <FormComponent id="email" v-model="form.email" label="Email Address" type="email" :error="errors.message"
                         :muteErrorMessage="true" autocomplete="email" placeholder="Email Address"/>

          <FormComponent id="password" v-model="form.password" label="Password" type="password" :error="errors.message"
                         :muteErrorMessage="true" autocomplete="current-password" placeholder="Password"/>
        </div>

        <div v-if="errors.message" class="flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
          <IconExclamation class="w-4 h-auto fill-red-600 dark:fill-red-400 shrink-0"/>
          <span>{{ errors.message }}</span>
        </div>

        <LoadingButton class="mt-8" :isSpinning="auth.isLoading" text="Sign In"/>

        <p class="text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?
          <RouterLink to="/signup"
                      class="font-semibold text-blue-600 dark:text-blue-900 hover:text-blue-700 hover:underline">
            Sign up now
          </RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>