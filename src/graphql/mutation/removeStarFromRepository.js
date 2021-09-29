import gql from "graphql-tag";

const removeStarFromRepository = gql`
  mutation RemoveStar($starrableId: String!) {
    removeStar(input: { starrableId: $starrableId }) {
      starrable {
        ... on Repository {
          id
          name
        }
      }
    }
  }
`;

export default removeStarFromRepository;
