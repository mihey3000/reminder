<script setup>
  import GuestLayout from "@/Layouts/GuestLayout.vue";
  import InputError from "@/Components/InputError.vue";
  import InputLabel from "@/Components/InputLabel.vue";
  import PrimaryButton from "@/Components/PrimaryButton.vue";
  import TextInput from "@/Components/TextInput.vue";
  import { Head, useForm } from "@inertiajs/vue3";

  const form = useForm({
    password: "",
  });

  const submit = () => {
    form.post(route("password.confirm"), {
      onFinish: () => form.reset(),
    });
  };
</script>

<template>
  <GuestLayout>
    <Head title="Confirm Password" />

    <div class="mb-4 text-sm text-gray-600">
      {{ translate("confirm_password.confirm_password_before_continuing") }}
    </div>

    <form @submit.prevent="submit">
      <div>
        <InputLabel
          for="password"
          :value="translate('confirm_password.password')"
        />
        <TextInput
          id="password"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password"
          required
          autocomplete="current-password"
          autofocus
        />
        <InputError class="mt-2" :message="form.errors.password" />
      </div>

      <div class="flex justify-end mt-4">
        <PrimaryButton
          class="ml-4"
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
        >
          {{ translate("confirm_password.confirm") }}
        </PrimaryButton>
      </div>
    </form>
  </GuestLayout>
</template>
