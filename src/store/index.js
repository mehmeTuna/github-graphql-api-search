import { createStore } from "vuex";
import { apolloClient } from "@/ApolloClient";

import { searchRepository } from "@/graphql/queries";
import {
  removeStarFromRepository,
  starTheRepository,
} from "@/graphql/mutation";

const SEARCH_RESULT_COUNT = 10;

export default createStore({
  state: {
    searchRepository: {
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
    async fetchSearchRepository({ state, commit }, queryText) {
      commit("updateSearchRepositoryLoading", true);
      let variables = {
        query: queryText,
        first: SEARCH_RESULT_COUNT,
      };
      const { paginate } = state.searchRepository;

      if (paginate.endCursor !== "") {
        variables = Object.assign({}, variables, {
          after: paginate.endCursor,
        });
      }
      try {
        const result = await apolloClient.query({
          query: searchRepository,
          variables,
        });
        commit("updateSearchRepository", result.data.search.edges);
        commit("updateSearchRepositoryPaginate", result.data.search.pageInfo);
      } finally {
        commit("updateSearchRepositoryLoading", false);
      }
    },
    async fetchStarRepository(_, starrableId) {
      const result = await apolloClient.mutate({
        mutation: starTheRepository,
        variables: {
          starrableId,
        },
      });
      return result;
    },
    async fetchRemoveStarRepository(_, starrableId) {
      const result = await apolloClient.mutate({
        mutation: removeStarFromRepository,
        variables: {
          starrableId,
        },
      });
      return result;
    },
  },
  mutations: {
    resetSearchRepositoryPaginate(state) {
      state.searchRepository.paginate = Object.assign(
        {},
        {
          hasNextPage: false,
          endCursor: "",
        }
      );
    },
    updateSearchRepositoryLoading(state, payload) {
      state.searchRepository.loading = payload;
    },
    updateSearchRepository(state, payload) {
      if (state.searchRepository.paginate.endCursor !== "") {
        state.searchRepository.result = [
          ...state.searchRepository.result,
          ...payload,
        ];
        return;
      }
      state.searchRepository.result = payload;
    },
    updateSearchRepositoryPaginate(state, payload) {
      state.searchRepository.paginate = Object.assign({}, payload);
    },
  },
  getters: {
    searchRepositoryList(state) {
      return state.searchRepository.result;
    },
    searchRepositoryLoading(state) {
      return state.searchRepository.loading;
    },
    searchRepositoryPaginate(state) {
      return state.searchRepository.paginate;
    },
  },
  modules: {},
});
