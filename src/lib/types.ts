import type { Readable, Writable } from "svelte/store";

export interface FieldError {
  message: string;
  source: string;
}

export interface FieldType<T> {
  value: T;
  valid: boolean;
  pure: boolean;
  error?: FieldError;
}

export interface Field<T> extends Writable<FieldType<T>> {
  reset: () => void;
  setValue: (value: T) => void;
}

export interface FormFields {
  [name: string]: Field<any>;
}

export interface FormType {
  valid: boolean;
  errors: {
    [name: string]: FieldError | undefined;
  };
}

export interface Form extends Readable<FormType> {
  get: (name: string) => Field<any> | null;
}

export interface ValidatorResult {
  valid: boolean;
  error?: FieldError;
}

export type Validator<T> = (value: T) => ValidatorResult;
