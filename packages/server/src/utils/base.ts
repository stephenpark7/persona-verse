export const isFalsy = (value: unknown): boolean => {
  if (value == null) {
    return true;
  }

  if (typeof value === 'number') {
    return isNaN(value);
  }

  if (typeof value === 'string') {
    return value.length === 0;
  }

  if (typeof value === 'boolean') {
    return !value;
  }

  if (typeof value === 'object') {
    if (value instanceof Map || value instanceof Set) {
      return value.size === 0;
    }
    return Object.keys(value).length === 0;
  }

  return false;
};

export const isTruthy = (value: unknown): boolean => {
  return !isFalsy(value);
};
