# Browser Calculator

A modern, responsive calculator built with vanilla JavaScript, HTML, and CSS. Features a clean interface, full keyboard support, and accessibility features.

## ✨ Features

- **Full Calculator Functionality**: Basic arithmetic operations (+, -, ×, ÷)
- **Keyboard Support**: Use your keyboard for all operations
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Accessibility**: Screen reader support with ARIA labels
- **Visual Feedback**: Button animations and operator highlighting
- **Error Handling**: Division by zero and input validation
- **Decimal Support**: Handle decimal numbers with precision

## 🚀 Live Demo

[View Live Calculator](https://your-calculator.vercel.app)

## 🛠️ Technologies Used

- **HTML5**: Semantic structure with accessibility features
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **JavaScript ES6+**: Modular architecture with ES6 modules
- **No Dependencies**: Pure vanilla JavaScript, no frameworks required

## 📱 Responsive Design

The calculator adapts to different screen sizes:
- **Desktop**: Large buttons with hover effects
- **Tablet**: Touch-optimized button sizes
- **Mobile**: Compact layout with proper touch targets
- **Landscape**: Optimized for mobile landscape orientation

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `0-9` | Number input |
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `Enter` or `=` | Calculate result |
| `Escape` or `C` | Clear all |
| `Backspace` | Delete last digit |
| `.` | Decimal point |

## 🎯 Accessibility Features

- **ARIA Labels**: All buttons have descriptive labels
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper semantic structure
- **High Contrast**: Supports high contrast mode
- **Focus Indicators**: Clear focus states for keyboard users
- **Reduced Motion**: Respects user's motion preferences

## 📁 Project Structure

```
browser-calculator/
├── index.html          # Main HTML file
├── script.js           # Main JavaScript application
├── calculator-engine.js # Calculator logic and state management
├── styles.css          # All CSS styles and responsive design
└── README.md           # Project documentation
```

## 🔧 Local Development

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd browser-calculator
   ```

2. **Start a local server**:
   ```bash
   # Using Python
   python3 -m http.server 8080
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8080
   ```

3. **Open in browser**:
   ```
   http://localhost:8080
   ```

## 🚀 Deploy to Vercel

### Option 1: Deploy from GitHub

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial calculator implementation"
   git push origin main
   ```

2. **Deploy with Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

### Option 2: Deploy with Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow the prompts**:
   - Set up and deploy: `Y`
   - Which scope: Select your account
   - Link to existing project: `N`
   - Project name: `browser-calculator`
   - Directory: `./` (current directory)

### Option 3: Drag and Drop

1. Go to [vercel.com](https://vercel.com)
2. Drag and drop your project folder
3. Your calculator will be deployed instantly!

## 🔧 Configuration

No build process or configuration required! This is a static site that works out of the box.

### Vercel Configuration (Optional)

Create `vercel.json` for custom configuration:

```json
{
  "name": "browser-calculator",
  "version": 2,
  "public": true,
  "github": {
    "silent": true
  }
}
```

## 🧪 Testing

The calculator has been thoroughly tested for:
- ✅ Basic arithmetic operations
- ✅ Keyboard input handling
- ✅ Error scenarios (division by zero)
- ✅ Decimal number operations
- ✅ Responsive design across devices
- ✅ Accessibility compliance
- ✅ Cross-browser compatibility

## 🌟 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 60+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

MIT License - feel free to use this project for learning or personal use.

## 🤝 Contributing

This is a learning project, but suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Built with ❤️ using vanilla JavaScript**