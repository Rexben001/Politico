document.getElementById('menu').addEventListener('click', (e) => {
    e.preventDefault();
    const nav = document.getElementById('top_menu');
    const menu = document.getElementById('menu');

    if (nav.className === 'navbar') {
        nav.className += ' responsive';
        menu.innerHTML = 'X'

    } else {
        nav.className = 'navbar';
        menu.innerHTML = '&#9776;'
    }
});


const logout = () => {
    window.location.href = './signin.html';
}