/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const getToken = () => {
  const token = window.localStorage.getItem('user_token')
  if (token) {
    return token;
  }
  return 'No token Found';
};

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
      document.getElementById('no-data').innerHTML = 'No party has been created'
    }
    if (response.status === 200) {
      const { data } = response;
      let count = 1;
      data.forEach((off) => {
        document.getElementById('offices').innerHTML += `<tr><td>${count++}</td>
        <td>${off.type}</td>
        <td>${off.name}</td>
        <td><a href="#" id="editLo" class="edit">Edit</a></td>
        <td><a href="#" class="delete" id="del">Delete</a></td></tr>`;
      });
    } else if (response.status === 403) {
      window.location.href = '../403.html';
    } else if (response.status === 401) {
      window.location.href = '../401.html';
    }
  })
  .catch(error => console.log('Error:', error));


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
      document.getElementById('no-data').innerHTML = 'No party has been created'
    }
    if (response.status === 200) {
      let count = 1;
      response.data.forEach((part) => {
        document.getElementById('parties').innerHTML += `<tr><td>${count++}</td>
          <td>${part.name}</td>
          <td>${part.hqaddress}</td>
          <td>${part.logourl}</td>
          <td><a href="#" onclick="editFile(${part.party_id})" id="editLo" class="edit">Edit</a></td>
          <td><a href="#" class="delete" onclick="deleteFile(${part.party_id})" id="del">Delete</a></td></tr>`
      })
    } else if (response.status === 403) {
      window.location.href = '../403.html';
    } else if (response.status === 401) {
      window.location.href = '../401.html';
    }
  })
  .catch(error => console.log('Error:', error));

const editFile = (id) => {
  window.location.href = `../editparties.html?party_id=${id}`;
};

const deleteFile = (id) => {
  fetch(`/api/v1/parties/${id}`, {
    method: 'DELETE',
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
        console.log(404);
      }
      if (response.status === 200) {
        window.location.href = '../list_all.html'
      } else if (response.status === 403) {
        window.location.href = '../403.html';
      } else if (response.status === 401) {
        window.location.href = '../401.html';
      }
    })
    .catch(error => console.log('Error:', error));
};

fetch('/api/v1/candidates', {
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
      document.getElementById('no-data3').innerHTML = 'No candidate has been created';
    }
    if (response.status === 200) {
      const { data } = response;
      let count = 1;
      console.log(data);
      data.forEach((cand) => {
        document.getElementById('candidate').innerHTML += `<tr><td>${count++}</td>
        <td>${cand.firstname} ${cand.lastname}</td>
        <td>${cand.name}</td>
        <td>${cand.party}</td>
        <td><a href="#" id="editLo" onclick="acceptIt(${cand.candidate_id})" class="edit">Accept</a></td>`;
      });
    } else if (response.status === 403) {
      window.location.href = '../403.html';
    } else if (response.status === 401) {
      window.location.href = '../401.html';
    }
  })
  .catch(error => console.log('Error:', error));

const acceptIt = (id) => {
  console.log(id);
  fetch(`/api/v1/office/${id}/register`, {
    method: 'POST',
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
      if (response.status === 404) {
        document.getElementById('no-data3').innerHTML = 'No party has been created';
      }
      if (response.status === 201) {
        window.location.href = '../list_all.html';
      } else if (response.status === 403) {
        window.location.href = '../403.html';
      } else if (response.status === 401) {
        window.location.href = '../401.html';
      }
    })
    .catch(error => console.log('Error:', error));
};

