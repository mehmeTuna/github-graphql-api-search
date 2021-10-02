<template>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="
        flex
        items-end
        justify-center
        min-h-screen
        pt-4
        px-4
        pb-20
        text-center
        sm:block sm:p-0
      "
    >
      <div
        class="fixed inset-0 main bg-opacity-50 transition-opacity"
        aria-hidden="true"
      ></div>

      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >

      <div
        class="
          inline-block
          align-bottom
          bg-white
          rounded-lg
          text-left
          overflow-hidden
          shadow-xl
          transform
          transition-all
          sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
        "
      >
        <div class="bg-white px-4 pt-5 pb-4">
          <div class="mt-1 flex flex-col items-center justify-center">
            <div
              class="
                mx-auto
                flex-shrink-0 flex
                items-center
                justify-center
                h-12
                w-12
                rounded-full
                mb-2
              "
            >
              <img :src="require('@/assets/github.svg')" />
            </div>
            <h3
              class="text-lg leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              Register Github Personal Access Token
            </h3>
            <div class="mt-2 w-full px-8">
              <input
                type="text"
                class="
                  h-8
                  focus:ring-indigo-500 focus:border-indigo-500
                  block
                  w-full
                  pl-2
                  pr-2
                  border-gray-300
                  rounded-md
                "
                placeholder="access token"
                v-model="accessToken"
              />
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 flex flex-row-reverse">
          <button
            type="button"
            class="
              w-full
              inline-flex
              justify-center
              rounded-md
              border border-transparent
              shadow-sm
              px-4
              py-2
              bg-green-600
              text-base
              font-medium
              text-white
              hover:bg-green-700
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-green-500
              sm:ml-3 sm:w-auto sm:text-sm
            "
            @click="saveAccessToken"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const accessToken = ref("");

    const saveAccessToken = () => {
      if (accessToken.value.trim().length !== 0) {
        localStorage.setItem("accessToken", accessToken.value);
        window.location.href = "/";
      }
    };

    return {
      accessToken,
      saveAccessToken,
    };
  },
};
</script>

<style></style>
