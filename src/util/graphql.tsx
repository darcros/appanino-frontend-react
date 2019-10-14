import { ApolloError } from 'apollo-client';
import i18n from '../i18n';

/**
 * An helper that returns an error message based on the error code.
 * If the error does not have an error code the a generic message will be returned.
 * Also returns default messages for network errors.
 *
 * @param err The Apollo Error
 */
export const errorToMessage = (err: ApolloError | null | undefined): string | undefined => {
  if (!err) return;
  const { networkError, graphQLErrors } = err;

  if (networkError) {
    return i18n.t('error.connection');
  }

  const messages: { [key: string]: string } = i18n.t('error.graphql', { returnObjects: true });
  for (const graphQLError of graphQLErrors) {
    if (graphQLError.extensions && graphQLError.extensions.code) {
      const message = messages[graphQLError.extensions.code];
      if (message) return message;
    }
  }

  return i18n.t('error.generic');
};
