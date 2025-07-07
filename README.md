# 🏧 ATM Simulator

A fully-featured ATM (Automated Teller Machine) simulator built with HTML, CSS, and JavaScript. This web application provides a realistic ATM experience with a beautiful modern UI and complete transaction functionality.

## ✨ Features

### 🔐 Security
- PIN-based authentication (Demo PIN: **1234**)
- Secure PIN entry with visual feedback
- Session management and automatic logout

### 💰 Transaction Types
- **Cash Withdrawal** - Withdraw money from your account
- **Cash Deposit** - Deposit money into your account
- **Balance Inquiry** - Check your current account balance
- **Money Transfer** - Transfer funds (simulation)

### 🎯 User Experience
- **Beautiful Modern UI** - Gradient backgrounds, smooth animations, and intuitive design
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Keyboard Support** - Use keyboard for PIN entry and navigation
- **Real-time Balance Updates** - See balance changes immediately
- **Transaction Validation** - Prevents invalid transactions (insufficient funds, etc.)
- **Loading States** - Visual feedback during processing

### 🧾 Receipt System
- **Detailed Transaction Receipts** - Complete transaction information
- **Unique QR Codes** - Each transaction generates a unique QR code
- **QR Code Redirection** - Scanning redirects to a receipt URL
- **Printable Format** - Clean, printer-friendly receipt design

### 📱 QR Code Features
- **Automatic Generation** - QR codes generated for every transaction
- **Embedded URLs** - Contains transaction details and redirect link
- **High Quality** - 150x150px with error correction
- **Secure Format** - Includes transaction ID, type, amount, and timestamp

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for CDN resources)

### Installation
1. Download or clone the repository
2. Open `index.html` in your web browser
3. Start using the ATM simulator!

### Demo Credentials
- **PIN**: `1234`
- **Starting Balance**: $5,250.00
- **Account Number**: ****-****-****-1234

## 🎮 How to Use

### Step 1: Welcome Screen
- Click "Continue" to start the ATM session

### Step 2: PIN Entry
- Enter the 4-digit PIN: **1234**
- Use on-screen keypad or physical keyboard
- Click ✓ or press Enter to validate

### Step 3: Main Menu
Choose from four options:
- 💵 **Withdraw Cash** - Remove money from account
- 🐷 **Deposit Cash** - Add money to account
- 📊 **Check Balance** - View current balance
- 🔄 **Transfer Money** - Send money (simulation)

### Step 4: Complete Transaction
- Select or enter amount
- Confirm transaction
- Wait for processing
- Receive digital receipt with QR code

### Step 5: QR Code
- Each transaction generates a unique QR code
- Scanning redirects to: `https://securebank.com/receipt?id=...`
- Contains all transaction details

## 🛠 Technical Details

### Technologies Used
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)** - Interactive functionality and DOM manipulation
- **QRCode.js** - QR code generation library

### CDN Dependencies
- [Google Fonts (Roboto)](https://fonts.google.com/)
- [Font Awesome Icons](https://fontawesome.com/)
- [QRCode.js Library](https://github.com/davidshimjs/qrcodejs)

### File Structure
```
atm-simulator/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # Documentation
```

### Key Functions
- `showScreen()` - Navigate between different screens
- `validatePin()` - Authenticate user with PIN
- `processTransaction()` - Handle all transaction types
- `generateQRCode()` - Create unique QR codes
- `formatCurrency()` - Format monetary values

## 🎨 Design Features

### Visual Elements
- **Gradient Backgrounds** - Modern color schemes
- **Animated Borders** - Glowing ATM frame effect
- **Smooth Transitions** - Fade-in animations between screens
- **Interactive Buttons** - Hover effects and visual feedback
- **Loading Spinners** - Processing indicators

### Responsive Breakpoints
- **Desktop**: > 600px
- **Tablet**: 400px - 600px
- **Mobile**: < 400px

## 🔧 Customization

### Changing the PIN
Edit the `validPin` variable in `script.js`:
```javascript
const validPin = '1234'; // Change to your desired PIN
```

### Modifying Starting Balance
Update the `userBalance` variable:
```javascript
let userBalance = 5250.00; // Change to desired amount
```

### Customizing QR Code URL
Modify the `receiptUrl` in `generateQRCode()` function:
```javascript
const receiptUrl = `https://your-domain.com/receipt?id=${transaction.id}`;
```

## 🌟 Future Enhancements

- [ ] Multiple account support
- [ ] Transaction history view
- [ ] Email receipt option
- [ ] Voice guidance
- [ ] Biometric authentication simulation
- [ ] Multiple currency support
- [ ] Advanced security features

## 🐛 Known Issues

- QR codes require internet connection for generation
- Demo data resets on page refresh
- Limited to single user session

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For questions or support, please open an issue in the repository.

---

**Enjoy your ATM simulation experience!** 🏧✨