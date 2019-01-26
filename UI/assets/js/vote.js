document.getElementById('office').addEventListener('change', (e) => {
    e.preventDefault();
    const val = document.getElementById('office');
    const newVal = val.options[val.selectedIndex].value;
    const populate = document.getElementById('disabled');
    if (newVal == 'pre') {
        populate.innerHTML += `<option value='buh'>Mohammed Buhari</option>
        <option value='ati'>Atiku Abubakar</option><br>
        <option value='sow'>James Sowore</option><br>
        <option value='obi'>Oby Ezekweseli</option><br>
        <option value='mog'>Ali Moghalu</option>`
    }
    else if (newVal == 'sen') {
        populate.innerHTML += `<option value='dino'>Dino Melaye</option>
        <option value='tin'>Oluremi Tinubu</option><br>
        <option value='sara'>Saraki Danjuma</option><br>
        <option value='ekwe'>Ekweremadu James</option><br>
        <option value='femi'>Femi Gbajamila</option>`
    }
    else if (newVal == 'hop') {
        populate.innerHTML += `<option value='dino'>Sadiq Ibrahim</option>
        <option value='tin'>Samuel Ikon</option><br>
        <option value='sara'>Owoidighe Ekpoatai</option><br>
        <option value='ekwe'>Okon Michael</option><br>`
    }
    else if (newVal == 'gov') {
        populate.innerHTML += `<option value='dino'>Okezie Ikpeazu</option>
        <option value='tin'>Bindo Jibrilla</option><br>
        <option value='sara'>Udom Gabriel Emmanuel</option><br>
        <option value='ekwe'>Willie Obiano</option><br>
        <option value='femi'>Henry Dickson</option>`
    }
    else if (newVal == 'lgc') {
        populate.innerHTML += `<option value='dino'>Ndumati E.Lawson Ndu</option>
        <option value='tin'>John Naale</option><br>
        <option value='sara'>Timothy E. Nsirim</option><br>
        <option value='ekwe'>L.W. Chukwu</option><br>
        <option value='femi'>Adeniji Jones</option>`
    }
});

const vote = document.getElementById('votes');
const parties = document.getElementById('parties');
const candidate = document.getElementById('candy');

const votes = document.getElementById('vote');
const pol = document.getElementById('pol');
const candidates = document.getElementById('candidates');



document.getElementById('vote').addEventListener('click', (e) => {
    e.preventDefault();
    vote.style.display = 'block';
    parties.style.display = 'none';
    candidate.style.display = 'none';
});


document.getElementById('pol').addEventListener('click', (e) => {
    e.preventDefault();
    vote.style.display = 'none';
    parties.style.display = 'block';
    candidate.style.display = 'none';
});

document.getElementById('candidates').addEventListener('click', (e) => {
    e.preventDefault();
    vote.style.display = 'none';
    parties.style.display = 'none';
    candidate.style.display = 'block';
});
