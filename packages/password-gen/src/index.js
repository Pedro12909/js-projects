const generator = require('./generator');

const generateButtonEl = document.getElementById('generateBtn');
const charLengthSliderEl = document.getElementById('numCharsSlider');
const charLengthSliderSpanEl = document.getElementById('sliderValue');

const optionsUppercaseEl = document.getElementById('uppercase');
const optionsLowercaseEl = document.getElementById('lowercase');
const optionsNumbersEl = document.getElementById('numbers');
const optionsSpecialCharsEl = document.getElementById('specialChars');

generateButtonEl.addEventListener('click', () => {
  const pass = generator.getPassword({
    hasUpperCase: optionsUppercaseEl.checked,
    hasLowerCase: optionsLowercaseEl.checked,
    hasNumbers: optionsNumbersEl.checked,
    hasSpecial: optionsSpecialCharsEl.checked,
    length: Number.parseInt(charLengthSliderEl.value)
  });
  alert(pass);
});

charLengthSliderEl.addEventListener('input', () => {
  charLengthSliderSpanEl.textContent = charLengthSliderEl.value;
});
