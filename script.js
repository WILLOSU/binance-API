const ws = new WebSocket('wss://seu-servidor-no-render.com');

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    const topGainersList = document.getElementById('top-gainers');
    topGainersList.innerHTML = '';
    data.topGainers.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.symbol}: +${item.change.toFixed(2)}%`;
        topGainersList.appendChild(li);
        li.classList.add('updated'); // Adiciona a classe 'updated'
        setTimeout(() => {
            li.classList.remove('updated'); // Remove a classe 'updated' após 1 segundo
        }, 1000);
    });

    const topLosersList = document.getElementById('top-losers');
    topLosersList.innerHTML = '';
    data.topLosers.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.symbol}: ${item.change.toFixed(2)}%`;
        topLosersList.appendChild(li);
        li.classList.add('updated'); // Adiciona a classe 'updated'
        setTimeout(() => {
            li.classList.remove('updated'); // Remove a classe 'updated' após 1 segundo
        }, 1000);
    });

    if (data.resetCountdown) {
        resetCountdown();
    }
};

let countdownInterval;

function startCountdown() {
    let countdown = 60; // 60 segundos
    const countdownElement = document.getElementById('countdown-timer');

    countdownInterval = setInterval(() => {
        countdown--;
        if (countdown <= 0) {
            countdown = 60; // Reinicia a contagem
        }
        countdownElement.textContent = countdown;
    }, 1000); // Atualiza a cada segundo
}

function resetCountdown() {
    clearInterval(countdownInterval);
    startCountdown();
}

// Inicia o contador de segundos ao carregar a página
startCountdown();
