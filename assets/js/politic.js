/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable no-undef */
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
  return 'No token Found';
};
const basePath = 'https://politico-voting.herokuapp.com';

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
        populate.innerHTML += `< option id = ${off.office_id} > ${off.name}, ${off.type}</option > `;
      });
    } else if (response.status === 403) {
      window.location.href = './403.html';
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
        populate.innerHTML += `< option id = "${part.party_id}" > ${part.name}</option > `;
      });
    } else if (response.status === 403) {
      window.location.href = './403.html';
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
        console.log('Worked');
      } else if (response.status === 403) {
        window.location.href = './403.html';
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
  const data = {
    office: officeValue2,
    evidence: document.getElementById('evidence').value,
    bodyValue: document.getElementById('makePetition').value
  }
  console.log(data.office);
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
        console.log('Worked');
      } else if (response.status === 403) {
        window.location.href = './403.html';
      } else if (response.status === 401) {
        window.location.href = './401.html';
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
    if (response.status === 404) {
      document.getElementById('no-data').innerHTML = 'No users has been created';
    }
    if (response.status === 200) {
      const { data } = response;
      const populate = document.getElementById('offices2');
      data.forEach((off) => {
        populate.innerHTML += `< option id = ${off.office_id} > ${off.name}, ${off.type}</option > `;
      });
    } else if (response.status === 403) {
      window.location.href = './403.html';
    } else if (response.status === 401) {
      window.location.href = './401.html';
    }
  })
  .catch(error => console.log('Error:', error));
