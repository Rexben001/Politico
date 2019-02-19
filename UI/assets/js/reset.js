/* eslint-disable no-undef */

// const basePath = 'http://localhost:8080';
const basePath = 'https://politico-voting.herokuapp.com';
con// const basePath = 'http://localhost:8080';
const sendEmail = (e) => {
  e.preventDefault();

  // const reset = document.getElementById('reset');
  // const change = document.getElementById('change');
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
      if (response.status === 201) {
        window.location.href = './reset.html';
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

  let pass = document.getElementById('password').value;
  let c_pass = document.getElementById('c_password').value;

  if (pass === c_pass) {
    const data = {
      password: pass
    }
    fetch(`${basePath}/api/v1/resetpassword/:token`, {
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
} else {
  document.getElementById('error').innerHTML = 'Password does not match';
  }
}