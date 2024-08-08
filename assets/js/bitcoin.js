async function fetchBitcoinData() {
    const url = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=200'; // Últimos 200 dias
    const response = await fetch(url);
    const data = await response.json();
    return data.prices;
}

async function fetchBitcoinCurrentPrice() {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'; // Valor atual
    const response = await fetch(url);
    const data = await response.json();
    return data.bitcoin.usd;
}

function calculate200DMA(prices) {
    const sum = prices.reduce((acc, price) => acc + price[1], 0);
    const average = sum / prices.length;
    return average;
}

async function main() {
    const bodyColor = document.querySelector('body');
    const prices = await fetchBitcoinData();
    const movingAverage = calculate200DMA(prices);
    const currentPrice = await fetchBitcoinCurrentPrice();
    const mayerMultiple = currentPrice / movingAverage;

    document.querySelector('#moving-average').textContent = movingAverage.toFixed(2) + ' USD';
    document.querySelector('#current-price').textContent = currentPrice.toFixed(2) + ' USD';
    document.querySelector('#mayer-multiple').textContent = mayerMultiple.toFixed(2);

    if (mayerMultiple > 1) {
        bodyColor.classList.add('violet');
        bodyColor.classList.remove('green');
    } else {
        bodyColor.classList.add('green');
        bodyColor.classList.remove('violet');
    }
}

function update() {
    document.querySelector('button').addEventListener('click', );
}

main();