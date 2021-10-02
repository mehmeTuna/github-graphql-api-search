import gql from "graphql-tag";

const searchRepository = gql`
  query Search($query: String!, $first: Int!, $after: String) {
    search(type: REPOSITORY, query: $query, first: $first, after: $after) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            id
            name
            description
            url
            stargazerCount
            resourcePath
            pushedAt
            primaryLanguage {
              name
              color
            }
            watchers {
              totalCount
            }
            viewerHasStarred
            viewerSubscription
            licenseInfo {
              name
            }
            repositoryTopics(first: 10) {
              edges {
                node {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export default searchRepository;
