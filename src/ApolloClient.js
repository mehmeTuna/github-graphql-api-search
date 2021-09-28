import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: process.env.VUE_APP_GITHUB_GRAPHQL_API,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: `bearer ${process.env.VUE_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
    },
  }));

  return forward(operation);
});

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

// Create a provider
export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});
