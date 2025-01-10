const appError = require("./appError");
const httpText = require("./httpText");

module.exports = (mobile, fieldName) => {
  const localPattern = /^0\d{9}$/; // Starts with '0' followed by exactly 9 digits
  const internationalPattern = /^\+971\d{9}$/; // Starts with '+971' followed by exactly 9 digits

  if (localPattern.test(mobile)) {
    return mobile.replace(/^0/, "+971"); // Convert local format to international format
  }

  if (internationalPattern.test(mobile)) {
    return mobile; // Already in valid international format
  }

  // Throw error if invalid
  throw appError.create(
    `Invalid ${fieldName} format! Enter a number starting with '0' followed by 9 digits or '+971' followed by 9 digits.`,
    400,
    httpText.FAIL
  );
};