import gql from "graphql-tag";

//id si verilen repoyu  yıldızlar
export const starTheRepository = gql`
  mutation AddStar($starrableId: String!) {
    addStar(input: { starrableId: $starrableId }) {
      starrable {
        ... on Repository {
          id
          name
        }
      }
    }
  }
`;

export default starTheRepository;
