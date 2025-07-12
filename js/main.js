document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes
    updateCurrentDate();
    updateProgressCards();
    updateGoalsList();
    
    // Criar gráficos
    createWeeklyChart();
    createDistributionChart();
    
    // Configurar evento do formulário de horas
    document.getElementById('study-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const category = document.getElementById('study-category').value;
        const hours = parseFloat(document.getElementById('study-hours').value);
        
        if (hours > 0) {
            addStudyHours(category, hours);
            document.getElementById('study-hours').value = '';
            
            // Mostrar feedback visual
            const button = e.target.querySelector('button');
            button.textContent = '✓ Adicionado!';
            setTimeout(() => {
                button.textContent = 'Adicionar';
            }, 2000);
        }
    });
    
    // Atualizar data a cada minuto
    setInterval(updateCurrentDate, 60000);
    
    // Carregar dados de exemplo (pode remover depois)
    if (localStorage.getItem('studyDashboardData') === null) {
        addStudyHours('english', 3);
        addStudyHours('coding', 2);
        addStudyHours('figma', 1);
    }
});