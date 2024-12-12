// Keep track of rolls
let rollHistory = [];

function createFirework(element) {
    const rect = element.getBoundingClientRect();
    const numSparks = 8;
    
    for (let i = 0; i < numSparks; i++) {
        const spark = document.createElement('div');
        spark.className = 'firework';
        // Use fixed positioning relative to viewport
        spark.style.position = 'fixed';
        spark.style.left = `${rect.left + rect.width/2}px`;
        spark.style.top = `${rect.top + rect.height/2}px`;
        spark.style.transform = `rotate(${i * (360/numSparks)}deg) translateX(20px)`;
        document.body.appendChild(spark);
        
        // Remove spark after animation
        setTimeout(() => spark.remove(), 500);
    }
}

function rollDice() {
    const diceCount = parseInt(document.getElementById('diceCount').value);
    const diceType = parseInt(document.getElementById('diceType').value);
    const diceContainer = document.querySelector('.dice-container');
    
    // Validate input
    if (diceCount < 1 || diceCount > 10) {
        alert('Please enter a number between 1 and 10');
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
        
        // Add rolling animation
        dieElement.style.animation = 'roll 0.5s ease-out';
        dieElement.textContent = result;
        
        // Check for natural 20
        if (diceType === 20 && result === 20) {
            dieElement.classList.add('natural-20');
            createFirework(dieElement);
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
    logContainer.innerHTML = rollHistory.map(roll => `
        <div class="log-entry">
            <div style="display: flex; align-items: center;">
                <span>${roll.type}:</span>
                <div class="log-dice-container">
                    ${roll.results.map(result => `
                        <div class="log-dice ${result === 20 && roll.type.includes('D20') ? 'natural-20' : ''}" 
                             data-type="d${roll.type.split('D')[1]}">${result}</div>
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