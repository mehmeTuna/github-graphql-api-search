<template>
  <router-view />
</template>
<script>
import { provideApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "@/ApolloClient";

export default {
  setup() {
    provideApolloClient(apolloClient);
  },
};
</script>
