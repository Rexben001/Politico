
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const basePath = 'https://politico-voting.herokuapp.com';
const getToken = () => {
  const token = window.localStorage.getItem('user_token')
  if (token) {
    return token;
  }
  window.location.href = './signin.html';
};

const isAdmin = window.localStorage.getItem('isAdmin');
if (isAdmin !== 'true') {
  const width = window.screen.width || document.documentElement.clientWidth || document.body.clientWidth;
  if (width < 1200) {
    document.getElementById('admin').style.display = 'none';
    document.getElementById('allparties').style.display = 'none';
  } else if (width > 1200) {
    document.getElementById('admin').style.visibility = 'hidden';
    document.getElementById('allparties').style.visibility = 'hidden';
  }
}

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
      document.getElementById('error_candidate').innerHTML = 'You have not casted any votes';
    }
    if (response.status === 200) {
      const { data } = response;
      document.getElementById('tottal_votes').innerHTML = data.total_no;
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
      document.getElementById('list_all').innerHTML = 'No candidate has been created';
    }
    if (response.status === 200) {
      const { data } = response;
      let count = 1;
      data.forEach((off) => {
        console.log(off);
        document.getElementById('list_all').innerHTML += `<tr><td>${count++}</td>
        <td>${off.name}</td>
        <td>${off.firstname} ${off.lastname}</td></tr>`;
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
      console.log(response);
      document.getElementById('email').innerHTML = response.data.email;
      document.getElementById('username').innerHTML = response.data.username;
      document.getElementById('profile_img').src = response.data.passporturl;
    } else if (response.status === 403) {
      window.location.href = './403.html';
    } else if (response.status === 401) {
      window.location.href = './401.html';
    }
  })
  .catch(error => console.log('Error:', error));

const editProfile = () => {
  window.location.href = './editProfile.html';
}