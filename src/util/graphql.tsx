import { GraphQLError } from 'graphql';

// TODO: support network errors
/**
 * A helper to return an error message based on the error code.
 * If the error does not have an error code the default message will be returned.
 *
 * @param err The graphql error
 * @param messages A object that maps error codes to messages
 * @param defaultMessage The default message to return if an appropriate message cannot be found in `messages`
 */
export const mapErrorToMessage = (
  err: GraphQLError | null | undefined,
  messages: { [code: string]: string },
  defaultMessage: string = 'An error occurred. Please retry later.',
): string | null => {
  if (!err) return null;

  const { extensions } = err;
  if (!extensions) return defaultMessage;

  const message = messages[extensions.code];
  return message ? message : defaultMessage;
};
