<script setup lang="ts">
import LoadingButton from "@/components/widget/LoadingButton.vue";
import TextFormComponent from "@/components/widget/form/TextFormComponent.vue";
import type {ProfileInfo} from "@/stores/profile";

const props = defineProps<{
  info: ProfileInfo,
  isLoading: boolean,
  errors: Record<string, string>
}>();

const emit = defineEmits(['submit:data']);

function submit() {
  emit("submit:data", props.info);
}

</script>

<template>
  <div class="flex flex-col px-8 py-10 w-full p-4">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-200">
      Change Account Details
    </h2>

    <form class="mt-8 space-y-2" @submit.prevent="submit">
      <div class="space-y-6">
        <div class="flex flex-row justify-center space-x-8">
          <TextFormComponent id="firstName" v-model="props.info.firstname" label="First Name" type="text"
                             :required="false" autocomplete="first-name" placeholder="First Name" class="w-full"/>

          <TextFormComponent id="lastName" v-model="props.info.surname" label="Last Name" type="text" :required="false"
                             autocomplete="last-name" placeholder="Last Name" class="w-full"/>
        </div>

        <TextFormComponent id="linkedinLink" v-model="props.info.linkedInProfile" label="LinkedIn Profile"
                           :required="false" type="url" placeholder="Link to your LinkedIn Profile"/>
        <TextFormComponent id="githubLink" v-model="props.info.gitHubProfile" label="GitHub Profile" :required="false"
                           type="url" placeholder="Link to your GitHub Profile"/>
        <TextFormComponent id="portfolioLink" v-model="props.info.portfolioSite" label="Portfolio Site"
                           :required="false"
                           type="url" placeholder="Link to your Portfolio Site"/>
      </div>

      <LoadingButton class="mt-8" :isSpinning="props.isLoading" text="Update"/>
    </form>
  </div>
</template>

<style scoped>

</style>