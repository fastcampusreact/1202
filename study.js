const $name = document.querySelector('#name');
const $email = document.querySelector('#email');
const $h2Email = document.querySelector('.email');
const $h2Name = document.querySelector('.name');

$email.onkeydown = ({ keyCode }) => {
  if(keyCode !== 13) return;
  $h2Email.innerText = $email.value;
  $h2Name.innerText = $name.value;
};
