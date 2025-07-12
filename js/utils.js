// Formatar horas
function formatHours(hours) {
    return hours.toFixed(1);
}

// Atualizar data atual
function updateCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString('pt-BR', options);
}

// Calcular progresso percentual
function calculateProgress(current, goal) {
    return Math.min(Math.round((current / goal) * 100), 100);
}