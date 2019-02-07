const quotes = [
    {
        quote: `"Leadership is not about the next election, it's about the next generation."`,
        author: '~ Simon Sinek'
    },
    {
        quote: `"A politician thinks of the next election. A statesman, of the next generation."`,
        author: '~ James Freeman Clarke'
    },
    {
        quote: `"Democracy is not just an election, it is our daily life."`,
        author: '~ Tsai Ing-wen'
    }
];


setInterval(() => {
    const rand = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quotes').innerHTML = rand.quote;
    document.getElementById('author').innerHTML = rand.author;
}, 10000);