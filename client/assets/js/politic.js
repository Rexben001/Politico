/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable no-undef */
const basePath = 'https://politico-voting.herokuapp.com';
// const basePath = 'http://localhost:8080';

const expresss = document.getElementById('express');
const petition = document.getElementById('petition');

const expresssForm = document.getElementById('expressForm');
const petitionForm = document.getElementById('petitionForm');

expresss.addEventListener('click', (e) => {
  e.preventDefault();
  expresssForm.style.display = 'block';
  petitionForm.style.display = 'none';
});

petition.addEventListener('click', (e) => {
  e.preventDefault();
  expresssForm.style.display = 'none';
  petitionForm.style.display = 'block';
});

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

fetch(`${basePath}/api/v1/offices`, {
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
      document.getElementById('no-data').innerHTML = 'No users has been created';
    }
    if (response.status === 200) {
      const { data } = response;
      const populate = document.getElementById('offices');
      data.forEach((off) => {
        populate.innerHTML += `<option id="${off.office_id}"> ${off.name}, ${off.type}</option>`;
      });
    } else if (response.status === 403) {
      window.location.href = './signin.html';
    } else if (response.status === 401) {
      window.location.href = './401.html';
    }
  })
  .catch(error => console.log('Error:', error));

fetch(`${basePath}/api/v1/parties`, {
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
      document.getElementById('no-data').innerHTML = 'No users has been created'
    }
    if (response.status === 200) {
      const { data } = response;
      const populate = document.getElementById('party');
      data.forEach((part) => {
        populate.innerHTML += `<option id="${part.party_id}">${part.name}</option>`;
      });
    } else if (response.status === 403) {
      window.location.href = './signin.html';
    } else if (response.status === 401) {
      window.location.href = './401.html';
    }
  })
  .catch(error => console.log('Error:', error));

let partyValue;
let officeValue;
function onVal() {
  const off = document.getElementById('offices');
  const office = off.options[off.selectedIndex].id;
  officeValue = Number(office);
}

function onVal2() {
  const part = document.getElementById('party');
  const party = part.options[part.selectedIndex].id;
  partyValue = Number(party);
}

document.getElementById('register').addEventListener('submit', (e) => {
  e.preventDefault();

  document.getElementById('loader1').style.display = 'block';
  document.getElementById('register1').style.display = 'none';
  const data = {
    office: officeValue,
    party: partyValue
  };
  fetch(`${basePath}/api/v1/office/register`, {
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
      console.log(response);
      if (response.status === 404) {
        // document.getElementById('no-data').innerHTML = 'No users has been created';
      }
      if (response.status === 201) {
        document.getElementById('error_politics').innerHTML = 'Application successful';
        setTimeout(() => {
          window.location.href = './politics.html';
        }, 2000);
      } else if (response.status === 409) {
        document.getElementById('error_politics').innerHTML = 'You can only register once || Party has been registered';
        setTimeout(() => {
          window.location.href = './politics.html';
        }, 2000);
      } else if (response.status === 401) {
        window.location.href = './401.html';
      }
    })
    .catch(error => console.log('Error:', error));
});
let officeValue2;
function onVal3() {
  const off = document.getElementById('offices2');
  const office = off.options[off.selectedIndex].id;
  officeValue2 = Number(office);
}

document.getElementById('contestForm').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('loader2').style.display = 'block';
  document.getElementById('register2').style.display = 'none';
  const data = {
    office: officeValue2,
    evidence: imageLink,
    bodyValue: document.getElementById('makePetition').value
  }
  fetch(`${basePath}/api/v1/petitions`, {
    method: 'POST',
    body: JSON.stringify(data),
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
        document.getElementById('no-data').innerHTML = 'No users has been created';
      }
      if (response.status === 201) {
        document.getElementById('error_petitions').innerHTML = 'Petitions created';
        setTimeout(() => {
          window.location.href = './politics.html';
        }, 1000);
      } else {
        document.getElementById('error_petitions').innerHTML = 'Something unexpected happened. Try again';
      }
    })
    .catch(error => console.log('Error:', error));
});

fetch(`${basePath}/api/v1/offices`, {
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
    console.log(response);
    if (response.status === 404) {
      document.getElementById('no-data').innerHTML = 'No users has been created';
    }
    if (response.status === 200) {
      const { data } = response;
      const populate = document.getElementById('offices2');
      data.forEach((off) => {
        populate.innerHTML += `<option id=${off.office_id}> ${off.name}, ${off.type}</option> `;
      });
    } else if (response.status === 403) {
      window.location.href = './403.html';
    } else if (response.status === 401) {
      window.location.href = './401.html';
    }
  })
  .catch(error => console.log('Error:', error));
