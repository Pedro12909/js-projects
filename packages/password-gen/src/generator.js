const SPECIAL_CHARS = '§±!#$%&/()=?*@€+,.;:<>ºª-_|';

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomUpperCaseLetter = () => {
  return String.fromCharCode(randomIntFromInterval(65, 90));
};

const getRandomLowerCaseLetter = () => {
  return String.fromCharCode(randomIntFromInterval(97, 122));
};

const getRandomInteger = () => {
  return '' + randomIntFromInterval(0, 9);
};

const getRandomSpecialChar = () => {
  return SPECIAL_CHARS[randomIntFromInterval(0, SPECIAL_CHARS.length - 1)];
};

const generatePassword = (options) => {
  const { hasUpperCase, hasLowerCase, hasNumbers, hasSpecial, length } = options;

  const callbacks = [];

  if (hasUpperCase) callbacks.push(getRandomUpperCaseLetter);
  if (hasLowerCase) callbacks.push(getRandomLowerCaseLetter);
  if (hasNumbers) callbacks.push(getRandomInteger);
  if (hasSpecial) callbacks.push(getRandomSpecialChar);
};

const validatePassword = (password, options) => {
  return true;
};

const getPassword = options => {
  let password = null;

  do {
    password = generatePassword(options);
  } while (!validatePassword(password, options));

  return password;
};

module.exports = {
  getPassword
};
