// Keep track of rolls
let rollHistory = [];

function getDisplayValue(number) {
    // Convert all numbers to letters (1=a, 2=b, etc)
    return String.fromCharCode('a'.charCodeAt(0) + (number - 1));
}

function getRandomAnimation() {
    const animations = [
        'roll-rotate',
        'roll-flip',
        'roll-bounce',
        'roll-shake',
        'roll-spin-bounce'
    ];
    return animations[Math.floor(Math.random() * animations.length)];
}

function rollDice() {
    const diceCount = parseInt(document.getElementById('diceCount').value);
    const diceType = parseInt(document.getElementById('diceType').value);
    const diceContainer = document.querySelector('.dice-container');
    
    // Validate input
    if (diceCount < 1 || diceCount > 20) {
        alert('Please enter a number between 1 and 20');
        return;
    }

    // Clear previous dice
    diceContainer.innerHTML = '<div class="dice-results"></div><div class="total-result"></div>';
    const resultsContainer = diceContainer.querySelector('.dice-results');
    
    // Roll each die
    const results = [];
    for (let i = 0; i < diceCount; i++) {
        const dieElement = document.createElement('div');
        dieElement.className = 'dice';
        dieElement.setAttribute('data-type', `d${diceType}`);
        resultsContainer.appendChild(dieElement);
        
        // Generate random number
        const result = Math.floor(Math.random() * diceType) + 1;
        results.push(result);
        
        // Add random rolling animation
        const animation = getRandomAnimation();
        dieElement.style.animation = `${animation} 0.5s ease-out`;
        dieElement.textContent = getDisplayValue(result);
        
        // Check for natural 20
        if (diceType === 20 && result === 20) {
            dieElement.classList.add('natural-20');
        }
    }
    
    // Calculate and display total
    const total = results.reduce((sum, num) => sum + num, 0);
    const totalElement = diceContainer.querySelector('.total-result');
    totalElement.textContent = `Total: ${total}`;
    
    // Add to history
    const rollTime = new Date().toLocaleTimeString();
    rollHistory.unshift({
        type: `${diceCount}D${diceType}`,
        results: results,
        total: total,
        time: rollTime
    });
    
    // Keep only last 10 rolls
    if (rollHistory.length > 10) {
        rollHistory.pop();
    }
    
    updateRollLog();
}

function updateRollLog() {
    const logContainer = document.getElementById('logContainer');
    const rollLog = document.querySelector('.roll-log');
    
    if (rollHistory.length === 0) {
        rollLog.classList.remove('has-rolls');
        return;
    }
    
    rollLog.classList.add('has-rolls');
    logContainer.innerHTML = rollHistory.map(roll => `
        <div class="log-entry">
            <div style="display: flex; align-items: center;">
                <span>${roll.type}:</span>
                <div class="log-dice-container">
                    ${roll.results.map(result => `
                        <div class="log-dice ${result === 20 && roll.type.includes('D20') ? 'natural-20' : ''}" 
                             data-type="d${roll.type.split('D')[1]}">${getDisplayValue(result)}</div>
                    `).join('')}
                </div>
                <span class="log-total">=&nbsp;${roll.total}</span>
            </div>
            <span class="log-entry-time">${roll.time}</span>
        </div>
    `).join('');
}

// Add animation styles
document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes roll {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
`); 