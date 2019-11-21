import React from 'react';
import { useFormikContext } from 'formik';
import { LoadingButton, LoadingButtonProps } from './LoadingButton';

export const FormLoadingButton: React.FC<LoadingButtonProps> = ({ loading, disabled, ...props }) => {
  const { isSubmitting, isValid } = useFormikContext();

  return <LoadingButton disabled={disabled || !isValid} loading={loading || isSubmitting} {...props} />;
};
