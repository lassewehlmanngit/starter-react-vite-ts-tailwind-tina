import { describe, it, expect } from 'vitest';
import {
  required,
  email,
  minLength,
  maxLength,
  phone,
  pattern,
  validateField,
  validateForm,
} from '@/shared/lib/validation';

describe('Validation Rules', () => {
  describe('required', () => {
    const rule = required();

    it('fails for empty string', () => {
      expect(rule.validate('')).toBe(false);
      expect(rule.validate('   ')).toBe(false);
    });

    it('passes for non-empty string', () => {
      expect(rule.validate('hello')).toBe(true);
      expect(rule.validate('  hello  ')).toBe(true);
    });

    it('uses custom message', () => {
      const customRule = required('Custom required message');
      expect(customRule.message).toBe('Custom required message');
    });
  });

  describe('email', () => {
    const rule = email();

    it('passes for valid emails', () => {
      expect(rule.validate('test@example.com')).toBe(true);
      expect(rule.validate('user.name@domain.co.uk')).toBe(true);
      expect(rule.validate('user+tag@example.org')).toBe(true);
    });

    it('fails for invalid emails', () => {
      expect(rule.validate('invalid')).toBe(false);
      expect(rule.validate('invalid@')).toBe(false);
      expect(rule.validate('@domain.com')).toBe(false);
      expect(rule.validate('user@domain')).toBe(false);
    });

    it('passes for empty string (let required handle it)', () => {
      expect(rule.validate('')).toBe(true);
    });
  });

  describe('minLength', () => {
    const rule = minLength(5);

    it('passes for strings at or above minimum', () => {
      expect(rule.validate('hello')).toBe(true);
      expect(rule.validate('hello world')).toBe(true);
    });

    it('fails for strings below minimum', () => {
      expect(rule.validate('hi')).toBe(false);
      expect(rule.validate('test')).toBe(false);
    });

    it('passes for empty string (let required handle it)', () => {
      expect(rule.validate('')).toBe(true);
    });
  });

  describe('maxLength', () => {
    const rule = maxLength(10);

    it('passes for strings at or below maximum', () => {
      expect(rule.validate('hello')).toBe(true);
      expect(rule.validate('helloworld')).toBe(true);
    });

    it('fails for strings above maximum', () => {
      expect(rule.validate('hello world!')).toBe(false);
    });
  });

  describe('phone', () => {
    const rule = phone();

    it('passes for valid phone numbers', () => {
      expect(rule.validate('+1234567890')).toBe(true);
      expect(rule.validate('(123) 456-7890')).toBe(true);
      expect(rule.validate('123-456-7890')).toBe(true);
      expect(rule.validate('+49 123 456 7890')).toBe(true);
    });

    it('fails for invalid phone numbers', () => {
      expect(rule.validate('123')).toBe(false);
      expect(rule.validate('abc')).toBe(false);
      expect(rule.validate('12-34')).toBe(false);
    });

    it('passes for empty string (let required handle it)', () => {
      expect(rule.validate('')).toBe(true);
    });
  });

  describe('pattern', () => {
    const alphanumericRule = pattern(/^[a-zA-Z0-9]+$/, 'Only alphanumeric characters');

    it('passes for matching patterns', () => {
      expect(alphanumericRule.validate('abc123')).toBe(true);
      expect(alphanumericRule.validate('TEST')).toBe(true);
    });

    it('fails for non-matching patterns', () => {
      expect(alphanumericRule.validate('abc-123')).toBe(false);
      expect(alphanumericRule.validate('hello world')).toBe(false);
    });
  });
});

describe('validateField', () => {
  it('returns null for valid field', () => {
    const rules = [required(), minLength(3)];
    expect(validateField('hello', rules)).toBeNull();
  });

  it('returns first error message for invalid field', () => {
    const rules = [required('Required'), minLength(5, 'Too short')];
    expect(validateField('', rules)).toBe('Required');
    expect(validateField('hi', rules)).toBe('Too short');
  });
});

describe('validateForm', () => {
  const schema = {
    name: [required('Name is required'), minLength(2, 'Name too short')],
    email: [required('Email is required'), email('Invalid email')],
  };

  it('returns empty object for valid form', () => {
    const values = { name: 'John', email: 'john@example.com' };
    const errors = validateForm(values, schema);
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it('returns errors for invalid fields', () => {
    const values = { name: '', email: 'invalid' };
    const errors = validateForm(values, schema);
    expect(errors.name).toBe('Name is required');
    expect(errors.email).toBe('Invalid email');
  });

  it('handles partial validation', () => {
    const values = { name: 'J', email: 'john@example.com' };
    const errors = validateForm(values, schema);
    expect(errors.name).toBe('Name too short');
    expect(errors.email).toBeUndefined();
  });
});
