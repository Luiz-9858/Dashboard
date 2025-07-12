let weeklyChart, distributionChart;

function createWeeklyChart() {
    const ctx = document.getElementById('weekly-chart').getContext('2d');
    
    weeklyChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            datasets: [
                {
                    label: 'Inglês',
                    data: studyData.english.days,
                    backgroundColor: 'rgba(67, 97, 238, 0.7)'
                },
                {
                    label: 'Programação',
                    data: studyData.coding.days,
                    backgroundColor: 'rgba(76, 201, 240, 0.7)'
                },
                {
                    label: 'Figma',
                    data: studyData.figma.days,
                    backgroundColor: 'rgba(63, 55, 201, 0.7)'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Horas'
                    }
                },
                x: {
                    stacked: false
                }
            }
        }
    });
}

function createDistributionChart() {
    const ctx = document.getElementById('distribution-chart').getContext('2d');
    
    distributionChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Inglês', 'Programação', 'Figma'],
            datasets: [{
                data: [
                    studyData.english.currentHours,
                    studyData.coding.currentHours,
                    studyData.figma.currentHours
                ],
                backgroundColor: [
                    'rgba(67, 97, 238, 0.7)',
                    'rgba(76, 201, 240, 0.7)',
                    'rgba(63, 55, 201, 0.7)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const value = context.raw;
                            const percentage = Math.round((value / total) * 100);
                            return `${context.label}: ${value}h (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

function updateCharts() {
    // Atualizar dados dos gráficos
    weeklyChart.data.datasets[0].data = studyData.english.days;
    weeklyChart.data.datasets[1].data = studyData.coding.days;
    weeklyChart.data.datasets[2].data = studyData.figma.days;
    weeklyChart.update();
    
    distributionChart.data.datasets[0].data = [
        studyData.english.currentHours,
        studyData.coding.currentHours,
        studyData.figma.currentHours
    ];
    distributionChart.update();
}