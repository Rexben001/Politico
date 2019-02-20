/* eslint-disable camelcase */
/* eslint-disable no-undef */
const basePath = 'https://politico-voting.herokuapp.com';
// const basePath = "http://localhost:8080";

let imageLink;
cloudinary.applyUploadWidget('#upload_widget_opener', {
  cloudName: 'rexben',
  uploadPreset: 'lcxc1pn1',
  cropping: true,
}, (error, result) => {
  if (result && result.event === 'success') {
    // do something
    imageLink = result.info.url;
    return imageLink;
  }
})
document.getElementById('signup').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('loader1').style.display = 'block';
  document.getElementById('register').style.display = 'none';
  if (imageLink === 'undefined' || imageLink === 'null' || imageLink === '') {
    alert('Pls, select an image');
  }
  const data = {
    firstname: document.getElementById('firstname').value,
    lastname: document.getElementById('lastname').value,
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    othernames: 'Benson',
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
  }).then(res => res.json())
    .then((response) => {
      if (response.status === 201) {
        if (!res.data[0].token) throw ('no token in response');
        window.localStorage.setItem('user_token', res.data[0].token);
        window.location.href = './userprofile.html';
      } else {
        console.log(response);
        document.getElementById('loader1').style.display = 'none';
        document.getElementById('register').style.display = 'block';
      }
    })
    .catch(error => console.log('Error:', error));
});
