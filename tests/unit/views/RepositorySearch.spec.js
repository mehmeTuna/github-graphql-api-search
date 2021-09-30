import { flushPromises, mount } from "@vue/test-utils";
import { createStore } from "vuex";

import RepositorySearch from "@/views/RepositorySearch";

const search = jest.fn();
const store = createStore({
  state: {},
  actions: {},
  mutations: {
    fetchSearchRepo: jest.fn(),
  },
  getters: {
    searchRepoList: jest.fn(),
    searchRepoLoading: jest.fn(),
    searchRepoPaginate: jest.fn(),
  },
  modules: {},
});

describe("Repository Search View", () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = mount(RepositorySearch, {
      global: {
        plugins: [[store]],
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
