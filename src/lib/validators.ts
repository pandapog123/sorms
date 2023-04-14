import type { FieldError, Validator } from "./types";

export const required: Validator<string> = (value) => {
  let valid = value !== "";

  let error: FieldError | undefined = valid
    ? undefined
    : {
        message: "Value cannot be empty.",
        source: "required",
      };

  return {
    valid,
    error,
  };
};

export function minLength(length: number): Validator<string> {
  return (value) => {
    let valid = value.length >= length;

    let error: FieldError | undefined = valid
      ? undefined
      : {
          message: `Value has to have a minimum of ${length} characters.`,
          source: "minLength",
        };

    return {
      valid,
      error,
    };
  };
}

export function maxLength(length: number): Validator<string> {
  return (value) => {
    let valid = value.length >= length;

    let error: FieldError | undefined = valid
      ? undefined
      : {
          message: `Value has a maximum of ${length} characters.`,
          source: "maxLength",
        };

    return {
      valid,
      error,
    };
  };
}

export function regex(
  expression: RegExp,
  debugMessage?: FieldError
): Validator<string> {
  return (value) => {
    let exec = expression.exec(value);
    let valid = exec && exec[0] == value;

    let error: FieldError | undefined = valid
      ? undefined
      : {
          message: debugMessage
            ? debugMessage.message
            : `Value did not conform to regular expression given.`,
          source: debugMessage ? debugMessage.source : "regex",
        };

    return {
      valid,
      error,
    };
  };
}

export const email = regex(/[-A-Za-z0-9_.%]+@[-A-Za-z0-9_.%]+\.[A-Za-z]+/gm, {
  message: "Value does not conform to email format.",
  source: "email",
});

export const minValue: (minNum: number) => Validator<number> = (
  minNum: number
) => {
  return (value) => {
    let valid = value >= minNum;

    let error: FieldError | undefined = valid
      ? undefined
      : {
          message: `Value must be a minimum of ${minNum}.`,
          source: "minValue",
        };

    return {
      valid,
      error,
    };
  };
};

export const maxValue: (maxNum: number) => Validator<number> = (
  maxNum: number
) => {
  return (value) => {
    let valid = value <= maxNum;

    let error: FieldError | undefined = valid
      ? undefined
      : {
          message: `Value must be a maximum of ${maxNum}.`,
          source: "minValue",
        };

    return {
      valid,
      error,
    };
  };
};
