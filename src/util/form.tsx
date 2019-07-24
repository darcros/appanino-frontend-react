import { Error as ValidationError } from 'react-hook-form/dist/types';

/**
 * Helper to get the error message of a `react-hook-form` form validation error
 */
export const getErrorMessage = (err: string | ValidationError) => {
  if (typeof err == 'string') {
    return err;
  }

  return err.message;
};
