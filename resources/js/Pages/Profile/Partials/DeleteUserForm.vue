<script setup>
  import DangerButton from "@/Components/DangerButton.vue";
  import InputError from "@/Components/InputError.vue";
  import InputLabel from "@/Components/InputLabel.vue";
  import Modal from "@/Components/Modal.vue";
  import SecondaryButton from "@/Components/SecondaryButton.vue";
  import TextInput from "@/Components/TextInput.vue";
  import { useForm } from "@inertiajs/vue3";
  import { nextTick, ref } from "vue";

  const confirmingUserDeletion = ref(false);
  const passwordInput = ref(null);

  const form = useForm({
    password: "",
  });

  const confirmUserDeletion = () => {
    confirmingUserDeletion.value = true;

    nextTick(() => passwordInput.value.focus());
  };

  const deleteUser = () => {
    form.delete(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.value.focus(),
      onFinish: () => form.reset(),
    });
  };

  const closeModal = () => {
    confirmingUserDeletion.value = false;

    form.reset();
  };
</script>

<template>
  <section class="space-y-6">
    <header>
      <h2 class="text-lg font-medium text-gray-900">
        {{ translate("profile.delete_account") }}
      </h2>

      <p class="mt-1 text-sm text-gray-600">
        {{ translate("profile.before_deleting_your_account") }}
      </p>
    </header>

    <DangerButton @click="confirmUserDeletion">
      {{ translate("profile.delete_account") }}
    </DangerButton>

    <Modal :show="confirmingUserDeletion" @close="closeModal">
      <div class="p-6">
        <h2 class="text-lg font-medium text-gray-900">
          Are you sure you want to delete your account?
          {{ "profile.you_want_to_delete_account" }}
        </h2>

        <p class="mt-1 text-sm text-gray-600">
          {{
            translate(
              "profile.enter_your_password_before_deleting_your_account"
            )
          }}
        </p>

        <div class="mt-6">
          <InputLabel
            for="password"
            :value="translate('profile.password')"
            class="sr-only"
          />

          <TextInput
            id="password"
            ref="passwordInput"
            v-model="form.password"
            type="password"
            class="mt-1 block w-3/4"
            :placeholder="translate('profile.password')"
            @keyup.enter="deleteUser"
          />

          <InputError :message="form.errors.password" class="mt-2" />
        </div>

        <div class="mt-6 flex justify-end">
          <SecondaryButton @click="closeModal">
            {{ translate("profile.cancel") }}
          </SecondaryButton>

          <DangerButton
            class="ml-3"
            :class="{ 'opacity-25': form.processing }"
            :disabled="form.processing"
            @click="deleteUser"
          >
            {{ translate("profile.delete_account") }}
          </DangerButton>
        </div>
      </div>
    </Modal>
  </section>
</template>
