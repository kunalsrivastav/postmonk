// ATM Simulator JavaScript

// Global variables
let currentPin = '';
let userBalance = 5250.00;
let currentTransactionType = '';
let selectedAmount = 0;
let transactionHistory = [];

// Valid PIN for demo (normally this would be handled server-side)
const validPin = '1234';

// User account information
const userAccount = {
    name: 'John Doe',
    accountNumber: '****-****-****-1234',
    balance: 5250.00
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    updateLastUpdated();
    showScreen('welcome-screen');
});

// Screen navigation functions
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show the requested screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

function showPinScreen() {
    currentPin = '';
    updatePinDisplay();
    showScreen('pin-screen');
}

function showMenuScreen() {
    showScreen('menu-screen');
}

function showBalanceScreen() {
    updateBalanceDisplay();
    showScreen('balance-screen');
}

function showTransactionScreen(type) {
    currentTransactionType = type;
    updateTransactionHeader(type);
    hideCustomAmountInput();
    showScreen('transaction-screen');
}

function showProcessingScreen() {
    showScreen('processing-screen');
    
    // Simulate processing time
    setTimeout(() => {
        processTransaction();
    }, 2000);
}

function showReceiptScreen() {
    showScreen('receipt-screen');
}

function showErrorScreen(title, message) {
    document.getElementById('error-title').textContent = title;
    document.getElementById('error-message').textContent = message;
    showScreen('error-screen');
}

// PIN handling functions
function addPin(digit) {
    if (currentPin.length < 4) {
        currentPin += digit;
        updatePinDisplay();
    }
}

function clearPin() {
    if (currentPin.length > 0) {
        currentPin = currentPin.slice(0, -1);
        updatePinDisplay();
    }
}

function updatePinDisplay() {
    const pinDots = document.getElementById('pin-dots');
    pinDots.textContent = '●'.repeat(currentPin.length) + '○'.repeat(4 - currentPin.length);
}

function validatePin() {
    if (currentPin.length !== 4) {
        showErrorScreen('Invalid PIN', 'Please enter a 4-digit PIN.');
        return;
    }
    
    if (currentPin === validPin) {
        showMenuScreen();
    } else {
        showErrorScreen('Incorrect PIN', 'The PIN you entered is incorrect. Please try again.');
        currentPin = '';
        updatePinDisplay();
    }
}

// Transaction functions
function updateTransactionHeader(type) {
    const titleElement = document.getElementById('transaction-title');
    const balanceElement = document.getElementById('current-balance');
    
    balanceElement.textContent = formatCurrency(userBalance);
    
    switch(type) {
        case 'withdraw':
            titleElement.innerHTML = '<i class="fas fa-money-bill-wave"></i> Withdraw Cash';
            break;
        case 'deposit':
            titleElement.innerHTML = '<i class="fas fa-piggy-bank"></i> Deposit Cash';
            break;
        case 'transfer':
            titleElement.innerHTML = '<i class="fas fa-exchange-alt"></i> Transfer Money';
            break;
        default:
            titleElement.innerHTML = '<i class="fas fa-money-bill-wave"></i> Transaction';
    }
}

function selectAmount(amount) {
    selectedAmount = amount;
    
    // Validate amount for withdrawal
    if (currentTransactionType === 'withdraw' && amount > userBalance) {
        showErrorScreen('Insufficient Funds', `You cannot withdraw $${amount}. Your available balance is $${formatCurrency(userBalance)}.`);
        return;
    }
    
    showProcessingScreen();
}

function showCustomAmount() {
    document.getElementById('custom-amount-input').style.display = 'flex';
    document.getElementById('custom-amount').focus();
}

function hideCustomAmountInput() {
    document.getElementById('custom-amount-input').style.display = 'none';
    document.getElementById('custom-amount').value = '';
}

function selectCustomAmount() {
    const customAmountInput = document.getElementById('custom-amount');
    const amount = parseFloat(customAmountInput.value);
    
    if (!amount || amount <= 0) {
        showErrorScreen('Invalid Amount', 'Please enter a valid amount greater than $0.');
        return;
    }
    
    if (amount > 1000) {
        showErrorScreen('Amount Too Large', 'Maximum transaction amount is $1,000.');
        return;
    }
    
    if (currentTransactionType === 'withdraw' && amount > userBalance) {
        showErrorScreen('Insufficient Funds', `You cannot withdraw $${formatCurrency(amount)}. Your available balance is $${formatCurrency(userBalance)}.`);
        return;
    }
    
    selectedAmount = amount;
    showProcessingScreen();
}

function processTransaction() {
    const transaction = {
        id: generateTransactionId(),
        type: currentTransactionType,
        amount: selectedAmount,
        date: new Date(),
        balanceBefore: userBalance
    };
    
    // Update balance based on transaction type
    switch(currentTransactionType) {
        case 'withdraw':
            userBalance -= selectedAmount;
            break;
        case 'deposit':
            userBalance += selectedAmount;
            break;
        case 'transfer':
            userBalance -= selectedAmount;
            break;
    }
    
    transaction.balanceAfter = userBalance;
    transactionHistory.push(transaction);
    
    // Update all balance displays
    updateAllBalanceDisplays();
    
    // Generate receipt
    generateReceipt(transaction);
    showReceiptScreen();
}

// Balance functions
function updateBalanceDisplay() {
    const balanceElement = document.getElementById('balance-amount');
    balanceElement.textContent = formatCurrency(userBalance);
}

function updateAllBalanceDisplays() {
    // Update balance screen
    const balanceElement = document.getElementById('balance-amount');
    if (balanceElement) {
        balanceElement.textContent = formatCurrency(userBalance);
    }
    
    // Update transaction screen
    const currentBalanceElement = document.getElementById('current-balance');
    if (currentBalanceElement) {
        currentBalanceElement.textContent = formatCurrency(userBalance);
    }
}

