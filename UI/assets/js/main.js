document.getElementById('menu').addEventListener('click', (e) => {
    e.preventDefault();
    const nav = document.getElementById('top_menu');

    if (nav.className === 'navbar') {
        nav.className += ' responsive';
    } else {
        nav.className = 'navbar';
    }
});

