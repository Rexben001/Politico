/* eslint-disable no-undef */
const basePath = 'https://politico-voting.herokuapp.com';

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
    console.log('Hey');
    if (response.status === 401) {
      window.location.href = './401.html';
    }
  })
  .catch(error => console.log('Error:', error));

const id = Number(window.location.href.split('=')[1]);

fetch(`${basePath}/api/v1/parties/${id}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${getToken()}`
  }
}).then(res => {
  if (res.status === 404) {
    return res;
  }
  return res.json();
})
  .then((response) => {
    if (response.status === 404) {
      window.location.href = './404.html';
    }
    if (response.status === 200) {
      document.getElementById('party_name').value = response.data.name;
      document.getElementById('hq_address').value = response.data.hqaddress;

    } else {
      document.getElementById('edit_message').innerHTML = 'Something unexpected happened. Pls, refresh this page';
    }
  }).catch(error => console.log('Error:', error));


document.getElementById('edit_party').addEventListener('submit', (e) => {
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
    name: document.getElementById('party_name').value,
    hqAddress: document.getElementById('hq_address').value,
    logoUrl: imageLink
  };
  fetch(`${basePath}/api/v1/parties/${id}/name`, {
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
      window.location.href = './list_all.html';
    } else {
      document.getElementById('edit_message').innerHTML = 'Something unexpected happened. Pls, try again';
      document.getElementById('loader1').style.display = 'none';
      document.getElementById('register').style.display = 'block';
    }
  })
    .catch(error => console.log('Error:', error));
});
