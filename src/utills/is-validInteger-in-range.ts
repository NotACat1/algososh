const isValidIntegerInRange = (
  input: string,
  min: number,
  max: number,
): boolean => {
  const num = parseInt(input);

  if (isNaN(num)) {
    return false;
  }
  return num >= min && num <= max;
};

export default isValidIntegerInRange;
