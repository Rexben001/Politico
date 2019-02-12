/* eslint-disable no-undef */

document.getElementById('signin').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  }
  fetch('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res2 => res2.json())
    .then((res) => {
      if (res.status === 201) {
        if (!res.data[0].token) throw ('no token in response');
        window.localStorage.setItem('user_token', res.data[0].token);
        window.location.href = '../userprofile.html';
      } else if (res.status === 404) {
        document.getElementById('error_message').innerHTML = 'Incorrect email or password';
      }
    })
    .catch(error => console.log('Error:', error));
});
