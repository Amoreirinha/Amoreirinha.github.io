const fotos = [
            { src: 'other_projects/midia/image/JeK/jk (1).jpg', caption: 'Foto 1' },
            { src: 'other_projects/midia/image/JeK/jk (2).jpg', caption: 'Foto 2' },
            { src: 'other_projects/midia/image/JeK/jk (3).jpg', caption: 'Foto 3' },
            { src: 'other_projects/midia/image/JeK/jk (4).jpg', caption: 'Foto 4' },
            { src: 'other_projects/midia/image/JeK/jk (5).jpg', caption: 'Foto 5' },
            { src: 'other_projects/midia/image/JeK/jk (6).jpg', caption: 'Foto 6' },
            { src: 'other_projects/midia/image/JeK/jk (7).jpg', caption: 'Foto 7' },
            { src: 'other_projects/midia/image/JeK/jk (8).jpg', caption: 'Foto 8' },
            { src: 'other_projects/midia/image/JeK/jk (9).jpg', caption: 'Foto 9' },
            { src: 'other_projects/midia/image/JeK/jk (10).jpg', caption: 'Foto 10' },
            { src: 'other_projects/midia/image/JeK/jk (11).jpg', caption: 'Foto 11' },
            { src: 'other_projects/midia/image/JeK/jk (12).jpg', caption: 'Foto 12' },
            { src: 'other_projects/midia/image/JeK/jk (13).jpg', caption: 'Foto 13' },
            { src: 'other_projects/midia/image/JeK/jk (14).jpg', caption: 'Foto 14' },
            { src: 'other_projects/midia/image/JeK/jk (15).jpg', caption: 'Foto 15' },
            { src: 'other_projects/midia/image/JeK/jk (16).jpg', caption: 'Foto 16' },
            { src: 'other_projects/midia/image/JeK/jk (17).jpg', caption: 'Foto 17' }
        ];
        
        // Elementos do DOM
        const carrossel = document.querySelector('.carrossel');
        const indicadoresContainer = document.getElementById('indicadores');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        let currentIndex = 0;
        
        // Criar slides
        fotos.forEach((foto, index) => {
            // Criar slide
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.innerHTML = `
                <img src="${foto.src}" alt="${foto.caption}">
                <div class="slide-caption">${foto.caption}</div>
            `;
            carrossel.appendChild(slide);
            
            // Criar indicador
            const indicador = document.createElement('div');
            indicador.className = 'indicador';
            if (index === 0) indicador.classList.add('ativo');
            indicador.addEventListener('click', () => {
                goToSlide(index);
            });
            indicadoresContainer.appendChild(indicador);
        });
        
        // Função para atualizar o carrossel
        function updateCarrossel() {
            carrossel.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Atualizar indicadores
            document.querySelectorAll('.indicador').forEach((ind, index) => {
                ind.classList.toggle('ativo', index === currentIndex);
            });
        }
        
        // Função para ir para um slide específico
        function goToSlide(index) {
            currentIndex = index;
            if (currentIndex >= fotos.length) currentIndex = 0;
            if (currentIndex < 0) currentIndex = fotos.length - 1;
            updateCarrossel();
        }
        
        // Event listeners
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });
        
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });
        
        // Auto-play (opcional)
        let intervalo = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 3000);
        
        // Pausar auto-play quando o mouse estiver sobre o carrossel
        carrossel.addEventListener('mouseenter', () => {
            clearInterval(intervalo);
        });
        
        carrossel.addEventListener('mouseleave', () => {
            intervalo = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 3000);
        });
        
        // Inicializar
        updateCarrossel();

    // Contador de tempo detalhado
    function calcularTempoDetalhado(dataInicio, dataFim = null) {
        const agora = new Date();
        const inicio = new Date(dataInicio);
        const fim = dataFim ? new Date(dataFim) : null;
        
        // Data final para cálculo
        const dataFinal = fim ? (agora > fim ? fim : agora) : agora;
        
        // Diferença em milissegundos
        let diff = dataFinal - inicio;
        
        // Calcular anos
        const anoInicio = inicio.getFullYear();
        const anoFinal = dataFinal.getFullYear();
        let anos = anoFinal - anoInicio;
        
        // Ajustar meses
        let mesInicio = inicio.getMonth();
        let mesFinal = dataFinal.getMonth();
        
        if (mesFinal < mesInicio || (mesFinal === mesInicio && dataFinal.getDate() < inicio.getDate())) {
            anos--;
            mesFinal += 12;
        }
        const meses = mesFinal - mesInicio;
        
        // Calcular dias
        const diaInicio = inicio.getDate();
        const diaFinal = dataFinal.getDate();
        let dias = diaFinal - diaInicio;
        
        if (dias < 0) {
            const ultimoDiaMes = new Date(dataFinal.getFullYear(), dataFinal.getMonth(), 0).getDate();
            dias += ultimoDiaMes;
        }
        
        // Calcular horas, minutos e segundos (apenas para tempo juntos)
        let horas = 0, minutos = 0, segundos = 0;
        
        if (!dataFim) {
            horas = agora.getHours();
            minutos = agora.getMinutes();
            segundos = agora.getSeconds();
        }
        
        return { anos, meses, dias, horas, minutos, segundos };
    }

    function atualizarContadorTempoJuntos() {
        const tempo = calcularTempoDetalhado('2023-04-24');
        
        document.getElementById('juntos-anos').textContent = tempo.anos;
        document.getElementById('juntos-meses').textContent = tempo.meses;
        document.getElementById('juntos-dias').textContent = tempo.dias;
        document.getElementById('juntos-horas').textContent = String(tempo.horas).padStart(2, '0');
        document.getElementById('juntos-minutos').textContent = String(tempo.minutos).padStart(2, '0');
        document.getElementById('juntos-segundos').textContent = String(tempo.segundos).padStart(2, '0');
    }

    function atualizarContadorNamoro() {
        const hoje = new Date();
        const fimNamoro = new Date('2025-01-03');
        
        if (hoje <= fimNamoro) {
            const tempo = calcularTempoDetalhado('2023-04-24', '2025-01-03');
            document.getElementById('namoro-anos').textContent = tempo.anos;
            document.getElementById('namoro-meses').textContent = tempo.meses;
            document.getElementById('namoro-dias').textContent = tempo.dias;
        } else {
            const tempoTotal = calcularTempoDetalhado('2023-04-24', '2025-01-03');
            document.getElementById('namoro-anos').textContent = tempoTotal.anos;
            document.getElementById('namoro-meses').textContent = tempoTotal.meses;
            document.getElementById('namoro-dias').textContent = tempoTotal.dias;
        }
    }

    function atualizarContadorNoivado() {
        const hoje = new Date();
        const inicioNoivado = new Date('2025-01-03');
        
        if (hoje >= inicioNoivado) {
            const tempo = calcularTempoDetalhado('2025-01-03');
            document.getElementById('noivado-anos').textContent = tempo.anos;
            document.getElementById('noivado-meses').textContent = tempo.meses;
            document.getElementById('noivado-dias').textContent = tempo.dias;
        } else {
            document.getElementById('noivado-anos').textContent = '0';
            document.getElementById('noivado-meses').textContent = '0';
            document.getElementById('noivado-dias').textContent = '0';
        }
    }

    function atualizarTodosContadores() {
        atualizarContadorTempoJuntos();
        atualizarContadorNamoro();
        atualizarContadorNoivado();
    }

    // Atualizar os contadores imediatamente e a cada segundo
    atualizarTodosContadores();
    setInterval(atualizarTodosContadores, 1000);

    // Criar corações flutuantes - Versão mobile friendly
    function createHearts() {
    const container = document.querySelector('.hearts-container');
    const numHearts = window.innerWidth < 768 ? 100 : 250; // Menos corações em mobile
    
    // Limpa corações existentes
    container.innerHTML = '';
    
    // Cria novos corações
    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        const emojis = ['💕', '❤️', '💖', '💗', '💞', '💫'];
        heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        heart.classList.add('heart');
        
        // Posição inicial aleatória
        const startX = Math.random() * 100;
        const randomX = Math.random() * 2 - 1; // Valor entre -1 e 1
        
        // Define propriedades CSS customizadas
        heart.style.setProperty('--random-x', randomX);
        heart.style.left = `${startX}%`;
        
        // Duração e delay aleatórios
        const delay = Math.random() * 15;
        heart.style.animationDelay = `${delay}s`;
        
        container.appendChild(heart);
    }
}

// Inicializa os corações quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    createHearts();
    
    // Redimensionamento otimizado para mobile
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            createHearts();
        }, 250);
    });
});

// Forçar redesenho para alguns dispositivos mobile
setTimeout(createHearts, 500);