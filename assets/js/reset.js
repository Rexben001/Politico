/* eslint-disable no-undef */

// const basePath = 'https://politico-voting.herokuapp.com';
const basePath = 'http://localhost:8080';
const token = window.location.href.split('=')[1];
console.log(token);

const sendEmail = (e) => {
  e.preventDefault();

  document.getElementById('loader1').style.display = 'block';
  document.getElementById('register').style.display = 'none';
  const email = document.getElementById('email').value;
  console.log(email);
  const data = {
    email
  };
  fetch(`${basePath}/api/v1/auth/reset`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    if (res.status === 404) {
      return res;
    }
    return res.json();
  })
    .then((response) => {
      if (response.status === 404) {
        document.getElementById('no-data').innerHTML = 'No users has been created';
      }
      if (response.status === 200) {
        document.getElementById('reset').style.display = 'none';
        document.getElementById('link').style.display = 'block';
      } else if (response.status === 403) {
        window.location.href = './403.html';
      } else if (response.status === 401) {
        window.location.href = './401.html';
      }
    })
    .catch(error => console.log('Error:', error));
};


const changePassword = (e) => {

  e.preventDefault();

  document.getElementById('loader1').style.display = 'block';
  document.getElementById('register').style.display = 'none';
  const pass = document.getElementById('password').value;
  const c_pass = document.getElementById('c_password').value;

  if (pass === c_pass) {
    const data = {
      password: pass
    }
    fetch(`${basePath}/api/v1/resetpassword/${token}`, {
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
  } else {
    document.getElementById('error').innerHTML = 'Password does not match';
  }
}