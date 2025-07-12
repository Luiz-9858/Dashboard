// Atualizar cartões de progresso
function updateProgressCards() {
    // Inglês
    const englishProgress = calculateProgress(studyData.english.currentHours, studyData.english.weeklyGoal);
    document.getElementById('english-progress').style.background = 
        `conic-gradient(var(--accent-color) ${englishProgress}%, #e0e0e0 ${englishProgress}%)`;
    document.getElementById('english-progress').setAttribute('data-progress', englishProgress);
    document.getElementById('english-hours').textContent = 
        `${formatHours(studyData.english.currentHours)}/${studyData.english.weeklyGoal} horas`;

    // Programação
    const codeProgress = calculateProgress(studyData.coding.currentHours, studyData.coding.weeklyGoal);
    document.getElementById('code-progress').style.background = 
        `conic-gradient(var(--accent-color) ${codeProgress}%, #e0e0e0 ${codeProgress}%)`;
    document.getElementById('code-progress').setAttribute('data-progress', codeProgress);
    document.getElementById('code-hours').textContent = 
        `${formatHours(studyData.coding.currentHours)}/${studyData.coding.weeklyGoal} horas`;

    // Figma
    const figmaProgress = calculateProgress(studyData.figma.currentHours, studyData.figma.weeklyGoal);
    document.getElementById('figma-progress').style.background = 
        `conic-gradient(var(--accent-color) ${figmaProgress}%, #e0e0e0 ${figmaProgress}%)`;
    document.getElementById('figma-progress').setAttribute('data-progress', figmaProgress);
    document.getElementById('figma-hours').textContent = 
        `${formatHours(studyData.figma.currentHours)}/${studyData.figma.weeklyGoal} horas`;
}

// Adicionar horas de estudo
function addStudyHours(category, hours) {
    if (studyData[category]) {
        studyData[category].currentHours += hours;
        
        // Atualizar o dia atual no array de dias (0 = Domingo, 1 = Segunda, etc.)
        const today = new Date().getDay();
        studyData[category].days[today] += hours;
        
        updateProgressCards();
        updateCharts();
        saveData();
    }
}

// Atualizar lista de metas
function updateGoalsList() {
    const goalsList = document.getElementById('goals-list');
    goalsList.innerHTML = '';
    
    goals.forEach((goal, index) => {
        const li = document.createElement('li');
        
        const span = document.createElement('span');
        span.textContent = goal;
        
        const button = document.createElement('button');
        button.textContent = '✓';
        button.className = 'complete-goal';
        button.onclick = () => completeGoal(index);
        
        li.appendChild(span);
        li.appendChild(button);
        goalsList.appendChild(li);
    });
}

// Completar meta
function completeGoal(index) {
    goals.splice(index, 1);
    updateGoalsList();
    saveData();
}

// Adicionar nova meta
document.getElementById('add-goal-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('new-goal');
    const newGoal = input.value.trim();
    
    if (newGoal) {
        goals.push(newGoal);
        updateGoalsList();
        saveData();
        input.value = '';
    }
});

// [Manter todas as funções anteriores]

// Adicionar animação ao atualizar progresso
function updateProgressCards() {
    // Inglês
    const englishProgress = calculateProgress(studyData.english.currentHours, studyData.english.weeklyGoal);
    const englishCircle = document.getElementById('english-progress');
    englishCircle.style.background = 
        `conic-gradient(var(--accent-color) ${englishProgress}%, #e0e0e0 ${englishProgress}%)`;
    englishCircle.setAttribute('data-progress', englishProgress);
    document.getElementById('english-hours').textContent = 
        `${formatHours(studyData.english.currentHours)}/${studyData.english.weeklyGoal} horas`;
    
    // Adicionar animação
    englishCircle.classList.add('pulse');
    setTimeout(() => englishCircle.classList.remove('pulse'), 500);

    // [Repetir para as outras categorias...]
    
}