document.getElementById('office').addEventListener('change', (e) => {
    e.preventDefault();
    const val = document.getElementById('office');
    const newVal = val.options[val.selectedIndex].value;
    if (newVal == 'pre') {
        const populate = document.getElementById('disabled');
        populate.innerHTML += `<option id='buh'>Mohammed Buhari</option><br>
        <option id='ati'>Atiku Abubakar</option><br>
        <option id='sow'>James Sowore</option><br>
        <option id='obi'>Oby Ezekweseli</option><br>
        <option id='mog'>Ali Moghalu</option>`
    }
})