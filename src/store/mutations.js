export default {
  updateRepoViewerSubscription(state, payload) {
    const repo = state.searchRepo.result.find(
      (repo) => repo.node.id === payload.subscribableId
    );

    if (repo) {
      Object.assign(repo.node, { viewerSubscription: payload.state });
    }
  },
  resetSearchRepoPaginate(state) {
    Object.assign(state.searchRepo.paginate, {
      hasNextPage: false,
      endCursor: "",
    });
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
    Object.assign(state.searchRepo.paginate, payload);
  },
  updateRepoViewerHasStarred(state, { repoId, status }) {
    const repo = state.searchRepo.result.find((repo) => repo.node.id == repoId);

    if (repo) {
      Object.assign(repo.node, { viewerHasStarred: status });
    }
  },
};
