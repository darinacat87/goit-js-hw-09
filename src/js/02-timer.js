import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputEl: document.querySelector('input#datetime-picker'),
  startEl: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};

let targetDate;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (timerId) {
      Notiflix.Notify.warning('будь ласка, оновіть сторінку :)');
      return;
    }
    if (Date.now() > selectedDates[0]) {
      Notiflix.Notify.failure('будь ласка, оберіть дату у майбутньому :)');
      return;
    }

    console.log(selectedDates[0]);
    targetDate = selectedDates[0];
    refs.startEl.disabled = false;
  },
};

flatpickr(refs.inputEl, options);
refs.startEl.disabled = true;
console.log(options.defaultDate);

refs.startEl.addEventListener('click', () => {
  startTimer();
  refs.startEl.disabled = true;
});

function startTimer() {
  Notiflix.Notify.success('відлік почався');
  timerId = setInterval(() => {
    const difTime = targetDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(difTime);
    refs.daysEl.textContent = addLeadingZero(days);
    refs.hoursEl.textContent = addLeadingZero(hours);
    refs.minutesEl.textContent = addLeadingZero(minutes);
    refs.secondsEl.textContent = addLeadingZero(seconds);

    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(timerId);
      refs.startEl.disabled = false;
      Notiflix.Notify.info('відлік закінчився');
      timerId = null;
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
