import { gql } from 'apollo-angular';

export const GET_ALL_REDIS_DETAILS = `
query {
  getAllRedisKeys {
    key
    value
  }
}

`;




export const DELETE_REDIS_KEY = gql`
  mutation DeleteRedisKey($key: String!) {
    deleteRedisKey(key: $key)
  }
`;

