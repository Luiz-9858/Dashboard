// Variáveis globais
let progressChart, timeChart;
let currentPage = 'overview';

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    initializeCharts();
    initializeTheme();
    initializeNavigation();
    updateStats();
    updateRecentActivity();
    
    // Animações iniciais
    setTimeout(fadeInElements, 100);
    
    // Atualizar dados a cada 30 segundos
    setInterval(updateDashboard, 30000);
});

// Inicializar sidebar
function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
    });
}

// Inicializar navegação
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pageTitle = document.getElementById('pageTitle');
    const pageSubtitle = document.getElementById('pageSubtitle');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover active de todos os links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Adicionar active ao link clicado
            this.classList.add('active');
            
            // Atualizar página atual
            currentPage = this.dataset.page;
            
            // Atualizar título da página
            const pageData = dashboardData.pages[currentPage];
            pageTitle.textContent = pageData.title;
            pageSubtitle.textContent = pageData.subtitle;
        });
    });
}

// Inicializar tema
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Aplicar tema salvo
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
        updateThemeIcon(currentTheme);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Inicializar gráficos
function initializeCharts() {
    initializeProgressChart();
    initializeTimeChart();
    initializePeriodButtons();
}

// Gráfico de progresso
function initializeProgressChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    
    progressChart = new Chart(ctx, {
        type: 'line',
        data: dashboardData.chartData.progressChart,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            elements: {
                point: {
                    radius: 4,
                    hoverRadius: 6
                }
            }
        }
    });
}

// Gráfico de tempo
function initializeTimeChart() {
    const ctx = document.getElementById('timeChart').getContext('2d');
    
    timeChart = new Chart(ctx, {
        type: 'doughnut',
        data: dashboardData.chartData.timeChart,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            },
            cutout: '60%'
        }
    });
}

// Inicializar botões de período
function initializePeriodButtons() {
    const periodButtons = document.querySelectorAll('.period-btn');
    
    periodButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover active de todos os botões
            periodButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar active ao botão clicado
            this.classList.add('active');
            
            // Atualizar gráficos com base no período selecionado
            const period = this.dataset.period;
            updateChartsForPeriod(period);
        });
    });
}

// Atualizar gráficos com base no período
function updateChartsForPeriod(period) {
    const periodData = dashboardData.chartData.periods[period];
    
    if (periodData) {
        // Atualizar gráfico de progresso
        progressChart.data.labels = periodData.progress.labels;
        progressChart.data.datasets = periodData.progress.datasets;
        progressChart.update();
        
        // Atualizar gráfico de tempo
        timeChart.data.labels = periodData.time.labels;
        timeChart.data.datasets = periodData.time.datasets;
        timeChart.update();
    }
}

// Atualizar estatísticas
function updateStats() {
    const stats = dashboardData.stats;
    
    // Atualizar valores das estatísticas
    document.getElementById('totalTasks').textContent = stats.totalTasks;
    document.getElementById('completedTasks').textContent = stats.completedTasks;
    document.getElementById('hoursWorked').textContent = stats.hoursWorked;
    document.getElementById('productivity').textContent = stats.productivity + '%';
    
    // Atualizar cores dos indicadores
    updateStatIndicators();
}

// Atualizar indicadores de estatísticas
function updateStatIndicators() {
    const indicators = document.querySelectorAll('.stat-indicator');
    
    indicators.forEach(indicator => {
        const value = parseInt(indicator.textContent);
        const statCard = indicator.closest('.stat-card');
        
        if (value > 75) {
            statCard.classList.add('high-performance');
        } else if (value > 50) {
            statCard.classList.add('medium-performance');
        } else {
            statCard.classList.add('low-performance');
        }
    });
}

