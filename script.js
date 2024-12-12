function rollDice() {
    const diceElement = document.getElementById('dice');
    const diceType = document.getElementById('diceType').value;
    
    // Add rolling animation
    diceElement.style.animation = 'none';
    diceElement.offsetHeight; // Trigger reflow
    diceElement.style.animation = 'roll 0.5s ease-out';
    
    // Generate random number
    const result = Math.floor(Math.random() * diceType) + 1;
    
    // Update dice display
    diceElement.textContent = result;
}

// Add this to your CSS file
document.head.insertAdjacentHTML('beforeend', `
    <style>
        @keyframes roll {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
`); 