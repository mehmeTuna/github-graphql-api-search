import { flushPromises, mount } from "@vue/test-utils";

import RepositorySearch from "@/views/RepositorySearch";

const search = jest.fn();
const $store = {
  state: {
    count: 25,
  },
  actions: jest.fn(),
  getters: {
    repoSearchList: jest.fn(),
    repoSearchLoading: jest.fn(),
    repoSearchPagination: jest.fn(),
  },
  commit: jest.fn(),
};

describe("Repository Search View", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(RepositorySearch, {
      global: {
        provide: {
          store: $store,
        },
        mocks: {
          search,
        },
      },
    });
  });

  it("render component", () => {
    const result = wrapper.find("h3");

    expect(result.text()).toEqual("Github search public repos");
  });

  it("repository search input set data", async () => {
    const key = "vue";
    await wrapper.find("input").setValue(key);

    expect(wrapper.vm.searchText).toEqual(key);
  });

  it("search button click", async () => {
    wrapper.find("button").trigger("click");

    await flushPromises();

    expect(search).toHaveBeenCalled();
  });
});