// Atualizar atividade recente
function updateRecentActivity() {
    const activityList = document.getElementById('recentActivity');
    const activities = dashboardData.recentActivity;
    
    activityList.innerHTML = '';
    
    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
            <div class="activity-status ${activity.status}">
                ${activity.status}
            </div>
        `;
        
        activityList.appendChild(activityItem);
    });
}

// Animações de fade-in
function fadeInElements() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Atualizar dashboard completo
function updateDashboard() {
    // Simular atualização de dados
    updateStats();
    updateRecentActivity();
    
    // Atualizar gráficos com dados mais recentes
    if (progressChart && timeChart) {
        const currentPeriod = document.querySelector('.period-btn.active')?.dataset.period || 'week';
        updateChartsForPeriod(currentPeriod);
    }
    
    // Mostrar notificação de atualização
    showUpdateNotification();
}

// Mostrar notificação de atualização
function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Dashboard atualizado</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remover notificação após 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Dados do dashboard (exemplo)
const dashboardData = {
    pages: {
        overview: {
            title: 'Visão Geral',
            subtitle: 'Resumo das suas atividades e progresso'
        },
        tasks: {
            title: 'Tarefas',
            subtitle: 'Gerencie suas tarefas e projetos'
        },
        analytics: {
            title: 'Análises',
            subtitle: 'Relatórios detalhados e métricas'
        },
        settings: {
            title: 'Configurações',
            subtitle: 'Personalize sua experiência'
        }
    },
    
    stats: {
        totalTasks: 124,
        completedTasks: 89,
        hoursWorked: 32,
        productivity: 78
    },
    
    recentActivity: [
        {
            title: 'Projeto Frontend finalizado',
            time: 'Há 2 horas',
            icon: 'fas fa-check-circle',
            status: 'completed'
        },
        {
            title: 'Reunião com cliente',
            time: 'Há 4 horas',
            icon: 'fas fa-users',
            status: 'in-progress'
        },
        {
            title: 'Revisão de código',
            time: 'Há 6 horas',
            icon: 'fas fa-code',
            status: 'pending'
        },
        {
            title: 'Deploy em produção',
            time: 'Ontem',
            icon: 'fas fa-rocket',
            status: 'completed'
        }
    ],
    
    chartData: {
        progressChart: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{
                label: 'Tarefas Concluídas',
                data: [65, 59, 80, 81, 56, 89],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4
            }, {
                label: 'Tarefas Criadas',
                data: [78, 65, 92, 88, 70, 95],
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                tension: 0.4
            }]
        },
        
        timeChart: {
            labels: ['Desenvolvimento', 'Reuniões', 'Planejamento', 'Testes', 'Documentação'],
            datasets: [{
                data: [40, 20, 15, 15, 10],
                backgroundColor: [
                    '#3498db',
                    '#e74c3c',
                    '#f39c12',
                    '#2ecc71',
                    '#9b59b6'
                ],
                borderWidth: 2
            }]
        },
        
        periods: {
            week: {
                progress: {
                    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
                    datasets: [{
                        label: 'Tarefas Concluídas',
                        data: [12, 15, 8, 20, 18, 6, 4],
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        tension: 0.4
                    }]
                },
                time: {
                    labels: ['Coding', 'Meetings', 'Planning', 'Testing'],
                    datasets: [{
                        data: [50, 25, 15, 10],
                        backgroundColor: ['#3498db', '#e74c3c', '#f39c12', '#2ecc71']
                    }]
                }
            },
            month: {
                progress: {
                    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
                    datasets: [{
                        label: 'Tarefas Concluídas',
                        data: [45, 52, 38, 67],
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        tension: 0.4
                    }]
                },
                time: {
                    labels: ['Desenvolvimento', 'Reuniões', 'Planejamento', 'Testes'],
                    datasets: [{
                        data: [45, 25, 20, 10],
                        backgroundColor: ['#3498db', '#e74c3c', '#f39c12', '#2ecc71']
                    }]
                }
            },
            year: {
                progress: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                    datasets: [{
                        label: 'Tarefas Concluídas',
                        data: [65, 59, 80, 81, 56, 89, 95, 78, 85, 92, 88, 94],
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        tension: 0.4
                    }]
                },
                time: {
                    labels: ['Desenvolvimento', 'Reuniões', 'Planejamento', 'Testes', 'Documentação'],
                    datasets: [{
                        data: [40, 20, 15, 15, 10],
                        backgroundColor: ['#3498db', '#e74c3c', '#f39c12', '#2ecc71', '#9b59b6']
                    }]
                }
            }
        }
    }
};

// Funções utilitárias
function formatNumber(num) {
    return new Intl.NumberFormat('pt-BR').format(num);
}

function formatTime(hours) {
    if (hours < 1) {
        return `${Math.round(hours * 60)}m`;
    }
    return `${Math.round(hours)}h`;
}

function getTimeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);
    
    if (diffInSeconds < 60) return 'Agora mesmo';
    if (diffInSeconds < 3600) return `Há ${Math.floor(diffInSeconds / 60)} minutos`;
    if (diffInSeconds < 86400) return `Há ${Math.floor(diffInSeconds / 3600)} horas`;
    
    return `Há ${Math.floor(diffInSeconds / 86400)} dias`;
}

// Adicionar estilos CSS para as notificações
const style = document.createElement('style');
style.textContent = `
    .update-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease-out;
    }
    
    .stat-card.high-performance {
        border-left: 4px solid #2ecc71;
    }
    
    .stat-card.medium-performance {
        border-left: 4px solid #f39c12;
    }
    
    .stat-card.low-performance {
        border-left: 4px solid #e74c3c;
    }
    
    .activity-status.completed {
        color: #2ecc71;
        font-weight: 600;
    }
    
    .activity-status.in-progress {
        color: #f39c12;
        font-weight: 600;
    }
    
    .activity-status.pending {
        color: #e74c3c;
        font-weight: 600;
    }
`;

document.head.appendChild(style);