import { get, readable, writable, type Unsubscriber } from "svelte/store";
import type { Field, Form, FormFields, FormType } from "./types";

function createFormValue(fields: FormFields): FormType {
  let result: FormType = {
    valid: true,
    errors: {},
  };

  for (const fieldName in fields) {
    let field = fields[fieldName];
    let fieldValue = get(field);

    if (!fieldValue.valid && result.valid) {
      result.valid = false;
    }

    result.errors[fieldName] = fieldValue.error;
  }

  return result;
}

export function form(fields: FormFields): Form {
  let valueStore = readable<FormType>(createFormValue(fields), (set) => {
    let subscriptions: Unsubscriber[] = [];

    for (const fieldName in fields) {
      let field = fields[fieldName];

      let subscription = field.subscribe(() => {
        set(createFormValue(fields));
      });

      subscriptions.push(subscription);
    }

    return () => {
      for (let subscription of subscriptions) {
        subscription();
      }
    };
  });

  function formGet(name: string): Field<any> | null {
    if (fields[name] == undefined || fields[name] === null) {
      return null;
    }

    return fields[name];
  }

  return {
    ...valueStore,
    get: formGet,
  };
}
