/* eslint-disable no-undef */
const basePath = 'https://politico-voting.herokuapp.com';

const getToken = () => {
  const token = window.localStorage.getItem('user_token')
  if (token) {
    return token;
  }
  return 'No token Found';
};

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

    } else if (response.status === 403) {
      window.location.href = './403.html';
    } else if (response.status === 401) {
      window.location.href = './401.html';
    }
  }).catch(error => console.log('Error:', error));


document.getElementById('edit_party').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    name: document.getElementById('party_name').value,
    hqAddress: document.getElementById('hq_address').value,
    logoUrl: 'logo.jpg'
  };
  fetch(`${basePath}/api/v1/parties/${id}/name`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${getToken()}`
    }
  }).then(res2 => res2.json())
    .then((res) => {
      if (res.status === 201) {
        window.location.href = './list_all.html';
      } else if (res.status === 404) {
        window.location.href = './404.html';
      } else if (res.status === 403) {
        window.location.href = './403.html';
      } else if (res.status === 401) {
        window.location.href = './401.html';
      }
    })
    .catch(error => console.log('Error:', error));
});
