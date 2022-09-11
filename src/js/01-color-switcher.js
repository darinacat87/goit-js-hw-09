function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  bodyEl: document.querySelector('body'),
  btnStartEl: document.querySelector('[data-start]'),
  btnStopEl: document.querySelector('[data-stop]'),
};

let timerId = null;
refs.btnStopEl.disabled = true;

refs.btnStartEl.addEventListener('click', () => {
  refs.btnStartEl.disabled = true;
  refs.btnStopEl.disabled = false;
  timerId = setInterval(() => {
    const color = getRandomHexColor();
    refs.bodyEl.style.background = color;
  }, 1000);
});

refs.btnStopEl.addEventListener('click', () => {
  refs.btnStartEl.disabled = false;
  refs.btnStopEl.disabled = true;
  clearTimeout(timerId);
});
