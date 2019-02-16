/* eslint-disable no-undef */
const basePath = 'https://politico-voting.herokuapp.com';
document.getElementById('signup').addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Hey');
  const data = {
    firstname: document.getElementById('firstname').value,
    lastname: document.getElementById('lastname').value,
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    phonenumber: document.getElementById('phonenumber').value,
    passportUrl: document.getElementById('passport').files[0]
  }
  fetch(`${basePath}/api/v1/auth/signup`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(response => {
      if (response.status === 201) {
        window.location.href = './userprofile.html';
      } else {
        console.log('Invalid user');
      }
    })
    .catch(error => console.log('Error:', error));
});


