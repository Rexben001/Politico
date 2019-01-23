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
})