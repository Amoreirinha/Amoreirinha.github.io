function calcular() {
    // Obtém o valor digitado pelo usuário
    const volumeTotal = parseFloat(document.getElementById('volumeTotal').value);
    
    // Verifica se o valor é válido
    if (isNaN(volumeTotal) || volumeTotal <= 0) {
        document.getElementById('resultado').innerHTML = "Por favor, digite um número válido maior que zero.";
        return;
    }
    
    // Calcula o volume do ácido
    const volumeAcido = (4 * volumeTotal) / 100;
    
    // Calcula a quantidade de sal misturado
    const quantidadeSalMisturado = (volumeAcido * 1.05) * 84 / 60;
    
    // Exibe os resultados
    document.getElementById('resultado').innerHTML = `
        <div class="result-item"><strong>Volume do ácido:</strong> ${volumeAcido.toFixed(2)} ml</div>
        <div class="result-item"><strong>Quantidade de sal misturado:</strong> ${quantidadeSalMisturado.toFixed(2)} g</div>
    `;
}