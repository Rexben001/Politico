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
fetch(`${basePath}/api/v1/votes/user`, {
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
      // document.getElementById('no-data3').innerHTML = 'No candidate has been created';
      console.log('Not');
    }
    if (response.status === 200) {
      const { data } = response;
      console.log(response.passport);
      document.getElementById('tottal_votes').innerHTML = data.total_no;
      document.getElementById('email').innerHTML = response.email;
      document.getElementById('username').innerHTML = response.username;
      document.getElementById('profile_img').src = response.passport;
      console.log(document.getElementById('profile_img'));
    } else if (response.status === 403) {
      window.location.href = './403.html';
    } else if (response.status === 401) {
      window.location.href = './401.html';
    }
  })
  .catch(error => console.log('Error:', error));


fetch(`${basePath}/api/v1/votes/offices&candidates`, {
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
      // document.getElementById('no-data3').innerHTML = 'No candidate has been created';
    }
    if (response.status === 200) {
      const { data } = response;
      let count = 1;
      data.forEach((off) => {
        console.log(off);
        document.getElementById('list_all').innerHTML += `<tr><td>${count++}</td>
        <td>${off.office}</td>
        <td>${off.candidate}</td>
        <td><a href="#" id="editLo" class="edit">Edit</a></td>
        <td><a href="#" class="delete" id="del">Delete</a></td></tr>`;
      });
    } else if (response.status === 403) {
      window.location.href = './signin.html';
    } else if (response.status === 401) {
      window.location.href = './401.html';
    }
  })
  .catch(error => console.log('Error:', error));

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
      // document.getElementById('no-data3').innerHTML = 'No candidate has been created';
    }
    if (response.status === 200) {
      // console.log(response);
      document.getElementById('email').innerHTML = response.email;
      document.getElementById('username').innerHTML = response.username;
      document.getElementById('profile_img').src = response.passport;
    } else if (response.status === 403) {
      window.location.href = './403.html';
    } else if (response.status === 401) {
      window.location.href = './401.html';
    }
  })
  .catch(error => console.log('Error:', error));
