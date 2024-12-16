// Defining Variables
const orderSummaryTable = document.getElementById('order-summary-table').getElementsByTagName('tbody')[0];
const paymentForm = document.getElementById('payment-form');
const thankYouMessage = document.getElementById('thank-you-message');

// Define Event Listeners
document.addEventListener('DOMContentLoaded', initializeOrderSummary);
paymentForm.addEventListener('submit', handlePaymentFormSubmit);

// Functions

// Function to initialize the Order Summary
function initializeOrderSummary() {
    const orderSummary = JSON.parse(localStorage.getItem('orderSummary'));

    if (orderSummary) {
        let total = 0;

        // Loop through the order items and display them in the table
        orderSummary.items.forEach(item => {
            const row = orderSummaryTable.insertRow();
            const itemNameCell = row.insertCell(0);
            const itemQuantityCell = row.insertCell(1);
            const itemPriceCell = row.insertCell(2);
            const itemTotalCell = row.insertCell(3);

            const itemTotal = item.quantity * item.price;
            total += itemTotal;

            itemNameCell.textContent = item.name.charAt(0).toUpperCase() + item.name.slice(1);
            itemQuantityCell.textContent = item.quantity;
            itemPriceCell.textContent = `$${item.price.toFixed(2)}`;
            
        });

        // Display the total amount in the last row
        const totalRow = orderSummaryTable.insertRow();
        const totalCell = totalRow.insertCell(0);
        totalCell.colSpan = 3;
        totalCell.textContent = 'Total:';
        const totalAmountCell = totalRow.insertCell(1);
        totalAmountCell.textContent = `$${orderSummary.total}`; // Use the total stored in localStorage
    } else {
        orderSummaryTable.innerHTML = '<tr><td colspan="4">No order found.</td></tr>';
    }
}

// Function to handle payment form submission
function handlePaymentFormSubmit(event) {
    event.preventDefault();

    // Calculate delivery date (e.g., 3 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    const formattedDate = deliveryDate.toLocaleDateString();

    // Display a thank you message with delivery date
    thankYouMessage.textContent = `Thank you for your purchase! Your order is on its way. Expected delivery date: ${formattedDate}.`;

    // Reset the form and remove order summary from localStorage
    paymentForm.reset();
    localStorage.removeItem('orderSummary');
}
