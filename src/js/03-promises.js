import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
  delayEl: document.querySelector('[name=delay]'),
  stepEl: document.querySelector('[name=step]'),
  amountEl: document.querySelector('[name=amount]'),
};

refs.formEl.addEventListener('submit', event => {
  event.preventDefault();
  let { delay, step, amount } = onGettingData();

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delay += step;
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject({ position, delay });
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

function onGettingData() {
  return {
    delay: Number(refs.delayEl.value),
    step: Number(refs.stepEl.value),
    amount: Number(refs.amountEl.value),
  };
}
