/* eslint-disable camelcase */
/* eslint-disable no-undef */
const basePath = 'https://politico-voting.herokuapp.com';
// const basePath = "http://localhost:8080";

let imageLink;
cloudinary.applyUploadWidget('#upload_widget_opener', {
  cloudName: 'rexben',
<<<<<<< HEAD:assets/js/signup.js
  uploadPreset: 'lcxc1pn1'
=======
  uploadPreset: 'lcxc1pn1',
  cropping: true,
>>>>>>> ft-save-images-cloudinary-164051322:UI/assets/js/signup.js
}, (error, result) => {
  if (result && result.event === 'success') {
    // do something
    imageLink = result.info.url;
    return imageLink;
  }
})
document.getElementById('signup').addEventListener('submit', (e) => {
  e.preventDefault();
<<<<<<< HEAD:assets/js/signup.js
  uploadWidget.open();

  console.log('Hey');
=======
>>>>>>> ft-save-images-cloudinary-164051322:UI/assets/js/signup.js
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
        window.location.href = './userprofile.html';
      } else {
        console.log(response);
      }
    })
    .catch(error => console.log('Error:', error));
});
