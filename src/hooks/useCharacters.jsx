import { useQuery, gql } from "@apollo/client";

const GET_CHARACTERS = gql`
query Characters($status: String, $species: String, $page: Int) {
  characters(page: $page, filter: { status: $status, species: $species }) {
    info {
      count
      pages
      next
      prev
    }
    results {
      id
      name
      status
      species
      gender
      origin {
        name
      }
    }
  }
}

`;

export const useCharacters = ({ status, species, page, sortField, sortOrder }) => {
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { status, species, page, sortField, sortOrder },
  });

  return { loading, error, data };
};
