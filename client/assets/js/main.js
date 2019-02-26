/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
document.getElementById('menu').addEventListener('click', (e) => {
  e.preventDefault();
  const nav = document.getElementById('top_menu');
  const menu = document.getElementById('menu');

  if (nav.className === 'navbar') {
    nav.className += ' responsive';
    menu.innerHTML = 'X'

  } else {
    nav.className = 'navbar';
    menu.innerHTML = '&#9776;'
  }
});


const logout = () => {
  const token = window.localStorage.getItem('user_token')
  if (token) {
    window.localStorage.clear();
    window.location.href = './signin.html';
  }
}
