import ApolloClient from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';

const uri = 'http://localhost:4000/graphql'

const uploadLink = createUploadLink({
  uri,
  headers: {
    'Access-Control-Allow-Origin': '*',
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log('TCL: errorLink -> message', message);

      console.log(
        `[GraphQL error]: Message: ${JSON.stringify(message)}, Location: ${JSON.stringify(
          locations,
        )}, Path: ${path}`,
      );
    });

  if (networkError) {
    console.log('[Network error]:', networkError);
  }
});

const cache = new InMemoryCache()

export const client = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, uploadLink])
})
