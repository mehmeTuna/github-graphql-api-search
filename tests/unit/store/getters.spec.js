import { expect } from "chai";
import getters from "@/store/getters";

describe("getters", () => {
  it("repoSearchList", () => {
    const state = {
      searchRepo: {
        result: [
          {
            id: 1,
          },
        ],
      },
    };

    const result = getters.repoSearchList(state);

    expect(result).to.equal(state.searchRepo.result);
  });
  it("repoSearchLoading", () => {
    const state = {
      searchRepo: {
        loading: true,
      },
    };

    const result = getters.repoSearchLoading(state);

    expect(result).to.equal(state.searchRepo.loading);
  });
  it("repoSearchPagination", () => {
    const state = {
      searchRepo: {
        paginate: {
          hasNextPage: false,
          nextCursor: "",
        },
      },
    };

    const result = getters.repoSearchPagination(state);

    expect(result).to.equal(state.searchRepo.paginate);
  });
});
