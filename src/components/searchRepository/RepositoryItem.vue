<template>
  <div class="flex justify-start items-start py-3 px-2 repo-border">
    <div class="pt-1">
      <img class="w-4 h-4 mr-2" :src="require('@/assets/book.svg')" />
    </div>
    <div class="flex-grow">
      <div class="header flex flex-direction justify-between items-start">
        <div>
          <a :href="repo.url" class="text-blue-500 hover:underline">{{
            repo.resourcePath
          }}</a>
        </div>
        <div class="flex flex-direction justify-center items-start">
          <div
            id="starRepo"
            class="
              flex
              justify-center
              items-center
              mr-3
              border border-gray-300
              rounded
              cursor-pointer
              p-1
            "
            @click="starUpdate"
          >
            <span class="w-4 h-4 mr-1">
              <img
                :src="
                  repo.viewerHasStarred
                    ? require('@/assets/active-star.svg')
                    : require('@/assets/passive-star.svg')
                "
              />
            </span>
            <p class="text-md">
              {{ repo.viewerHasStarred ? "Unstar" : "Star" }}
            </p>
          </div>
          <div
            class="
              flex
              justify-center
              items-center
              border border-gray-300
              rounded
              cursor-pointer
              p-1
            "
          >
            <span class="w-4 h-4 mr-1">
              <img
                :src="
                  repo.viewerSubscription === 'SUBSCRIBED'
                    ? require('@/assets/active-watch.svg')
                    : require('@/assets/passive-watch.svg')
                "
              />
            </span>
            <p class="text-md">
              <select
                id="watchRepo"
                class="appearance-none bg-transparent"
                @change="updateViewerSubscription"
              >
                <option value="UNSUBSCRIBED">UNSUBSCRIBED</option>
                <option value="SUBSCRIBED">SUBSCRIBED</option>
                <option value="IGNORED">IGNORED</option>
              </select>
            </p>
          </div>
        </div>
      </div>
      <div class="body">
        <p class="repo-content text-sm mb-1">
          {{ repo.description }}
        </p>
        <div class="mb-1 flex flex-wrap">
          <span
            class="
              bg-blue-200
              text-blue-600
              rounded-xl
              text-sm
              px-2
              py-1
              mb-1
              mr-1
            "
            v-for="(text, index) in repo.repositoryTopics"
            :key="index"
          >
            {{ text }}
          </span>
        </div>
        <div class="repo-detail flex justify-start items-center">
          <span class="flex justify-center items-center mr-3">
            <div class="w-4 h-4 mr-1">
              <img :src="require('@/assets/active-star.svg')" />
            </div>
            <p class="text-sm">{{ repo.stargazerCount }}</p>
          </span>
          <span class="flex justify-center items-center mr-3">
            <div class="w-4 h-4 mr-1">
              <img :src="require('@/assets/active-watch.svg')" />
            </div>
            <p class="text-sm">{{ repo.watchersCount }}</p>
          </span>
          <span
            v-if="repo.primaryLanguageColor"
            class="mr-3 flex justify-start items-center"
          >
            <div
              v-if="repo.primaryLanguageName"
              class="w-3.5 h-3.5 rounded-full mr-1"
              :style="`background-color: ${repo.primaryLanguageColor}`"
            ></div>
            <p class="text-sm">
              {{ repo.primaryLanguageName }}
            </p>
          </span>
          <span class="mr-3 text-sm" v-if="repo.licenseInfoName">
            {{ repo.licenseInfoName }}
          </span>
          <span class="mr-3 text-sm">{{ repo.pushedAt }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from "vue";
import { useStore } from "vuex";

export default {
  name: "repositoryItem",
  emits: ["search"],
  props: {
    repository: {
      required: true,
      type: Object,
    },
  },
  setup(props) {
    const store = useStore();
    const repo = reactive({});

    const { repository } = toRefs(props);

    const setProps = (repository) => {
      repo.id = repository.id;
      repo.name = repository.name;
      repo.description = repository.description;
      repo.url = repository.url;
      repo.stargazerCount = repository.stargazerCount;
      repo.resourcePath = repository.resourcePath.slice(
        1,
        repository.resourcePath.length
      );
      repo.pushedAt = repository.pushedAt;
      repo.primaryLanguageName = repository.primaryLanguage?.name || null;
      repo.primaryLanguageColor = repository.primaryLanguage?.color || null;
      repo.watchersCount = repository.watchers.totalCount;
      repo.viewerHasStarred = repository.viewerHasStarred;
      repo.viewerSubscription = repository.viewerSubscription;
      repo.licenseInfoName = repository.licenseInfo?.name || null;
      repo.repositoryTopics = repository.repositoryTopics.edges.map((i) => {
        return i.node.topic.name;
      });
    };

    setProps(repository.value);

    watch(
      repository,
      (val) => {
        setProps(val);
      },
      { deep: true }
    );

    const starUpdate = () => {
      const id = repo.id;
      if (repo.viewerHasStarred) {
        store.dispatch("fetchRemoveStarRepo", id);
        return;
      }
      store.dispatch("fetchStarRepo", id);
    };

    const updateViewerSubscription = (e) => {
      const id = repo.id;
      const state = e.target.value;
      store.dispatch("fetchUpdateViewerSubscription", {
        subscribableId: id,
        state: state,
      });
    };

    return {
      starUpdate,
      updateViewerSubscription,
      repo,
    };
  },
};
</script>
