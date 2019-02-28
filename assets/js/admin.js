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

getToken();


fetch(`${basePath}/api/v1/users`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`
  }
}).then((res) => {
  if (res.status !== 200) {
    return res;
  }
  return res.json();
})
  .then((response) => {
    if (response.status === 401) {
      window.location.href = './401.html';
    }
  })
  .catch(error => console.log('Error:', error));
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


document.getElementById('office').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('loader1').style.display = 'block';
  document.getElementById('register').style.display = 'none';
  const data = {
    name: document.getElementById('office-name').value,
    type: document.getElementById('type').value,
  }

  fetch(`${basePath}/api/v1/offices`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${getToken()}`
    }
  }).then((res) => {
    if (res.status !== 201) {
      return res;
    }
    return res.json();
  })
    .then((response) => {
      if (response.status === 201) {
        document.getElementById('office-name').value = '';
        document.getElementById('type').value = '';
        document.getElementById('office_message').innerHTML = 'Office successfully created';
<<<<<<< HEAD:assets/js/admin.js
        window.location.href = './list_all.html';
=======
        setTimeout(() => {
          window.location.href = './list_all.html';
        }, 1000);
>>>>>>> ft-feedback-message-164257823:UI/assets/js/admin.js
      } if (response.status === 409) {
        document.getElementById('office_message').innerHTML = 'Office has been created already';
        document.getElementById('loader1').style.display = 'none';
        document.getElementById('register').style.display = 'block';
      } else {
        document.getElementById('loader1').style.display = 'none';
        document.getElementById('register').style.display = 'block';
        document.getElementById('office_message').innerHTML = 'Something unexpected happened. Pls, try again';
      }
    })
    .catch(error => console.log('Error:', error));
});


document.getElementById('party').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('loader2').style.display = 'block';
  document.getElementById('register2').style.display = 'none';
  if (imageLink === undefined || imageLink === null || imageLink === '') {
    alert('Pls, select an image');
    document.getElementById('loader2').style.display = 'none';
    document.getElementById('register2').style.display = 'block';
    return false;
  }
  const data = {
    name: document.getElementById('party-name').value,
    hqAddress: document.getElementById('hq_address').value,
    logoUrl: imageLink
  }

  fetch(`${basePath}/api/v1/parties`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${getToken()}`
    }
  }).then((res) => {
    if (res.status !== 201) {
      return res;
    }
    return res.json();
  })
    .then((response) => {
      if (response.status === 201) {
        document.getElementById('party_message').innerHTML = 'Party was created successfully';
        setTimeout(() => {
          window.location.href = './list_all.html';
        }, 1000);
      } if (response.status === 409) {
        document.getElementById('party_message').innerHTML = 'Party has been created already';
        document.getElementById('loader2').style.display = 'none';
        document.getElementById('register2').style.display = 'block';
      } else {
        document.getElementById('loader2').style.display = 'none';
        document.getElementById('register2').style.display = 'block';
        document.getElementById('party_message').innerHTML = 'Something unexpected happened. Pls, try again';
      }
    })
    .catch(error => console.log('Error:', error));
});
