/* eslint-disable no-undef */
const getToken = () => {
  const token = window.localStorage.getItem('user_token')
  const btn = document.getElementById('index_button');
  const signup = document.getElementById('signup');
  const signin = document.getElementById('signin');
  const menu = document.getElementById('menu');

  if (token) {
    console.log(btn.innerHTML);
    btn.innerHTML = 'Go to Profile page';
    btn.addEventListener('click', () => { window.location.href = './userprofile.html' });
    signin.style.display = 'none';
    signup.style.display = 'none';
    menu.style.display = 'none';

  } else {
    btn.innerHTML = 'Sign up for free';
    btn.addEventListener('click', () => { window.location.href = './signup.html' });
  }
};

getToken();

const quotes = [
  {
    quote: '"Change will not come if we wait for some other person or some other time. We are the ones we have been waiting for."',
    author: '~ Barack Obama'
  },
  {
    quote: '"Leadership is not about the next election, it\'s about the next generation."',
    author: '~ Simon Sinek'
  },
  {
    quote: '"One of the reasons people hate politics is that truth is rarely a politician\'s objective. Election and power are."',
    author: '~ Cal Thomas'
  },
  {
    quote: '"A politician thinks of the next election. A statesman, of the next generation."',
    author: '~ James Freeman Clarke'
  },
  {
    quote: '"Democracy is not just an election, it is our daily life."',
    author: '~ Tsai Ing-wen'
  }
];


setInterval(() => {
  const rand = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('quotes').innerHTML = rand.quote;
  document.getElementById('author').innerHTML = rand.author;
}, 10000);