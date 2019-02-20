/* eslint-disable no-undef */
const basePath = 'https://politico-voting.herokuapp.com';
// const basePath = "http://localhost:8080"
const getToken = () => {
  const token = window.localStorage.getItem('user_token')
  if (token) {
    console.log(token);
    return token;
  }
  console.log('No token')
  window.location.href = './signin.html';
};

getToken();

let imageLink;
cloudinary.applyUploadWidget('#upload_widget_opener', {
  cloudName: 'rexben',
  uploadPreset: 'lcxc1pn1',
}, (error, result) => {
  if (result && result.event === 'success') {
    imageLink = result.info.url;
    return imageLink;
  }
})

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
  }).then(res => res.json())
    .then((response) => {
      if (response.status === 201) {
        document.getElementById('office-name').value = '';
        document.getElementById('type').value = '';
        document.getElementById('office_message').innerHTML = 'Office successfully created';
        document.getElementById('loader1').style.display = 'none';
        document.getElementById('register').style.display = 'block';
      } else if (response.status === 403) {
        window.location.href = './403.html';
      } else if (response.status === 401) {
        window.location.href = './401.html';
      }
    })
    .catch(error => console.log('Error:', error));
});


document.getElementById('party').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('loader2').style.display = 'block';
  document.getElementById('register2').style.display = 'none';

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
  }).then(res => res.json())
    .then((response) => {
      if (response.status === 201) {
        document.getElementById('party-name').value = '';
        document.getElementById('hq_address').value = '';
        document.getElementById('passport').value = '';
        document.getElementById('loader2').style.display = 'none';
        document.getElementById('register2').style.display = 'block';
      } else if (response.status === 403) {
        window.location.href = './403.html';
      } else if (response.status === 401) {
        window.location.href = './401.html';
      }
    })
    .catch(error => console.log('Error:', error));
});
