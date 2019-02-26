/* eslint-disable no-plusplus */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// const basePath = 'https://politico-voting.herokuapp.com';
const basePath = "http://localhost:8080"
const getToken = () => {
  const token = window.localStorage.getItem('user_token')
  if (token) {
    return token;
  }
  window.location.href = './signin.html';
};

const vote = document.getElementById('votes');
const parties = document.getElementById('parties');
const candidate = document.getElementById('candy');
const result = document.getElementById('resulty');

const votes = document.getElementById('vote');
const pol = document.getElementById('pol');
const candidates = document.getElementById('candidates');
const results = document.getElementById('result');



document.getElementById('vote').addEventListener('click', (e) => {
  e.preventDefault();
  vote.style.display = 'block';
  parties.style.display = 'none';
  candidate.style.display = 'none';
  result.style.display = 'none';

});


document.getElementById('pol').addEventListener('click', (e) => {
  e.preventDefault();
  vote.style.display = 'none';

  parties.style.display = 'block';
  candidate.style.display = 'none';
  result.style.display = 'none';
});

document.getElementById('candidates').addEventListener('click', (e) => {
  e.preventDefault();
  vote.style.display = 'none';
  parties.style.display = 'none';
  candidate.style.display = 'block';
  result.style.display = 'none';
});

document.getElementById('resul').addEventListener('click', (e) => {
  e.preventDefault();
  vote.style.display = 'none';
  parties.style.display = 'none';
  candidate.style.display = 'none';
  result.style.display = 'block';

});