function updateLastUpdated() {
    const now = new Date();
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
        lastUpdatedElement.textContent = formatDateTime(now);
    }
}

// Receipt functions
function generateReceipt(transaction) {
    // Update receipt details
    document.getElementById('receipt-type').textContent = capitalizeFirst(transaction.type);
    document.getElementById('receipt-amount').textContent = formatCurrency(transaction.amount);
    document.getElementById('receipt-date').textContent = formatDate(transaction.date);
    document.getElementById('receipt-time').textContent = formatTime(transaction.date);
    document.getElementById('receipt-id').textContent = transaction.id;
    document.getElementById('receipt-balance').textContent = formatCurrency(transaction.balanceAfter);
    
    // Generate QR code with transaction details
    generateQRCode(transaction);
}

function generateQRCode(transaction) {
    const qrContainer = document.getElementById('qr-code');
    qrContainer.innerHTML = ''; // Clear previous QR code
    
    // Create the URL that the QR code will redirect to
    const receiptUrl = `https://securebank.com/receipt?id=${transaction.id}&type=${transaction.type}&amount=${transaction.amount}&date=${transaction.date.getTime()}`;
    
    // Generate QR code using the QRCode library
    QRCode.toCanvas(qrContainer, receiptUrl, {
        width: 150,
        height: 150,
        color: {
            dark: '#2c3e50',
            light: '#ffffff'
        },
        margin: 2,
        errorCorrectionLevel: 'H'
    }, function (error) {
        if (error) {
            console.error('QR Code generation failed:', error);
            qrContainer.innerHTML = '<p style="color: #e74c3c;">QR Code generation failed</p>';
        }
    });
}

function printReceipt(type) {
    let transaction;
    
    if (type === 'balance') {
        // Create a balance inquiry transaction
        transaction = {
            id: generateTransactionId(),
            type: 'balance_inquiry',
            amount: 0,
            date: new Date(),
            balanceBefore: userBalance,
            balanceAfter: userBalance
        };
    } else {
        transaction = transactionHistory[transactionHistory.length - 1];
    }
    
    generateReceipt(transaction);
    showReceiptScreen();
}

// Utility functions
function formatCurrency(amount) {
    return amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

function formatTime(date) {
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
}

function formatDateTime(date) {
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateTransactionId() {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `TXN${timestamp.slice(-6)}${random}`;
}

// Navigation functions
function newTransaction() {
    selectedAmount = 0;
    currentTransactionType = '';
    hideCustomAmountInput();
    showMenuScreen();
}

function logout() {
    // Reset all data
    currentPin = '';
    selectedAmount = 0;
    currentTransactionType = '';
    hideCustomAmountInput();
    updateLastUpdated();
    
    // Show welcome screen
    showScreen('welcome-screen');
}

// Keyboard support for PIN entry
document.addEventListener('keydown', function(event) {
    const activeScreen = document.querySelector('.screen.active');
    
    if (activeScreen && activeScreen.id === 'pin-screen') {
        const key = event.key;
        
        if (key >= '0' && key <= '9') {
            event.preventDefault();
            addPin(key);
        } else if (key === 'Backspace') {
            event.preventDefault();
            clearPin();
        } else if (key === 'Enter') {
            event.preventDefault();
            validatePin();
        }
    }
});

// Custom amount input handling
document.addEventListener('keydown', function(event) {
    const customAmountInput = document.getElementById('custom-amount');
    
    if (document.activeElement === customAmountInput && event.key === 'Enter') {
        event.preventDefault();
        selectCustomAmount();
    }
});

// Prevent context menu on buttons (more ATM-like experience)
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

// Add some demo transaction history on load
window.addEventListener('load', function() {
    // Add some sample transaction history
    transactionHistory.push({
        id: 'TXN123456ABC',
        type: 'deposit',
        amount: 1000,
        date: new Date(Date.now() - 86400000), // Yesterday
        balanceBefore: 4250,
        balanceAfter: 5250
    });
    
    transactionHistory.push({
        id: 'TXN789012DEF',
        type: 'withdraw',
        amount: 200,
        date: new Date(Date.now() - 172800000), // 2 days ago
        balanceBefore: 4450,
        balanceAfter: 4250
    });
});

// Auto-focus custom amount input when shown
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            const customAmountContainer = document.getElementById('custom-amount-input');
            if (customAmountContainer.style.display === 'flex') {
                setTimeout(() => {
                    document.getElementById('custom-amount').focus();
                }, 100);
            }
        }
    });
});

// Start observing the custom amount container
document.addEventListener('DOMContentLoaded', function() {
    const customAmountContainer = document.getElementById('custom-amount-input');
    if (customAmountContainer) {
        observer.observe(customAmountContainer, { attributes: true });
    }
});

// Animation for successful transactions
function showSuccessAnimation() {
    const screen = document.querySelector('.screen.active');
    screen.style.animation = 'none';
    screen.offsetHeight; // Trigger reflow
    screen.style.animation = 'fadeIn 0.5s ease-in-out';
}

// Add loading states for better UX
function addLoadingState(buttonElement) {
    const originalContent = buttonElement.innerHTML;
    buttonElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    buttonElement.disabled = true;
    
    return function removeLoadingState() {
        buttonElement.innerHTML = originalContent;
        buttonElement.disabled = false;
    };
}

// Console welcome message
console.log('🏧 ATM Simulator loaded successfully!');
console.log('🔑 Demo PIN: 1234');
console.log('💰 Starting balance: $5,250.00');
console.log('📱 QR codes will redirect to: https://securebank.com/receipt/...');