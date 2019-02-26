/* eslint-disable no-plusplus */
/* eslint-disable require-jsdoc */
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

const vote = document.getElementById('votes');
const parties = document.getElementById('parties');
const candidate = document.getElementById('candy');
const result = document.getElementById('resulty');

const votes = document.getElementById('vote');
const pol = document.getElementById('pol');
const candidates = document.getElementById('candidates');
const results = document.getElementById('result');



document.getElementById('vote').addEventListener('click', (e) => {
  e.preventDefault();
  vote.style.display = 'block';
  parties.style.display = 'none';
  candidate.style.display = 'none';
  result.style.display = 'none';

});


document.getElementById('pol').addEventListener('click', (e) => {
  e.preventDefault();
  vote.style.display = 'none';

  parties.style.display = 'block';
  candidate.style.display = 'none';
  result.style.display = 'none';
});

document.getElementById('candidates').addEventListener('click', (e) => {
  e.preventDefault();
  vote.style.display = 'none';
  parties.style.display = 'none';
  candidate.style.display = 'block';
  result.style.display = 'none';
});

document.getElementById('resul').addEventListener('click', (e) => {
  e.preventDefault();
  vote.style.display = 'none';
  parties.style.display = 'none';
  candidate.style.display = 'none';
  result.style.display = 'block';

});

fetch(`${basePath}/api/v1/populateVote`, {
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
      document.getElementById('error_vote').innerHTML = 'No candidate has been verified by the electoral body';
    }
    if (response.status === 200) {
      const populate = document.getElementById('card');
      const { data } = response;
      let count = 1;
      let register;
      let loader;
      data.forEach((off) => {
        count = count++;
        populate.innerHTML += `<div class="card_vote"><img src="${off.passporturl}" class="candidate_img"> <p class="candidate_name" id="${off.candidate_id}">${off.firstname} ${off.lastname}</p><p>AS</p><p class="candidate_name" id="${off.office_id}">${off.offices_name}</p>
        <button type="submit" id="submit" onclick="castVote(${off.candidate_id}, ${off.office_id}, ${count})"><span id="register${count}">Vote</span> <span id="loader${count}" class="loader"><i class="fa fa-circle-o-notch fa-spin"></i>Loading</span></button></div>`;
      });
    } else if (response.status === 403) {
      window.location.href = './signin.html';
    } else if (response.status === 401) {
      window.location.href = './401.html';
    }
  })
  .catch(error => console.log('Error:', error));

const castVote = (cand, off, count) => {
  const candidateValue = Number((document.getElementById(cand)).id);
  const officeValue = Number((document.getElementById(off)).id);
  document.getElementById(`register${count}`).style.display = 'none';
  document.getElementById(`loader${count}`).style.display = 'block';
  const data = {
    office: officeValue,
    candidate: candidateValue
  };
  fetch(`${basePath}/api/v1/votes`, {
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
      if (response.status === 404) {
        document.getElementById('error_vote').innerHTML = 'No users has been created';
        document.getElementById(`register${count}`).style.display = 'block';
        document.getElementById(`loader${count}`).style.display = 'none';
      }
      if (response.status === 201) {
        document.getElementById('error_vote').innerHTML = 'Your vote has been recorded';
        document.getElementById(`register${count}`).style.display = 'block';
        document.getElementById(`loader${count}`).style.display = 'none';
        setTimeout(() => {
          window.location.href = './vote.html';
        }, 1000);
      } else if (response.status === 409) {
        document.getElementById('error_vote').innerHTML = 'You have voted for this office already';
        document.getElementById(`register${count}`).style.display = 'block';
        document.getElementById(`loader${count}`).style.display = 'none';
        setTimeout(() => {
          window.location.href = './vote.html';
        }, 1000);
      } else if (response.status === 401) {
        window.location.href = './401.html';
      }
    })
    .catch(error => console.log('Error:', error));
};

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
      document.getElementById('error_party').innerHTML = 'No party has been created';
    }
    if (response.status === 200) {
      let count = 1;
      response.data.forEach((part) => {
        document.getElementById('partiess').innerHTML += `<tr> <td>${count++}</td>
        <td><img src="${part.logourl}" id="logo_image"></td>
          <td>${part.name}</td>
          <td>${part.hqaddress}</td>
          </tr>`;
      });
    } else if (response.status === 403) {
      window.location.href = './403.html';
    } else if (response.status === 401) {
      window.location.href = './401.html';
    }
  })
  .catch(error => console.log('Error:', error));


fetch(`${basePath}/api/v1/populateVote`, {
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
      document.getElementById('error_candidate').innerHTML = 'No candidate has been verified by the electoral body';
    }
    if (response.status === 200) {
      const { data } = response;
      const populateTable = document.getElementById('candidatess');
      let count = 1;
      data.forEach((off) => {
        populateTable.innerHTML += `<tr>
        <td>${count++}</td>
        <td><img src="${off.passporturl}" id="logo_image"></td>
          <td>${off.firstname} ${off.lastname}</td>
          <td>${off.type}</td>
          <td>${off.name}</td>
        </tr>`;
      });
    } else if (response.status === 403) {
      window.location.href = './403.html';
    } else if (response.status === 401) {
      window.location.href = './401.html';
    }
  })
  .catch(error => console.log('Error:', error));


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
      document.getElementById('no-data').innerHTML = 'No party has been created';
    }
    if (response.status === 200) {
      const { data } = response;
      data.forEach((off) => {
        document.getElementById('display').innerHTML += `<table><tr><a class="oficeList" id="${off.office_id}" onclick="displayResult(${off.office_id})"> ${off.name}</a></tr></table>`;
      });
    } else if (response.status === 403) {
      window.location.href = './403.html';
    } else if (response.status === 401) {
      window.location.href = './401.html';
    }
  })
  .catch(error => console.log('Error:', error));

const displayResult = (id) => {
  fetch(`${basePath}/api/v1/office/${id}/result`, {
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
        const populateTable = document.getElementById('results');
        let count = 1;
        data.forEach((off) => {
          console.log(off);
          populateTable.innerHTML += `<tr>
        <td>${count++}</td>
        <td><img src="${off.passporturl}" id="logo_image"></td>
          <td>${off.firstname} ${off.lastname}</td>
          <td>${off.name}</td>
          <td>${off.results}</td>
          </tr>`;
        });
      } else if (response.status === 403) {
        window.location.href = './403.html';
      } else if (response.status === 401) {
        window.location.href = './401.html';
      }
    })
    .catch(error => console.log('Error:', error));
};
