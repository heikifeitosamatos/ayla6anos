document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO CONTADOR REGRESSIVO ---
    const dataAlvo = new Date('2025-10-04T19:30:00');

    const diasEl = document.getElementById('dias');
    const horasEl = document.getElementById('horas');
    const minutosEl = document.getElementById('minutos');
    const segundosEl = document.getElementById('segundos');

    function atualizarContador() {
        const agora = new Date();
        const diferencaTotal = dataAlvo - agora;

        if (diferencaTotal <= 0) {
            document.getElementById('countdown').innerHTML = "<h2>A festa já começou!</h2>";
            clearInterval(intervalo);
            return;
        }

        const dias = Math.floor(diferencaTotal / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencaTotal % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencaTotal % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencaTotal % (1000 * 60)) / 1000);
        
        diasEl.innerText = formatarTempo(dias);
        horasEl.innerText = formatarTempo(horas);
        minutosEl.innerText = formatarTempo(minutos);
        segundosEl.innerText = formatarTempo(segundos);
    }

    function formatarTempo(tempo) {
        return tempo < 10 ? `0${tempo}` : tempo;
    }

    const intervalo = setInterval(atualizarContador, 1000);
    atualizarContador();


    // --- LÓGICA DO EFEITO DE CONFETE ---
    function criarConfetes() {
        const cores = ['#2a9d8f', '#e9c46a', '#f4a261', '#e76f51', '#264653'];
        const quantidadeConfetes = 50;

        for (let i = 0; i < quantidadeConfetes; i++) {
            const confete = document.createElement('div');
            confete.classList.add('confete');
            
            confete.style.left = `${Math.random() * 100}vw`;
            confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
            confete.style.animationDelay = `${Math.random() * 3}s`;
            confete.style.animationDuration = `${2 + Math.random() * 3}s`;
            
            // Adiciona variações no tamanho
            const tamanho = `${5 + Math.random() * 10}px`;
            confete.style.width = tamanho;
            confete.style.height = tamanho;
            
            document.body.appendChild(confete);

            // Remove o confete do DOM após a animação
            setTimeout(() => {
                confete.remove();
            }, 6000);
        }
    }

    criarConfetes();
});
                
