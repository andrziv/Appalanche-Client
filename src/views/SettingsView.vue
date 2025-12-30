<script setup lang="ts">
import FormComponent from "@/components/widget/FormComponent.vue";
import LoadingButton from "@/components/widget/LoadingButton.vue";
import {reactive, ref} from "vue";
import {useProfileStore} from "@/stores/profile";

const profileStore = useProfileStore();

const form = reactive({
  firstname: profileStore.profile?.firstname ?? "",
  surname: profileStore.profile?.surname ?? "",
  linkedinProfile: profileStore.profile?.linkedInProfile ?? "",
  githubProfile: profileStore.profile?.gitHubProfile ?? "",
  portfolioSite: profileStore.profile?.portfolioSite ?? ""
});

const errors = ref<Record<string, string>>({});

const handleProfileUpdate = async () => {
  errors.value = {};
  const success = await profileStore.modify(form.firstname, form.surname, form.linkedinProfile, form.githubProfile, form.portfolioSite);

  if (success) {

  } else {
    if (profileStore.error) {
      errors.value = profileStore.error;
    }
  }
}
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="py-10 bg-gray-100 dark:bg-neutral-800 border-b border-gray-300 dark:border-zinc-800"/>
    <div class="-mt-16 min-h-full w-full max-w-7xl overflow-y-auto mx-auto bg-white dark:bg-zinc-950 rounded-t-sm">
      <div class="flex flex-col px-8 py-10 w-full p-4">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-200">
          Change Account Details
        </h2>

        <form class="mt-8 space-y-2" @submit.prevent="handleProfileUpdate">
          <div class="space-y-6">
            <div class="flex flex-row justify-center space-x-8">
              <FormComponent id="firstName" v-model="form.firstname" label="First Name" type="text" :required="false"
                             autocomplete="first-name" placeholder="First Name" class="w-full"/>

              <FormComponent id="lastName" v-model="form.surname" label="Last Name" type="text" :required="false"
                             autocomplete="last-name" placeholder="Last Name" class="w-full"/>
            </div>

            <FormComponent id="linkedinLink" v-model="form.linkedinProfile" label="LinkedIn Profile" :required="false"
                           type="url" placeholder="Link to your LinkedIn Profile"/>
            <FormComponent id="githubLink" v-model="form.githubProfile" label="GitHub Profile" :required="false"
                           type="url" placeholder="Link to your GitHub Profile"/>
            <FormComponent id="portfolioLink" v-model="form.portfolioSite" label="Portfolio Site" :required="false"
                           type="url" placeholder="Link to your Portfolio Site"/>
          </div>

          <LoadingButton class="mt-8" :isSpinning="profileStore.isLoading" text="Update"/>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>