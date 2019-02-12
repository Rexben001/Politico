/* eslint-disable no-undef */

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
  console.log((data.passportUrl));
  fetch('/api/v1/auth/signup', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(response => {
      if (response.status === 201) {
        console.log(response);
        // redirect: window.location.replace("../signup.html")
      } else {
        console.log('Invalid user');
      }
    })
    .catch(error => console.log('Error:', error));
});

// function selectedField(e) {
//   const file = e.target.files;
//   const reader = new FileReader();

//   reader.onload = function (event) {
//     return event.target.result;
//   }
//   return reader.readAsDataURL(file[0]);
// }

