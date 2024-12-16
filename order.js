// Defining Variables
const medicines = document.querySelectorAll('.medicine input');
const orderTable = document.getElementById('order-table');
const totalPriceElement = document.getElementById('total-price');

const prices = {
    paracetamol: 5,
    aspirin: 8,
    ibuprofen: 7,
    codeine: 12,
    diclofenac: 10,
    tramadol: 15,
    amoxicillin: 10,
    ciprofloxacin: 12,
    clindamycin: 15,
    azithromycin: 13,
    penicillin: 9,
    metronidazole: 11,
    fluoxetine: 20,
    sertraline: 22,
    escitalopram: 18,
    venlafaxine: 25,
    paroxetine: 23,
    duloxetine: 21,
    loratadine: 5,
    diphenhydramine: 6,
    fexofenadine: 7,
    cetirizine: 6,
    levocetirizine: 8,
    chlorpheniramine: 5,
    amlodipine: 10,
    losartan: 12,
    enalapril: 14,
    hydrochlorothiazide: 8,
    ramipril: 13,
    bisoprolol: 15
};

// Define Event Listeners
document.addEventListener('DOMContentLoaded', initializeOrderPage);

// Functions

// Function to initialize the order page
function initializeOrderPage() {
    // Attach event listeners to each medicine input field
    medicines.forEach(med => med.addEventListener('input', updateTable));

    // Event listener for 'Add to Favourites' button
    document.getElementById('add-to-favourites').addEventListener('click', saveToFavourites);

    // Event listener for 'Apply Favourites' button
    document.getElementById('apply-favourites').addEventListener('click', applyFavourites);

    // Event listener for 'Buy Now' button
    document.getElementById('buy-now').addEventListener('click', handleBuyNow);

    // Initial update of the table
    updateTable();
}

// Function to update the order table based on the input quantities
function updateTable() {
    let total = 0;
    orderTable.innerHTML = ''; // Clear the table before adding new rows

    medicines.forEach(med => {
        const quantity = parseInt(med.value);
        const id = med.id;
        if (quantity > 0) {
            const price = prices[id] * quantity;
            total += price;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${id.charAt(0).toUpperCase() + id.slice(1)}</td>
                <td>${quantity}</td>
                <td>$${price.toFixed(2)}</td>
            `;
            orderTable.appendChild(row);
        }
    });

    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to save the current order to localStorage as a favourite
function saveToFavourites() {
    const favouriteOrder = {};
    medicines.forEach(med => {
        favouriteOrder[med.id] = med.value;
    });
    localStorage.setItem('favouriteOrder', JSON.stringify(favouriteOrder));
    alert('Order saved to favourites!');
}

// Function to apply the saved favourite order from localStorage
function applyFavourites() {
    const favouriteOrder = JSON.parse(localStorage.getItem('favouriteOrder'));
    if (favouriteOrder) {
        medicines.forEach(med => {
            med.value = favouriteOrder[med.id] || 0;
        });
        updateTable();
    } else {
        alert('No favourites found!');
    }
}


// Function to handle the 'Buy Now' button click and navigate to the payment page
function handleBuyNow() {
    const orderDetails = [];
    let total = 0;

    medicines.forEach(med => {
        const quantity = parseInt(med.value);
        const id = med.id;
        if (quantity > 0) {
            const price = prices[id] * quantity;
            total += price;
            orderDetails.push({ name: id, quantity, price });
        }
    });

    const orderSummary = {
        items: orderDetails,
        total: total.toFixed(2) // Ensure total is correctly stored
    };

    localStorage.setItem('orderSummary', JSON.stringify(orderSummary)); // Save the full order to localStorage
    window.location.href = 'payment.html'; // Navigate to the payment page
}
