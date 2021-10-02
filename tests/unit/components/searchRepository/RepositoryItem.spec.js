import { flushPromises, mount } from "@vue/test-utils";

import RepositorySearch from "@/components/searchRepository/RepositoryItem";

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

let repo = {
  id: "MDEwOlJlcG9zaXRvcnkxMTczMDM0Mg==",
  name: "vue",
  description:
    "🖖 Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.",
  url: "https://github.com/vuejs/vue",
  stargazerCount: 188793,
  resourcePath: "/vuejs/vue",
  pushedAt: "2021-09-29T21:58:33Z",
  primaryLanguage: {
    name: "JavaScript",
    color: "#f1e05a",
    __typename: "Language",
  },
  watchers: {
    totalCount: 6220,
    __typename: "UserConnection",
  },
  viewerHasStarred: true,
  viewerSubscription: "UNSUBSCRIBED",
  licenseInfo: {
    name: "MIT License",
    __typename: "License",
  },
  repositoryTopics: {
    edges: [
      {
        node: {
          topic: {
            name: "vue",
            __typename: "Topic",
          },
          __typename: "RepositoryTopic",
        },
        __typename: "RepositoryTopicEdge",
      },
      {
        node: {
          topic: {
            name: "javascript",
            __typename: "Topic",
          },
          __typename: "RepositoryTopic",
        },
        __typename: "RepositoryTopicEdge",
      },
      {
        node: {
          topic: {
            name: "frontend",
            __typename: "Topic",
          },
          __typename: "RepositoryTopic",
        },
        __typename: "RepositoryTopicEdge",
      },
      {
        node: {
          topic: {
            name: "framework",
            __typename: "Topic",
          },
          __typename: "RepositoryTopic",
        },
        __typename: "RepositoryTopicEdge",
      },
    ],
    __typename: "RepositoryTopicConnection",
  },
  __typename: "Repository",
};

let updateViewerSubscription = jest.fn();
let starUpdate = jest.fn();

describe("RepositorySearch", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(RepositorySearch, {
      propsData: {
        repository: repo,
      },
      global: {
        provide: {
          store: $store,
        },
        mocks: {
          starUpdate,
          updateViewerSubscription,
        },
      },
    });
  });

  it("dom resource Path text", async () => {
    await flushPromises();
    const resourcePath = repo.resourcePath.slice(1, repo.resourcePath.length);
    expect(wrapper.find("a").text()).toEqual(resourcePath);
  });

  it("add star to repo", async () => {
    const btn = wrapper.find("#starRepo");

    btn.trigger("click");

    expect(starUpdate).toHaveBeenCalled();
  });

  it("watch repo", async () => {
    const watchOptions = wrapper.find("#watchRepo").findAll("option");

    await watchOptions.at(1).setSelected(); //UNSUBSCRIBED

    expect(updateViewerSubscription).toHaveBeenCalled();
  });
});
