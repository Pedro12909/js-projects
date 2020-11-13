const constants = require('./constants');
const generator  = require('./generator');

const charLengthSliderSpanEl = document.getElementById('sliderValue');

function sliderHandler(value) {
    charLengthSliderSpanEl.textContent = value;
}