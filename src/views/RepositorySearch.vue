<template>
  <div class="container mx-auto">
    <div class="max-content py-4">
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
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-2">
          Github search public repos
        </h3>
      </div>
    </div>
    <div
      class="
        max-content
        bg-white
        flex
        items-center
        rounded-full
        shadow-xl
        sticky
        top-2
      "
    >
      <input
        class="
          rounded-l-full
          w-full
          py-1
          px-2
          text-gray-700
          leading-tight
          focus:outline-none
        "
        v-model="searchText"
        id="search"
        type="text"
        placeholder="Search"
        @keypress.enter="search"
      />
      <div class="p-1">
        <button
          class="
            bg-blue-500
            text-white
            rounded-full
            p-2
            hover:bg-blue-400
            focus:outline-none
            w-10
            h-10
            flex
            items-center
            justify-center
          "
          @click="search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
            <path
              fill="currentColor"
              d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="max-content overflow-y-auto" id="listedItemBody">
      <repository-item
        v-for="repository in repositoryList"
        :key="repository.node.id"
        :repository="repository.node"
      />
      <div class="w-full h-2" v-if="loadMoreVisible" id="loadMoreRef"></div>
      <div v-if="loading" class="flex justify-center">
        <img class="w-24 h-24" :src="require('@/assets/loading.svg')" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch, nextTick } from "vue";
import { useStore } from "vuex";

import RepositoryItem from "@/components/searchRepository/RepositoryItem";

export default {
  name: "RepositorySearch",
  components: { RepositoryItem },
  setup() {
    const searchText = ref("");
    const loadMoreVisible = ref(false);
    const store = useStore();

    const repositoryList = computed({
      get: () => store.getters.repoSearchList,
    });

    const loading = computed({
      get: () => store.getters.repoSearchLoading,
    });

    const paginate = computed({
      get: () => store.getters.repoSearchPagination,
    });

    const search = () => {
      if (searchText.value.trim().length === 0) {
        return;
      }

      store.dispatch("fetchSearchRepo", searchText.value);

      nextTick(() => window.scroll(0, 0));
    };

    const loadMoreRepo = () => {
      store.dispatch("fetchSearchRepoLoadMore", searchText.value);
    };

    watch(loadMoreVisible, (val) => {
      if (!val) {
        return;
      }
      //dom update waiting
      nextTick(() => {
        const observer = new IntersectionObserver((entries) => {
          const firstEntry = entries[0];
          if (firstEntry.isIntersecting) {
            loadMoreRepo();
          }
        });

        observer.observe(document.getElementById("loadMoreRef"));
      });
    });

    //load more component visible status update
    watch(repositoryList, function (val) {
      if (val.length === 0) {
        loadMoreVisible.value = false;
        return;
      }
      nextTick(() => {
        const body = document.getElementById("listedItemBody");
        const itemHeight = body.children[0].clientHeight;
        const itemsLength = body.childNodes.length;
        //appears on the screen, but if there is more downloadable data, show it anyway
        if (
          document.body.clientHeight < itemHeight * itemsLength ||
          paginate.value.hasNextPage
        ) {
          loadMoreVisible.value = true;
        }
      });
    });

    return {
      searchText,
      search,
      repositoryList,
      loading,
      loadMoreVisible,
    };
  },
};
</script>
