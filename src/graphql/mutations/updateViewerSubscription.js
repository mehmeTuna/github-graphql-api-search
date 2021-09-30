import gql from "graphql-tag";

const updateViewerSubscription = gql`
  mutation UpdateSubscription(
    $subscribableId: ID!
    $state: SubscriptionState!
  ) {
    updateSubscription(
      input: { subscribableId: $subscribableId, state: $state }
    ) {
      subscribable {
        viewerSubscription
      }
    }
  }
`;

export default updateViewerSubscription;
