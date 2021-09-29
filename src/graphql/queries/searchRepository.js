import gql from "graphql-tag";

//repoları arar
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
