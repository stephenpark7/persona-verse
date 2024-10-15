// TODO: don't use this because
// TypeScript is not able to infer the type of the value
// so User | null cannot be inferred

// just be careful when comparing integers
// since an id of 0 should be considered as a valid id (truthy)

import { isFalsy } from './base';

describe('isFalsy', () => {
  describe('when value is null', () => {
    it('should return true for null', () => {
      expect(isFalsy(null)).toBe(true);
    });
  });

  describe('when value is undefined', () => {
    it('should return true for undefined', () => {
      expect(isFalsy(undefined)).toBe(true);
    });
  });

  describe('when value is a string', () => {
    it('should return true for empty string', () => {
      expect(isFalsy('')).toBe(true);
    });

    it('should return false for non-empty string', () => {
      expect(isFalsy('hello')).toBe(false);
    });

    it('should return false for whitespace', () => {
      expect(isFalsy(' ')).toBe(false);
    });
  });

  describe('when value is a number', () => {
    it('should return false for 0', () => {
      expect(isFalsy(0)).toBe(false);
    });

    it('should return false for 1', () => {
      expect(isFalsy(1)).toBe(false);
    });

    it('should return true for NaN', () => {
      expect(isFalsy(NaN)).toBe(true);
    });

    it('should return false for Infinity', () => {
      expect(isFalsy(Infinity)).toBe(false);
    });

    it('should return false for -Infinity', () => {
      expect(isFalsy(-Infinity)).toBe(false);
    });
  });

  describe('when value is an object or array', () => {
    it('should return true for empty object', () => {
      expect(isFalsy({})).toBe(true);
    });

    it('should return true for empty array', () => {
      expect(isFalsy([])).toBe(true);
    });

    it('should return false for non-empty object', () => {
      expect(isFalsy({ key: 'value' })).toBe(false);
    });

    it('should return false for non-empty array', () => {
      expect(isFalsy([1, 2, 3])).toBe(false);
    });

    it('should return true for empty Map', () => {
      expect(isFalsy(new Map())).toBe(true);
    });

    it('should return false for non-empty Map', () => {
      const map = new Map();
      map.set('key', 'value');
      expect(isFalsy(map)).toBe(false);
    });

    it('should return true for empty Set', () => {
      expect(isFalsy(new Set())).toBe(true);
    });

    it('should return false for non-empty Set', () => {
      const set = new Set();
      set.add('value');
      expect(isFalsy(set)).toBe(false);
    });
  });

  describe('when value is NaN', () => {
    it('should return true for NaN', () => {
      expect(isFalsy(NaN)).toBe(true);
    });
  });

  describe('when value is a boolean', () => {
    it('should return false for true', () => {
      expect(isFalsy(true)).toBe(false);
    });

    it('should return true for false', () => {
      expect(isFalsy(false)).toBe(true);
    });
  });

  describe('when value is a function', () => {
    it('should return false for a function', () => {
      expect(isFalsy(() => undefined)).toBe(false);
    });
  });

  describe('when value is a symbol', () => {
    it('should return false for a symbol', () => {
      expect(isFalsy(Symbol())).toBe(false);
    });
  });
});

describe('isTruthy', () => {
  describe('when value is null', () => {
    it('should return false for null', () => {
      expect(isFalsy(null)).toBe(true);
    });
  });

  describe('when value is undefined', () => {
    it('should return false for undefined', () => {
      expect(isFalsy(undefined)).toBe(true);
    });
  });

  describe('when value is a string', () => {
    it('should return false for empty string', () => {
      expect(isFalsy('')).toBe(true);
    });

    it('should return true for non-empty string', () => {
      expect(isFalsy('hello')).toBe(false);
    });

    it('should return true for whitespace', () => {
      expect(isFalsy(' ')).toBe(false);
    });
  });

  describe('when value is a number', () => {
    it('should return true for 0', () => {
      expect(isFalsy(0)).toBe(false);
    });

    it('should return true for 1', () => {
      expect(isFalsy(1)).toBe(false);
    });

    it('should return false for NaN', () => {
      expect(isFalsy(NaN)).toBe(true);
    });

    it('should return true for Infinity', () => {
      expect(isFalsy(Infinity)).toBe(false);
    });

    it('should return true for -Infinity', () => {
      expect(isFalsy(-Infinity)).toBe(false);
    });
  });

  describe('when value is an object or array', () => {
    it('should return false for empty object', () => {
      expect(isFalsy({})).toBe(true);
    });

    it('should return false for empty array', () => {
      expect(isFalsy([])).toBe(true);
    });

    it('should return true for non-empty object', () => {
      expect(isFalsy({ key: 'value' })).toBe(false);
    });

    it('should return true for non-empty array', () => {
      expect(isFalsy([1, 2, 3])).toBe(false);
    });

    it('should return false for empty Map', () => {
      expect(isFalsy(new Map())).toBe(true);
    });

    it('should return true for non-empty Map', () => {
      const map = new Map();
      map.set('key', 'value');
      expect(isFalsy(map)).toBe(false);
    });

    it('should return false for empty Set', () => {
      expect(isFalsy(new Set())).toBe(true);
    });
  });
});
