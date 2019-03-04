/* eslint-disable camelcase */
/* eslint-disable no-undef */
const basePath = 'https://politico-voting.herokuapp.com';
// const basePath = "http://localhost:8080";

let imageLink;
cloudinary.applyUploadWidget('#upload_widget_opener', {
  cloudName: 'rexben',
  uploadPreset: 'lcxc1pn1'
}, (error, result) => {
  if (result && result.event === 'success') {
    // do something
    imageLink = result.info.url;
    return imageLink;
  }
});
document.getElementById('signup').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('loader1').style.display = 'block';
  document.getElementById('register').style.display = 'none';
  if (imageLink === undefined || imageLink === null || imageLink === '') {
    alert('Pls, select an image');
    document.getElementById('loader1').style.display = 'none';
    document.getElementById('register').style.display = 'block';
    return false;
  }
  const data = {
    firstname: document.getElementById('firstname').value,
    lastname: document.getElementById('lastname').value,
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    phonenumber: document.getElementById('phonenumber').value,
    passportUrl: imageLink
  };
  console.log(data);
  fetch(`${basePath}/api/v1/auth/signup`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    if (res.status !== 201) {
      return res;
    }
    return res.json();
  })
    .then((response) => {
      if (response.status === 201) {
        if (!response.data[0].token) throw ('no token in response');
        window.localStorage.setItem('user_token', response.data[0].token);
        window.localStorage.setItem('isAdmin', res.data[0].user.is_admin);
        window.location.href = './userprofile.html';
      } if (response.status === 409) {
        document.getElementById('error_message').innerHTML = 'Username or email taken';
        document.getElementById('loader1').style.display = 'none';
        document.getElementById('register').style.display = 'block';
      } else {
        document.getElementById('loader1').style.display = 'none';
        document.getElementById('register').style.display = 'block';
        document.getElementById('error_message').innerHTML = 'Something unexpected happened. Pls, try again';
      }
    })
    .catch(error => console.log('Error:', error));
});
