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
    console.log(123);
});