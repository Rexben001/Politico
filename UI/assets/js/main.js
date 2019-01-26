document.getElementById('menu').addEventListener('click', (e) => {
    e.preventDefault();
    const nav = document.getElementById('top_menu');
    console.log('Working');

    if (nav.className === 'navbar') {
        nav.className += ' responsive';
    } else {
        nav.className = 'navbar';
    }
});


const logout = () => {
    window.location.href = './signin.html';
}