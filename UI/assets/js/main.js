document.getElementById('menu').addEventListener('click', (e) => {
    e.preventDefault();
    const nav = document.getElementById('top_menu');

    if (nav.className === 'navbar') {
        nav.className += ' responsive';
        console.log(133);
    } else {
        nav.className = 'navbar';
    }
});

const quotes = [
    {
        quote: 'What is a man',
        author: '~ Me'
    },
    {
        quote: 'Joy to the world',
        author: '~ Me2'
    },
    {
        quote: 'Thompson Jones John',
        author: '~ Meqq'
    },
    {
        quote: 'What is a man2',
        author: '~ Med'
    },
    {
        quote: 'What is a man4',
        author: '~ we'
    }
];




setInterval(() => {
    const rand = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quotes').innerHTML = rand.quote;
    document.getElementById('author').innerHTML = rand.author;
}, 100000);
