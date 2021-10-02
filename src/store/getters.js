export default {
  repoSearchList(state) {
    return state.searchRepo.result;
  },
  repoSearchLoading(state) {
    return state.searchRepo.loading;
  },
  repoSearchPagination(state) {
    return state.searchRepo.paginate;
  },
};
