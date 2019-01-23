document.getElementById('office').addEventListener('change', (e) => {
    e.preventDefault();
    const val = document.getElementById('office');
    const newVal = val.options[val.selectedIndex].value;
    if (newVal == 'pre') {
        const populate = document.getElementById('disabled');
        populate.innerHTML += `&nbsp;<option value='buh'>Mohammed Buhari</option>&nbsp;
        <option value='ati'>Atiku Abubakar</option><br>
        <option value='sow'>James Sowore</option><br>
        <option value='obi'>Oby Ezekweseli</option><br>
        <option value='mog'>Ali Moghalu</option>`
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

// const showHide = (vote, votes, party, can) => {
//     document.getElementById(votes).addEventListener('click', () => {

//         vote.style.display = 'block';
//         party.style.display = 'none';
//         can.style.display = 'none';
//     });

// }
// showHide(vote, votes, parties, candidate);
// showHide(parties, pol, vote, candidate);