import { expect } from "chai";
import mutations from "@/store/mutations";

describe("mutations", () => {
  it("update Repo Viewer Subscription", () => {
    // mock state
    const state = {
      searchRepo: {
        result: [
          {
            node: {
              id: 1,
              viewerSubscription: false,
            },
          },
        ],
      },
    };
    // apply mutation
    mutations.updateRepoViewerSubscription(state, {
      subscribableId: 1,
      state: true,
    });

    const item = state.searchRepo.result[0].node;
    // assert result
    expect(item.viewerSubscription).to.equal(true);
  });

  it("resetSearchRepoPaginate", () => {
    const state = {
      searchRepo: {
        paginate: {},
      },
    };

    mutations.resetSearchRepoPaginate(state);

    expect(state.searchRepo.paginate.hasNextPage).to.equal(false);
    expect(state.searchRepo.paginate.endCursor).to.equal("");
  });

  it("updateSearchRepoLoading", () => {
    const state = {
      searchRepo: {
        loading: false,
      },
    };

    mutations.updateSearchRepoLoading(state, true);

    expect(state.searchRepo.loading).to.equal(true);
  });

  it("updateSearchRepoList", () => {
    const state = {
      searchRepo: {
        result: [],
      },
    };

    mutations.updateSearchRepoList(state, [{ id: 1 }]);

    expect(state.searchRepo.result.length).to.equal(1);
  });

  it("updateSearchRepoListMore", () => {
    const state = {
      searchRepo: {
        result: [
          {
            id: 1,
          },
        ],
      },
    };

    mutations.updateSearchRepoListMore(state, [{ id: 2 }]);

    expect(state.searchRepo.result.length).to.equal(2);
  });

  it("updateSearchRepoPaginate", () => {
    const state = {
      searchRepo: {
        paginate: {
          hasNextPage: false,
        },
      },
    };

    mutations.updateSearchRepoPaginate(state, {
      hasNextPage: true,
    });

    expect(state.searchRepo.paginate.hasNextPage).to.equal(true);
  });

  it("updateRepoViewerHasStarred", () => {
    const state = {
      searchRepo: {
        result: [
          {
            node: {
              id: 1,
              viewerHasStarred: false,
            },
          },
        ],
      },
    };

    mutations.updateRepoViewerHasStarred(state, { repoId: 1, status: true });

    expect(state.searchRepo.result[0].node.viewerHasStarred).to.equal(true);
  });
});
