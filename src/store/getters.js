export default {
  searchRepoList(state) {
    return state.searchRepo.result;
  },
  searchRepoLoading(state) {
    return state.searchRepo.loading;
  },
  searchRepoPaginate(state) {
    return state.searchRepo.paginate;
  },
};
