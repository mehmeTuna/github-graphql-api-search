import { createStore } from "vuex";
import { apolloClient } from "@/ApolloClient";

import { searchRepository } from "@/graphql/queries";
import {
  removeStarFromRepository,
  starTheRepository,
  updateViewerSubscription,
} from "@/graphql/mutations";

const SEARCH_RESULT_COUNT = 10;

export default createStore({
  state: {
    searchRepo: {
      result: [],
      loading: null,
      error: null,
      paginate: {
        hasNextPage: false,
        endCursor: "",
      },
    },
  },
  actions: {
    async fetchSearchRepo({ commit }, queryText) {
      commit("updateSearchRepoLoading", true);
      commit("resetSearchRepoPaginate");

      try {
        const result = await apolloClient.query({
          query: searchRepository,
          variables: {
            query: queryText,
            first: SEARCH_RESULT_COUNT,
          },
        });
        commit("updateSearchRepoList", result.data.search.edges);
        commit("updateSearchRepoPaginate", result.data.search.pageInfo);
      } finally {
        commit("updateSearchRepoLoading", false);
      }
    },
    async fetchSearchRepoLoadMore({ state, commit }, queryText) {
      commit("updateSearchRepoLoading", true);

      const { paginate } = state.searchRepo;

      try {
        const result = await apolloClient.query({
          query: searchRepository,
          variables: {
            query: queryText,
            first: SEARCH_RESULT_COUNT,
            after: paginate.endCursor,
          },
        });
        commit("updateSearchRepoListMore", result.data.search.edges);
        commit("updateSearchRepoPaginate", result.data.search.pageInfo);
      } finally {
        commit("updateSearchRepoLoading", false);
      }
    },
    async fetchStarRepo({ commit }, starrableId) {
      const result = await apolloClient.mutate({
        mutation: starTheRepository,
        variables: {
          starrableId,
        },
      });

      commit("updateRepoViewerHasStarred", {
        repoId: starrableId,
        status: true,
      });
      return result;
    },
    async fetchRemoveStarRepo({ commit }, starrableId) {
      const result = await apolloClient.mutate({
        mutation: removeStarFromRepository,
        variables: {
          starrableId,
        },
      });
      commit("updateRepoViewerHasStarred", {
        repoId: starrableId,
        status: false,
      });
      return result;
    },
    async fetchUpdateViewerSubscription({ commit }, { subscribableId, state }) {
      const result = await apolloClient.mutate({
        mutation: updateViewerSubscription,
        variables: {
          subscribableId,
          state,
        },
      });

      commit("updateRepoViewerSubscription", { subscribableId, state });

      return result;
    },
  },
  mutations: {
    updateRepoViewerSubscription(state, payload) {
      console.log("payload", payload);
      state.searchRepo.result.find(
        (repo) => repo.node.id === payload.subscribableId
      ).node.viewerSubscription = payload.state;
    },
    resetSearchRepoPaginate(state) {
      state.searchRepo.paginate = Object.assign(
        {},
        {
          hasNextPage: false,
          endCursor: "",
        }
      );
    },
    updateSearchRepoLoading(state, payload) {
      state.searchRepo.loading = payload;
    },
    updateSearchRepoList(state, payload) {
      state.searchRepo.result = JSON.parse(JSON.stringify(payload));
    },
    updateSearchRepoListMore(state, payload) {
      state.searchRepo.result = [...state.searchRepo.result, ...payload];
    },
    updateSearchRepoPaginate(state, payload) {
      state.searchRepo.paginate = Object.assign({}, payload);
    },
    updateRepoViewerHasStarred(state, { repoId, status }) {
      state.searchRepo.result.find(
        (repo) => repo.node.id == repoId
      ).node.viewerHasStarred = status;
    },
  },
  getters: {
    searchRepoList(state) {
      return state.searchRepo.result;
    },
    searchRepoLoading(state) {
      return state.searchRepo.loading;
    },
    searchRepoPaginate(state) {
      return state.searchRepo.paginate;
    },
  },
  modules: {},
});
