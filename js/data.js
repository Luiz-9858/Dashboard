// Dados do dashboard
const dashboardData = {
    stats: {
        studyHours: { 
            current: 28, 
            change: 12, 
            positive: true 
        },
        streak: { 
            current: 15, 
            change: 3, 
            positive: true 
        },
        projects: { 
            current: 8, 
            change: 2, 
            positive: true 
        },
        completion: { 
            current: 85, 
            change: 5, 
            positive: true 
        }
    },
    
    recentActivity: [
        { 
            title: 'Concluído: Módulo JavaScript', 
            time: '2 horas atrás', 
            icon: 'fas fa-book', 
            type: 'study' 
        },
        { 
            title: 'Projeto React atualizado', 
            time: '4 horas atrás', 
            icon: 'fas fa-code', 
            type: 'project' 
        },
        { 
            title: 'Pausa para exercícios', 
            time: '6 horas atrás', 
            icon: 'fas fa-dumbbell', 
            type: 'break' 
        },
        { 
            title: 'Revisão de código', 
            time: '1 dia atrás', 
            icon: 'fas fa-search', 
            type: 'study' 
        },
        { 
            title: 'Deploy em produção', 
            time: '2 dias atrás', 
            icon: 'fas fa-rocket', 
            type: 'project' 
        }
    ],
    
    chartData: {
        progressChart: {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Horas de Estudo',
                data: [4, 6, 3, 8, 5, 7, 4],
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }, {
                label: 'Projetos',
                data: [2, 3, 1, 4, 2, 3, 2],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        
        timeChart: {
            labels: ['Estudos', 'Projetos', 'Pausas', 'Revisões'],
            datasets: [{
                data: [40, 30, 15, 15],
                backgroundColor: [
                    '#4f46e5',
                    '#10b981',
                    '#f59e0b',
                    '#ef4444'
                ],
                borderWidth: 0
            }]
        }
    },
    
    pages: {
        overview: {
            title: 'Dashboard',
            subtitle: 'Acompanhe seu progresso e produtividade'
        },
        analytics: {
            title: 'Analytics',
            subtitle: 'Análise detalhada dos seus dados'
        },
        projects: {
            title: 'Projetos',
            subtitle: 'Gerencie seus projetos ativos'
        },
        tasks: {
            title: 'Tarefas',
            subtitle: 'Organize suas tarefas diárias'
        },
        calendar: {
            title: 'Calendário',
            subtitle: 'Visualize seus compromissos'
        },
        settings: {
            title: 'Configurações',
            subtitle: 'Personalize sua experiência'
        }
    }
};

// Função para gerar dados aleatórios (simulação)
function generateRandomData() {
    const variation = () => Math.floor(Math.random() * 10) - 5;
    
    dashboardData.stats.studyHours.current += variation();
    dashboardData.stats.streak.current += Math.floor(Math.random() * 3) - 1;
    dashboardData.stats.projects.current += Math.floor(Math.random() * 2);
    dashboardData.stats.completion.current += variation();
    
    // Garantir valores mínimos
    dashboardData.stats.studyHours.current = Math.max(0, dashboardData.stats.studyHours.current);
    dashboardData.stats.streak.current = Math.max(0, dashboardData.stats.streak.current);
    dashboardData.stats.projects.current = Math.max(0, dashboardData.stats.projects.current);
    dashboardData.stats.completion.current = Math.max(0, Math.min(100, dashboardData.stats.completion.current));
}

// Exportar dados (para uso em outros arquivos)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = dashboardData;
}