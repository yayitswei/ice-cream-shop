// Game elements
const orderContent = document.getElementById('order-content');
const resultContent = document.getElementById('result-content');
const customerImg = document.getElementById('customer-img');
const cones = document.querySelectorAll('.cone');
const flavors = document.querySelectorAll('.flavor');
const toppings = document.querySelectorAll('.topping');
const currentCone = document.getElementById('current-cone');
const currentIceCream = document.getElementById('current-ice-cream');
const currentTopping = document.getElementById('current-topping');
const serveButton = document.getElementById('serve-button');
const nextButton = document.getElementById('next-button');
const tryAgainButton = document.getElementById('try-again-button');
const resultText = document.getElementById('result-text');

// Sound effects
const successSound = new Audio('sounds/success.mp3');
const wrongSound = new Audio('sounds/wrong.mp3');

// Error handling for sound effects
successSound.onerror = function() {
    console.log('Error loading success sound');
};

wrongSound.onerror = function() {
    console.log('Error loading wrong sound');
};

// Game state
let selectedCone = null;
let selectedFlavor = null;
let selectedTopping = null;
let currentOrder = {};

// Possible orders
const orders = [
    { cone: 'cone1', flavor: 'chocolate', topping: 'sprinkles' },
    { cone: 'cone1', flavor: 'vanilla', topping: 'cherry' },
    { cone: 'cone2', flavor: 'strawberry', topping: 'sprinkles' },
    { cone: 'cone2', flavor: 'chocolate', topping: 'cherry' },
    { cone: 'cone1', flavor: 'strawberry', topping: 'cherry' },
    { cone: 'cone2', flavor: 'vanilla', topping: 'sprinkles' }
];

// Initialize game
function startGame() {
    // Clear previous selections
    selectedCone = null;
    selectedFlavor = null;
    selectedTopping = null;

    // Clear visual selections
    document.querySelectorAll('.selected').forEach(item => {
        item.classList.remove('selected');
    });

    // Clear creation area
    currentCone.innerHTML = '';
    currentIceCream.innerHTML = '';
    currentTopping.innerHTML = '';

    // Reset customer and buttons
    customerImg.src = 'images/customer.png';
    serveButton.classList.remove('hidden');
    nextButton.classList.add('hidden');
    tryAgainButton.classList.add('hidden');
    
    // Show order content, hide result content
    orderContent.classList.remove('hidden');
    resultContent.classList.add('hidden');

    // Generate new order
    currentOrder = orders[Math.floor(Math.random() * orders.length)];

    // Display order with simplified language and highlighted options
    let orderText = '<div>I want:</div>';

    // Add cone type with highlight
    const coneType = currentOrder.cone === 'cone1' ? 'CONE' : 'CUP';
    orderText += `<div class="highlight">${coneType}</div>`;

    // Add flavor with highlight
    let flavorText = currentOrder.flavor.toUpperCase();
    orderText += `<div class="highlight">${flavorText}</div>`;

    // Add topping with highlight
    const toppingText = currentOrder.topping === 'sprinkles' ? 'SPRINKLES' : 'CHERRY';
    orderText += `<div class="highlight">${toppingText}</div>`;

    orderText += '<div>Please!</div>';

    // Show order with a slight delay to simulate thinking
    orderContent.textContent = 'Hmm...';
    setTimeout(() => {
        orderContent.innerHTML = orderText;
    }, 1000);
}

// Event listeners for cones
cones.forEach(cone => {
    cone.addEventListener('click', () => {
        // Remove previous selection
        document.querySelectorAll('.cone').forEach(c => {
            c.classList.remove('selected');
        });
        
        // Add new selection
        cone.classList.add('selected');
        
        // Update game state
        selectedCone = cone.dataset.cone;
        
        // Update visual
        currentCone.innerHTML = `<img src="images/${selectedCone}.png" alt="Selected Cone">`;
    });
});

// Event listeners for flavors
flavors.forEach(flavor => {
    flavor.addEventListener('click', () => {
        // Remove previous selection
        document.querySelectorAll('.flavor').forEach(f => {
            f.classList.remove('selected');
        });
        
        // Add new selection
        flavor.classList.add('selected');
        
        // Update game state
        selectedFlavor = flavor.dataset.flavor;
        
        // Update visual
        currentIceCream.innerHTML = `<img src="images/${selectedFlavor}.png" alt="Selected Flavor">`;
    });
});

// Event listeners for toppings
toppings.forEach(topping => {
    topping.addEventListener('click', () => {
        // Remove previous selection
        document.querySelectorAll('.topping').forEach(t => {
            t.classList.remove('selected');
        });
        
        // Add new selection
        topping.classList.add('selected');
        
        // Update game state
        selectedTopping = topping.dataset.topping;
        
        // Update visual
        currentTopping.innerHTML = `<img src="images/${selectedTopping}.png" alt="Selected Topping">`;
    });
});

// Event listener for serve button
serveButton.addEventListener('click', () => {
    // Check if all selections are made
    if (!selectedCone || !selectedFlavor || !selectedTopping) {
        alert('Please complete your ice cream first!');
        return;
    }

    // Check if order is correct
    const isCorrect =
        selectedCone === currentOrder.cone &&
        selectedFlavor === currentOrder.flavor &&
        selectedTopping === currentOrder.topping;

    // Hide order, show result
    orderContent.classList.add('hidden');
    resultContent.classList.remove('hidden');

    // Hide serve button, show appropriate next button
    serveButton.classList.add('hidden');

    if (isCorrect) {
        // Play success sound
        try {
            successSound.currentTime = 0; // Reset sound to start
            successSound.play().catch(e => console.log('Error playing sound:', e));
        } catch (e) {
            console.log('Error with success sound:', e);
        }

        // Show happy customer
        customerImg.src = 'images/happy-customer.png';
        resultText.textContent = 'Yay! I love it!';
        resultText.classList.add('result-success');
        resultText.classList.remove('result-failure');

        // Show next customer button
        nextButton.classList.remove('hidden');
    } else {
        // Play wrong sound
        try {
            wrongSound.currentTime = 0; // Reset sound to start
            wrongSound.play().catch(e => console.log('Error playing sound:', e));
        } catch (e) {
            console.log('Error with wrong sound:', e);
        }

        // Show sad customer
        customerImg.src = 'images/sad-customer.png';
        resultText.textContent = "That\'s not what I ordered.";
        resultText.classList.add('result-failure');
        resultText.classList.remove('result-success');

        // Show try again button
        tryAgainButton.classList.remove('hidden');
    }
});

// Event listener for next customer button
nextButton.addEventListener('click', startGame);

// Event listener for try again button
tryAgainButton.addEventListener('click', () => {
    // Hide result, show order again
    resultContent.classList.add('hidden');
    orderContent.classList.remove('hidden');
    
    // Reset customer image
    customerImg.src = 'images/customer.png';
    
    // Hide try again button, show serve button
    tryAgainButton.classList.add('hidden');
    serveButton.classList.remove('hidden');
    
    // Clear ice cream (but keep order the same)
    selectedCone = null;
    selectedFlavor = null;
    selectedTopping = null;
    
    // Clear visual selections
    document.querySelectorAll('.selected').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Clear creation area
    currentCone.innerHTML = '';
    currentIceCream.innerHTML = '';
    currentTopping.innerHTML = '';
});

// Start the game
startGame();
