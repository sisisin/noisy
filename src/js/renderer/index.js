const Twit = require('twit');
const T = new Twit(require('./settings'));

const twform = document.querySelector('.twform');

twform.addEventListener('submit', (e) => {
  e.preventDefault();
  tweet();
});
twform.addEventListener('keydown', (e) => {
  if (e.ctrlKey === false) return;
  if (e.keyCode !== 13) return;

  e.preventDefault();
  tweet();
});

function tweet() {
  let tw = document.querySelector('.tweet');
  let hs = document.querySelector('.hashtag');
  let twString = tw.value;

  if (hs.value !== '') twString += ` # ${hs.value}`;

  T.post('statuses/update', { status: twString }, (err, data, res) => {
    if (err) alert(err.toString());
    tw.value = '';
  });
}
