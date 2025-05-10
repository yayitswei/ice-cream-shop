// Game elements
const orderBubble = document.getElementById('order-bubble');
const cones = document.querySelectorAll('.cone');
const flavors = document.querySelectorAll('.flavor');
const toppings = document.querySelectorAll('.topping');
const currentCone = document.getElementById('current-cone');
const currentIceCream = document.getElementById('current-ice-cream');
const currentTopping = document.getElementById('current-topping');
const serveButton = document.getElementById('serve-button');
const resultDiv = document.getElementById('result');
const resultImg = document.getElementById('result-img');
const resultText = document.getElementById('result-text');
const nextCustomerButton = document.getElementById('next-customer');

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

// Game sounds (to be implemented when you have sound files)
// const successSound = new Audio('sounds/success.mp3');
// const wrongSound = new Audio('sounds/wrong.mp3');

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

    // Hide result section completely
    document.querySelector('.right-section').style.visibility = 'hidden';
    resultDiv.classList.add('hidden');

    // Generate new order
    currentOrder = orders[Math.floor(Math.random() * orders.length)];

    // Display order
    let orderText = '';
    if (currentOrder.cone === 'cone1') {
        orderText += 'Pointy cone with ';
    } else {
        orderText += 'Cup cone with ';
    }

    orderText += currentOrder.flavor + ' ice cream and ' +
                (currentOrder.topping === 'sprinkles' ? 'sprinkles' : 'a cherry') + ', please!';

    // Show order with a slight delay to simulate thinking
    orderBubble.textContent = 'Hmm...';
    setTimeout(() => {
        orderBubble.textContent = orderText;
    }, 1000);

    // Make sure all elements are visible for the new customer
    document.getElementById('creation-area').style.visibility = 'visible';
    document.getElementById('serve-button').style.visibility = 'visible';
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

    // Show the right section that contains the result
    document.querySelector('.right-section').style.visibility = 'visible';

    // Show result
    resultDiv.classList.remove('hidden');

    if (isCorrect) {
        // Play success sound
        // successSound.play();

        // Show happy customer
        resultImg.src = 'images/happy-customer.png';
        resultText.textContent = 'Yay! The customer loves it!';
        resultText.style.color = '#4CAF50';
    } else {
        // Play wrong sound
        // wrongSound.play();

        // Show sad customer
        resultImg.src = 'images/sad-customer.png';
        resultText.textContent = 'Oops! Not what they ordered.';
        resultText.style.color = '#F44336';
    }
});

// Event listener for next customer button
nextCustomerButton.addEventListener('click', startGame);

// Start the game
startGame();