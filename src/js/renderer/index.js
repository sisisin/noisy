const Twit = require('twit');
const T = new Twit(require('./settings'));

document.querySelector('.twform')
  .addEventListener('submit', (e) => {
    e.preventDefault();
    const tw = document.querySelector('.tweet');
    const hs = document.querySelector('.hashtag');
    let twString = tw.value;

    if (hs.value !== '') twString += ` #${hs.value}`;

    T.post('statuses/update', { status: twString }, (err, data, res) => {
        if (err) alert(err.toString());
        tw.value = '';
      });
});
