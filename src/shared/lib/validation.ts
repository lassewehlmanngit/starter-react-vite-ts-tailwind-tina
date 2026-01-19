export type ValidationRule<T = string> = {
  validate: (value: T) => boolean;
  message: string;
};

export type FieldValidation<T = string> = ValidationRule<T>[];

// Common validation rules
export const required = (message = 'This field is required'): ValidationRule => ({
  validate: (value) => value.trim().length > 0,
  message,
});

export const email = (message = 'Please enter a valid email address'): ValidationRule => ({
  validate: (value) => {
    if (!value) return true; // Let required handle empty
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },
  message,
});

export const minLength = (min: number, message?: string): ValidationRule => ({
  validate: (value) => {
    if (!value) return true; // Let required handle empty
    return value.length >= min;
  },
  message: message ?? `Must be at least ${min} characters`,
});

export const maxLength = (max: number, message?: string): ValidationRule => ({
  validate: (value) => value.length <= max,
  message: message ?? `Must be at most ${max} characters`,
});

export const pattern = (regex: RegExp, message: string): ValidationRule => ({
  validate: (value) => {
    if (!value) return true;
    return regex.test(value);
  },
  message,
});

export const phone = (message = 'Please enter a valid phone number'): ValidationRule => ({
  validate: (value) => {
    if (!value) return true;
    // Basic phone validation - allows various formats
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
    return phoneRegex.test(value) && value.replace(/\D/g, '').length >= 7;
  },
  message,
});

// Validate a single field
export const validateField = <T = string>(
  value: T,
  rules: FieldValidation<T>,
): string | null => {
  for (const rule of rules) {
    if (!rule.validate(value)) {
      return rule.message;
    }
  }
  return null;
};

// Validate all fields in a form
export const validateForm = <T extends object>(
  values: T,
  schema: Partial<Record<keyof T, FieldValidation>>,
): Partial<Record<keyof T, string>> => {
  const errors: Partial<Record<keyof T, string>> = {};

  for (const field of Object.keys(schema) as Array<keyof T>) {
    const rules = schema[field];
    if (rules) {
      const value = values[field];
      const error = validateField(String(value ?? ''), rules);
      if (error) {
        errors[field] = error;
      }
    }
  }

  return errors;
};
