// Dados iniciais
const studyData = {
    english: {
        weeklyGoal: 20,
        currentHours: 0,
        days: [0, 0, 0, 0, 0, 0, 0]
    },
    coding: {
        weeklyGoal: 15,
        currentHours: 0,
        days: [0, 0, 0, 0, 0, 0, 0]
    },
    figma: {
        weeklyGoal: 10,
        currentHours: 0,
        days: [0, 0, 0, 0, 0, 0, 0]
    }
};

// Metas mensais
let goals = [
    "Completar curso de JavaScript intermediário",
    "Finalizar 3 projetos no Figma",
    "Atingir 80 horas de estudo de inglês no mês"
];

// Carregar dados do localStorage
function loadData() {
    const savedData = localStorage.getItem('studyDashboardData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        Object.assign(studyData, parsedData.studyData);
        goals = parsedData.goals || goals;
    }
}

// Salvar dados no localStorage
function saveData() {
    const dataToSave = {
        studyData,
        goals
    };
    localStorage.setItem('studyDashboardData', JSON.stringify(dataToSave));
}

// Inicializar dados
loadData();