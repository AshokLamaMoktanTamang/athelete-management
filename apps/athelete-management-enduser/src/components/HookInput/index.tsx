import { ReactNode, forwardRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, FormGroup, FormControlProps } from 'react-bootstrap';

import { HookErrorMessage, HookInputBaseProps } from '@/components';
import style from './style.module.scss';

export interface InputBaseProps extends FormControlProps {
  name?: string;
  maxLength?: number;
  autoComplete?: string;
  label?: string;
  labelClassName?: string;
  min?: number | string;
  required?: boolean;
  rows?: number;
  max?: number;
}

export interface TextInputProps extends InputBaseProps {
  error?: string;
  inputClassName?: string;
  endIcon?: ReactNode;
  startIcon?: ReactNode;
  viewPassword?: boolean;
  errorNode?: ReactNode;
  handleEndIconClick?: () => void;
  value?: string | number;
  handleOnChange?: (arg: string) => void;
  ignoreValueForIcon?: boolean;
  endIconClassName?: string;
}

export interface HookInputProps
  extends Omit<TextInputProps, 'onChange'>,
    HookInputBaseProps {
  name: string;
}

const BaseInput = forwardRef<HTMLInputElement, InputBaseProps>(
  (
    {
      placeholder,
      onChange,
      name,
      className,
      maxLength,
      autoComplete,
      label,
      labelClassName,
      required,
      ...rest
    },
    ref
  ) => (
    <>
      {label && (
        <label
          className={[
            'mb-1',
            labelClassName,
            required ? 'required' : '',
            style.inputLabel,
          ].join(' ')}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <FormControl
        id={name}
        ref={ref}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        className={`${style['text-input-control']} ${className} position-relative`}
        maxLength={maxLength}
        autoComplete={autoComplete || 'off'}
        {...rest}
      />
    </>
  )
);

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      inputClassName,
      type,
      endIcon,
      errorNode,
      labelClassName,
      startIcon,
      handleOnChange,
      handleEndIconClick,
      value,
      ignoreValueForIcon,
      onChange,
      endIconClassName,
      ...rest
    },
    ref
  ) => {
    const error = !!inputClassName?.includes('is-invalid');

    return (
      <FormGroup className={`${className} position-relative`}>
        {startIcon && !error && startIcon}
        <BaseInput
          ref={ref}
          labelClassName={[style.inputBaseLabel, labelClassName].join(' ')}
          className={[
            inputClassName || '',
            style.inputBase,
            error ? 'border border-danger' : '',
          ].join(' ')}
          type={type || 'text'}
          value={value}
          onChange={(event) => {
            handleOnChange?.(event.target.value);
            onChange?.(event);
          }}
          {...rest}
        />
        {endIcon && (ignoreValueForIcon ? true : value) && (
          <div
            className={[style.endIcon, endIconClassName].join(' ')}
            onClick={handleEndIconClick}
          >
            {endIcon}
          </div>
        )}
        {error && errorNode}
      </FormGroup>
    );
  }
);

const HookTextInput = forwardRef<HTMLInputElement, HookInputProps>(
  (
    {
      name,
      required,
      inputClassName,
      validate,
      disabled,
      defaultValue,
      ...rest
    },
    ref
  ) => {
    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        rules={{ required: required && 'Required', validate }}
        control={control}
        defaultValue={defaultValue}
        render={({
          field: { value, onChange, ...field },
          fieldState: { error },
        }) => (
          <TextInput
            {...rest}
            {...field}
            ref={ref}
            value={value}
            onChange={({ target: { value } }) => {
              onChange(value);
            }}
            defaultValue={defaultValue}
            disabled={disabled}
            required={required}
            inputClassName={[error ? 'is-invalid' : '', inputClassName].join(
              ' '
            )}
            errorNode={error && <HookErrorMessage message={error.message} />}
          />
        )}
      />
    );
  }
);

export { TextInput, HookTextInput };
