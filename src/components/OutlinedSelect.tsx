import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select, { SelectProps } from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';

interface OutlinedSelectProps extends Omit<SelectProps, 'native' | 'input'> {
  label: string;
  inputName: string;
}

export const OutlinedSelect: React.FC<OutlinedSelectProps> = ({ label, inputName, children, ...rest }) => {
  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, [label]);

  return (
    <FormControl variant="outlined">
      <InputLabel ref={inputLabel} htmlFor={`${inputName}-select`}>
        {label}
      </InputLabel>
      <Select
        native
        input={<OutlinedInput name={inputName} labelWidth={labelWidth} id={`${inputName}-select`} />}
        {...rest}
      >
        {children}
      </Select>
    </FormControl>
  );
};
