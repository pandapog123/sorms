import { writable, type Updater, get } from "svelte/store";
import type { Field, FieldError, FieldType, Validator } from "./types";

function createFieldReturn<T>(
  value: T,
  validators: Validator<T>[]
): FieldType<T> {
  let valid = true;
  let error: FieldError | undefined;

  for (const validator of validators) {
    let result = validator(value);

    if (!result.valid) {
      error = result.error;
      valid = false;

      break;
    }
  }

  return {
    value,
    valid,
    pure: false,
    error,
  };
}

function createInitialFieldReturn<T>(
  value: T,
  validators: Validator<T>[]
): FieldType<T> {
  let createdField = createFieldReturn<T>(value, validators);

  createdField.pure = true;

  return createdField;
}

export function field<T>(
  initialValue: T,
  validators: Validator<T>[]
): Field<T> {
  const valueStore = writable<FieldType<T>>(
    createInitialFieldReturn(initialValue, validators)
  );

  function set(value: FieldType<T>) {
    valueStore.set(createFieldReturn(value.value, validators));
  }

  function setValue(value: T) {
    valueStore.set(createFieldReturn(value, validators));
  }

  function update(updater: Updater<FieldType<T>>) {
    let result = updater(get(valueStore));

    set(result);
  }

  return {
    subscribe: valueStore.subscribe,
    update,
    set,
    setValue,
  };
}
