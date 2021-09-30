export default {
  updateRepoViewerSubscription(state, payload) {
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
};
