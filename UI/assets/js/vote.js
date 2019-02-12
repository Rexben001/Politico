/* eslint-disable no-plusplus */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// document.getElementById('office').addEventListener('change', (e) => {
//   e.preventDefault();
//   const val = document.getElementById('office');
//   const newVal = val.options[val.selectedIndex].value;
//   const populate = document.getElementById('disabled');
//   if (newVal == 'pre') {
//     populate.innerHTML += `<option value='buh'>Mohammed Buhari</option>
//         <option value='ati'>Atiku Abubakar</option><br>
//         <option value='sow'>James Sowore</option><br>
//         <option value='obi'>Oby Ezekweseli</option><br>
//         <option value='mog'>Ali Moghalu</option>`
//   }
//   else if (newVal == 'sen') {
//     populate.innerHTML += `<option value='dino'>Dino Melaye</option>
//         <option value='tin'>Oluremi Tinubu</option><br>
//         <option value='sara'>Saraki Danjuma</option><br>
//         <option value='ekwe'>Ekweremadu James</option><br>
//         <option value='femi'>Femi Gbajamila</option>`
//   }
//   else if (newVal == 'hop') {
//     populate.innerHTML += `<option value='dino'>Sadiq Ibrahim</option>
//         <option value='tin'>Samuel Ikon</option><br>
//         <option value='sara'>Owoidighe Ekpoatai</option><br>
//         <option value='ekwe'>Okon Michael</option><br>`
//   }
//   else if (newVal == 'gov') {
//     populate.innerHTML += `<option value='dino'>Okezie Ikpeazu</option>
//         <option value='tin'>Bindo Jibrilla</option><br>
//         <option value='sara'>Udom Gabriel Emmanuel</option><br>
//         <option value='ekwe'>Willie Obiano</option><br>
//         <option value='femi'>Henry Dickson</option>`
//   }
//   else if (newVal == 'lgc') {
//     populate.innerHTML += `<option value='dino'>Ndumati E.Lawson Ndu</option>
//         <option value='tin'>John Naale</option><br>
//         <option value='sara'>Timothy E. Nsirim</option><br>
//         <option value='ekwe'>L.W. Chukwu</option><br>
//         <option value='femi'>Adeniji Jones</option>`
//   }
// });

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


const getToken = () => {
  const token = window.localStorage.getItem('user_token')
  if (token) {
    return token;
  }
  return 'No token Found';
};


fetch('/api/v1/populateVote', {
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
      const populate = document.getElementById('office');
      const populate2 = document.getElementById('candidate');

      data.forEach((off) => {
        populate.innerHTML += `<option id=${off.office_id}>${off.name}, ${off.type}</option>`;
        populate2.innerHTML += `<option id=${off.candidate_id}>${off.firstname}, ${off.lastname}</option>`;

      });
    } else if (response.status === 403) {
      window.location.href = '../403.html';
    } else if (response.status === 401) {
      window.location.href = '../401.html';
    }
  })
  .catch(error => console.log('Error:', error));


let candidateValue;
let officeValue;
function onVal() {
  const off = document.getElementById('office');
  const office = off.options[off.selectedIndex].id;
  officeValue = Number(office);
}

function onVal2() {
  const cand = document.getElementById('candidate');
  const candy = cand.options[cand.selectedIndex].id;
  candidateValue = Number(candy);
}
document.getElementById('voting').addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(candidateValue, officeValue);

  const data = {
    office: officeValue,
    candidate: candidateValue
  };
  fetch('/api/v1/votes', {
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
        window.location.href = '../vote.html';
      } else if (response.status === 403) {
        window.location.href = '../403.html';
      } else if (response.status === 401) {
        window.location.href = '../401.html';
      }
    })
    .catch(error => console.log('Error:', error));
});

fetch('/api/v1/parties', {
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
      let count = 1;
      response.data.forEach((part) => {
        document.getElementById('partiess').innerHTML += `<tr><td>${count++}</td>
          <td>${part.name}</td>
          <td>${part.hqaddress}</td>
          <td>${part.logourl}</td></tr>`;
      });
    } else if (response.status === 403) {
      window.location.href = '../403.html';
    } else if (response.status === 401) {
      window.location.href = '../401.html';
    }
  })
  .catch(error => console.log('Error:', error));


fetch('/api/v1/populateVote', {
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
      const populateTable = document.getElementById('candidatess');
      let count = 1;
      data.forEach((off) => {
        populateTable.innerHTML += `<tr>
        <td>${count++}</td>
        <td>${off.firstname} ${off.lastname}</td>
        <td>${off.type}</td>
        <td>${off.name}</td>
        </tr>`;
      });
    } else if (response.status === 403) {
      window.location.href = '../403.html';
    } else if (response.status === 401) {
      window.location.href = '../401.html';
    }
  })
  .catch(error => console.log('Error:', error));


fetch('/api/v1/offices', {
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
        document.getElementById('display').innerHTML += `<a class="oficeList" id="${off.office_id}" onclick="displayResult(${off.office_id})">${off.name}</a>`;
      });
    } else if (response.status === 403) {
      window.location.href = '../403.html';
    } else if (response.status === 401) {
      window.location.href = '../401.html';
    }
  })
  .catch(error => console.log('Error:', error));

const displayResult = (id) => {
  console.log('Worker')
  fetch(`/api/v1/office/${id}/result`, {
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
          populateTable.innerHTML += `<tr>
          <td>${count++}</td>
          <td>${off.office}</td>
          <td>${off.candidate}</td>
          <td>${off.result}</td>
          </tr>`;
        });
      } else if (response.status === 403) {
        window.location.href = '../403.html';
      } else if (response.status === 401) {
        window.location.href = '../401.html';
      }
    })
    .catch(error => console.log('Error:', error));
};
