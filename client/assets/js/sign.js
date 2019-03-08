/* eslint-disable no-undef */
const basePath = 'https://politico-voting.herokuapp.com';

document.getElementById('signin').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('loader1').style.display = 'block';
  document.getElementById('register').style.display = 'none';
  const data = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  }
  fetch(`${basePath}/api/v1/auth/login`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((res2) => {
    if (res2.status !== 201) {
      return res2;
    }
    return res2.json();
  }).then((res) => {
    if (res.status === 201) {
      console.log(res)
      if (!res.data[0].token) throw ('no token in response');
      window.localStorage.setItem('user_token', res.data[0].token);
      window.localStorage.setItem('isAdmin', res.data[0].user.is_admin);
      window.location.href = './userprofile.html';
    } else if (res.status === 404) {
      document.getElementById('error_message').innerHTML = 'Incorrect email or password';
      document.getElementById('loader1').style.display = 'none';
      document.getElementById('register').style.display = 'block';
    } else {
      document.getElementById('error_message').innerHTML = 'Something unexpected happened. Try again';
      document.getElementById('loader1').style.display = 'none';
      document.getElementById('register').style.display = 'block';
    }
  })
    .catch(error => console.log('Error:', error));
});
