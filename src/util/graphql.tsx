import { ApolloError } from 'apollo-client';

/**
 * A helper to return an error message based on the error code.
 * If the error does not have an error code the default message will be returned.
 * Also returns default messages for network errors.
 *
 * @param err The Apollo Error
 * @param messages An object that maps graphql error codes to messages
 * @param defaultMessage The default message to return if an appropriate message cannot be found in `messages`
 */
export const mapErrorToMessage = (
  err: ApolloError | null | undefined,
  messages: { [errorCode: string]: string },
  defaultMessage: string = 'An error occurred. Please retry later.',
): string | null => {
  if (!err) return null;
  const { networkError, graphQLErrors } = err;

  if (networkError) {
    return 'Connection error. Please retry later.';
  }

  for (const graphQLError of graphQLErrors) {
    if (graphQLError.extensions) {
      const message = messages[graphQLError.extensions.code];
      if (message) return message;
    }
  }

  return defaultMessage;
};
