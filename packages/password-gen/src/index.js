const generator = require('./generator');

const resultEl = document.getElementById('result');

const generateButtonEl = document.getElementById('generateBtn');
const copyClipboardButtonEl = document.getElementById('copy');
const charLengthSliderEl = document.getElementById('numCharsSlider');
const charLengthSliderSpanEl = document.getElementById('sliderValue');

const optionsUppercaseEl = document.getElementById('uppercase');
const optionsLowercaseEl = document.getElementById('lowercase');
const optionsNumbersEl = document.getElementById('numbers');
const optionsSpecialCharsEl = document.getElementById('specialChars');

const generatePassword = () => {
  let generatedPass = null;

  try {
    generatedPass = generator.getPassword({
      hasUpperCase: optionsUppercaseEl.checked || false,
      hasLowerCase: optionsLowercaseEl.checked || false,
      hasNumbers: optionsNumbersEl.checked || false,
      hasSpecial: optionsSpecialCharsEl.checked || false,
      length: Number.parseInt(charLengthSliderEl.value)
    });
  } catch (error) {
    alert(error.message);
    return;
  }

  resultEl.textContent = generatedPass;
};

const copyToClipboard = () => {
  const range = document.createRange();
  range.selectNode(resultEl);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  console.log(window.getSelection())
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
};

generateButtonEl.addEventListener('click', generatePassword);

charLengthSliderEl.addEventListener('input', () => {
  charLengthSliderSpanEl.textContent = charLengthSliderEl.value;
});

copyClipboardButtonEl.addEventListener('click', copyToClipboard);

generatePassword();
