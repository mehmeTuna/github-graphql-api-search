import { expect } from "chai";
import getters from "@/store/getters";

describe("getters", () => {
  it("searchRepoList", () => {
    const state = {
      searchRepo: {
        result: [
          {
            id: 1,
          },
        ],
      },
    };

    const result = getters.searchRepoList(state);

    expect(result).to.equal(state.searchRepo.result);
  });
  it("searchRepoLoading", () => {
    const state = {
      searchRepo: {
        loading: true,
      },
    };

    const result = getters.searchRepoLoading(state);

    expect(result).to.equal(state.searchRepo.loading);
  });
  it("searchRepoPaginate", () => {
    const state = {
      searchRepo: {
        paginate: {
          hasNextPage: false,
          nextCursor: "",
        },
      },
    };

    const result = getters.searchRepoPaginate(state);

    expect(result).to.equal(state.searchRepo.paginate);
  });
});
