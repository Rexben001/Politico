/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const basePath = 'https://politico-voting.herokuapp.com';
// const basePath = "http://localhost:8080"
const getToken = () => {
  const token = window.localStorage.getItem('user_token')
  if (token) {
    return token;
  }
  window.location.href = './signin.html';
};
let imageLink;
cloudinary.applyUploadWidget('#upload_widget_opener', {
  cloudName: 'rexben',
  uploadPreset: 'lcxc1pn1',
}, (error, result) => {
  if (result && result.event === 'success') {
    imageLink = result.info.url;
    return imageLink;
  }
});

fetch(`${basePath}/api/v1/users/profile`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`
  }
}).then((res) => {
  if (res.status === 404) {
    return res;
  }
  return res.json();
})
  .then((response) => {
    if (response.status === 404) {
    }
    if (response.status === 200) {
      console.log(response);
      document.getElementById('firstname').value = response.data.firstname;
      document.getElementById('lastname').value = response.data.lastname;
    } else if (response.status === 403) {
      window.location.href = './403.html';
    } else if (response.status === 401) {
      window.location.href = './401.html';
    }
  })
  .catch(error => console.log('Error:', error));

document.getElementById('edit_profile').addEventListener('submit', (e) => {
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
    passportUrl: imageLink
  };
  fetch(`${basePath}/api/v1/editprofile`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${getToken()}`
    }
  }).then((res2) => {
    if (res2.status !== 201) {
      return res2;
    }
    return res2.json();
  }).then((res) => {
    if (res.status === 201) {
      window.location.href = './userprofile.html';
    } else if (res.status === 404) {
      window.location.href = './404.html';
    }
  })
    .catch(error => console.log('Error:', error));
});
