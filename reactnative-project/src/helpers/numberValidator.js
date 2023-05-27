export function numberValidator(number) {
  const numberRegex = /^\d+$/;
  if (!number) {
    return "Field can't be empty.";
  }
  if (!numberRegex.test(number)) {
    return "Invalid number.";
  }
  if (number.length < 8) {
    return "Number must have at least 8 characters.";
  }
  return '';
}
