import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delayInput = form.elements.delay.value;
  const delay = parseInt(delayInput, 10);

  const state = form.elements.state.value;

  createPromise(delay, state)
    .then(result => {
      iziToast.success({
        title: '✅ Success',
        message: `Fulfilled promise in ${result}ms`,
        timeout: 5000,
      });
    })
    .catch(error => {
      iziToast.error({
        title: '❌ Error',
        message: `Rejected promise in ${error}ms`,
        timeout: 5000,
      });
    })
    .finally(() => {
      const radioButtons = form.elements.state;
      radioButtons.forEach(radio => (radio.checked = false));
    });
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else if (state === 'rejected') {
        reject(delay);
      }
    }, delay);
  });
}
