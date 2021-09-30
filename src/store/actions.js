import { apolloClient } from "@/ApolloClient";
import { searchRepository } from "@/graphql/queries";
import {
  removeStarFromRepository,
  starTheRepository,
  updateViewerSubscription,
} from "@/graphql/mutations";

const SEARCH_RESULT_COUNT = 10;

export default {
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
};
