// Get references to relevant HTML elements
const addToCartButtons = document.getElementsByTagName('button');
const cartSection = document.getElementById('cart');
const cartList = cartSection.getElementsByTagName('ul')[0];
const checkoutButton = cartSection.getElementsByTagName('button')[0];

// Initialize an empty cart array
let cart = [];

// Function to add a product to the cart
function addToCart(event) {
  const button = event.target;
  const product = button.parentElement.querySelector('h3').textContent;
  const price = button.parentElement.querySelector('p:last-child').textContent.split(':')[1].trim();

  // Check if the product is already in the cart
  const existingItem = cart.find(item => item.product === product);

  if (existingItem) {
    existingItem.quantity += 1; // Increment quantity if already in cart
  } else {
    cart.push({ product: product, price: price, quantity: 1 }); // Add new item to cart
  }

  updateCartUI();
}

// Function to remove a product from the cart
function removeFromCart(event) {
  const button = event.target;
  const listItem = button.parentElement;
  const product = listItem.getAttribute('data-product');

  // Find the index of the product in the cart array
  const index = cart.findIndex(item => item.product === product);

  if (index !== -1) {
    cart.splice(index, 1); // Remove the item from the cart
  }

  updateCartUI();
}

// Function to update the cart UI
function updateCartUI() {
  // Clear the cart list
  cartList.innerHTML = '';

  // Iterate over the items in the cart array
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const listItem = document.createElement('li');
    listItem.setAttribute('data-product', item.product);
    listItem.textContent = `${item.product} - $${item.price} - Quantity: ${item.quantity}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', removeFromCart);

    listItem.appendChild(removeButton);
    cartList.appendChild(listItem);
  }

  // Calculate and display the total price
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalParagraph = document.createElement('p');
  totalParagraph.textContent = `Total: $${totalPrice}`;
  cartList.appendChild(totalParagraph);

  // Enable or disable checkout button based on cart contents
  if (cart.length > 0) {
    checkoutButton.disabled = false;
  } else {
    checkoutButton.disabled = true;
  }
}

// Event listener for add to cart buttons
for (let i = 0; i < addToCartButtons.length; i++) {
    const button = addToCartButtons[i];
    button.addEventListener('click', addToCart);
  }
  // Function to handle form submission
function submitForm(event) {
    event.preventDefault(); // Prevent form from submitting and refreshing the page
  
    // Get form input values
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
  
    // Retrieve the input values
    const name = nameInput.value;
    const email = emailInput.value;
    const message = messageInput.value;
  
    // Validate the form inputs (add your own validation logic here)
    if (!name || !email || !message) {
      alert('Please fill in all the fields');
      return;
    }
  
    // Perform further actions with the form data (e.g., sending it to a server)
    // Replace the code below with your own logic
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
  
    // Reset the form after submission
    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
  
    // Show a success message
    alert('Form submitted successfully!');
  }
  
  // Get the form element
  const form = document.getElementById('admission-form');
  
  // Add an event listener for form submission
  form.addEventListener('submit', submitForm);