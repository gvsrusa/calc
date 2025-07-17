/**
 * Browser Calculator - Simple Working Version
 * Restored to working functionality from tasks 1-6
 */

// Import the CalculatorEngine
import { CalculatorEngine } from './calculator-engine.js';

// Global calculator state
let calculator = {
    engine: null,
    display: null,
    isInitialized: false
};

/**
 * Initialize the calculator when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    
    try {
        // Initialize calculator engine
        calculator.engine = new CalculatorEngine();
        
        // Get display element
        const displayElement = document.getElementById('display-text');
        if (!displayElement) {
            throw new Error('Display element not found');
        }
        
        // Initialize display
        calculator.display = {
            element: displayElement,
            update: function(value) {
                this.element.textContent = formatDisplayValue(value);
            },
            clear: function() {
                this.element.textContent = '0';
            }
        };
        
        // Initialize button event listeners
        initializeButtons();
        
        // Initialize keyboard support
        initializeKeyboard();
        
        // Set initial display
        calculator.display.update(calculator.engine.getDisplayValue());
        
        calculator.isInitialized = true;
        
        // Make calculator available globally for debugging
        window.calculator = calculator;
        
    } catch (error) {
        console.error('Failed to initialize calculator:', error);
        showError('Calculator initialization failed');
    }
});

/**
 * Initialize button event listeners
 */
function initializeButtons() {
    // Get all calculator buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
        
        // Add visual feedback
        button.addEventListener('mousedown', () => {
            button.classList.add('pressed');
        });
        
        button.addEventListener('mouseup', () => {
            button.classList.remove('pressed');
        });
        
        button.addEventListener('mouseleave', () => {
            button.classList.remove('pressed');
        });
    });
    

}

/**
 * Handle button click events
 */
function handleButtonClick(event) {
    const button = event.target;
    const action = button.dataset.action;
    const value = button.dataset.value;
    

    
    try {
        if (value !== undefined) {
            // Number button
            handleNumberInput(value);
        } else if (action) {
            // Action button
            handleActionInput(action);
        }
        
        // Add click animation
        button.classList.add('clicked');
        setTimeout(() => {
            button.classList.remove('clicked');
        }, 150);
        
    } catch (error) {
        console.error('Error handling button click:', error);
        showError('Error');
    }
}

/**
 * Handle number button input
 */
function handleNumberInput(digit) {
    const result = calculator.engine.inputNumber(digit);
    calculator.display.update(result);
}

/**
 * Handle action button input
 */
function handleActionInput(action) {
    try {
        switch (action) {
            case 'add':
                handleOperator('+');
                break;
            case 'subtract':
                handleOperator('-');
                break;
            case 'multiply':
                handleOperator('×');
                break;
            case 'divide':
                handleOperator('÷');
                break;
            case 'equals':
                handleEquals();
                break;
            case 'clear':
                handleClear();
                break;
            case 'clear-entry':
                handleClearEntry();
                break;
            case 'decimal':
                handleDecimal();
                break;
            case 'backspace':
                handleBackspace();
                break;
            default:
                console.warn('Unknown action:', action);
        }
    } catch (error) {
        console.error('Error in action handler:', error);
        if (error.message === 'Division by zero') {
            showError('Cannot divide by zero');
        } else {
            showError('Error');
        }
    }
}

/**
 * Handle operator input
 */
function handleOperator(operator) {
    const result = calculator.engine.inputOperator(operator);
    calculator.display.update(result);
    updateOperatorButtons(operator);
}

/**
 * Handle equals button
 */
function handleEquals() {
    const result = calculator.engine.calculate();
    calculator.display.update(result);
    clearOperatorButtons();
}

/**
 * Handle clear button
 */
function handleClear() {
    calculator.engine.clear();
    calculator.display.clear();
    clearOperatorButtons();
}

/**
 * Handle clear entry button
 */
function handleClearEntry() {
    calculator.engine.clearEntry();
    calculator.display.update(calculator.engine.getDisplayValue());
}

/**
 * Handle decimal button
 */
function handleDecimal() {
    const result = calculator.engine.inputDecimal();
    calculator.display.update(result);
}

/**
 * Handle backspace button
 */
function handleBackspace() {
    const result = calculator.engine.inputBackspace();
    calculator.display.update(result);
}

/**
 * Update operator button visual states
 */
function updateOperatorButtons(activeOperator) {
    // Clear all operator active states
    clearOperatorButtons();
    
    // Set active operator
    const operatorMap = {
        '+': 'add',
        '-': 'subtract',
        '×': 'multiply',
        '÷': 'divide'
    };
    
    const actionName = operatorMap[activeOperator];
    if (actionName) {
        const button = document.querySelector(`[data-action="${actionName}"]`);
        if (button) {
            button.classList.add('operator-active');
        }
    }
}

/**
 * Clear operator button active states
 */
function clearOperatorButtons() {
    const operatorButtons = document.querySelectorAll('.btn-operator');
    operatorButtons.forEach(button => {
        button.classList.remove('operator-active');
    });
}

/**
 * Initialize keyboard support
 */
function initializeKeyboard() {
    document.addEventListener('keydown', handleKeyPress);
}

/**
 * Handle keyboard input
 */
function handleKeyPress(event) {
    const key = event.key;
    
    // Prevent default for calculator keys
    if (isCalculatorKey(key)) {
        event.preventDefault();
    }
    
    try {
        // Handle number keys
        if (/^[0-9]$/.test(key)) {
            handleNumberInput(key);
            highlightButton(`[data-value="${key}"]`);
        }
        // Handle operator keys
        else if (key === '+') {
            handleOperator('+');
            highlightButton('[data-action="add"]');
        }
        else if (key === '-') {
            handleOperator('-');
            highlightButton('[data-action="subtract"]');
        }
        else if (key === '*') {
            handleOperator('×');
            highlightButton('[data-action="multiply"]');
        }
        else if (key === '/') {
            handleOperator('÷');
            highlightButton('[data-action="divide"]');
        }
        // Handle special keys
        else if (key === 'Enter' || key === '=') {
            handleEquals();
            highlightButton('[data-action="equals"]');
        }
        else if (key === 'Escape' || key.toLowerCase() === 'c') {
            handleClear();
            highlightButton('[data-action="clear"]');
        }
        else if (key === 'Backspace') {
            handleBackspace();
            highlightButton('[data-action="backspace"]');
        }
        else if (key === '.') {
            handleDecimal();
            highlightButton('[data-action="decimal"]');
        }
    } catch (error) {
        console.error('Error handling key press:', error);
        showError('Error');
    }
}

/**
 * Check if key is a calculator key
 */
function isCalculatorKey(key) {
    return /^[0-9+\-*/=.]$/.test(key) || 
           key === 'Enter' || 
           key === 'Escape' || 
           key === 'Backspace' ||
           key.toLowerCase() === 'c';
}

/**
 * Highlight button for keyboard feedback
 */
function highlightButton(selector) {
    const button = document.querySelector(selector);
    if (button) {
        button.classList.add('keyboard-active');
        setTimeout(() => {
            button.classList.remove('keyboard-active');
        }, 200);
    }
}

/**
 * Format display value
 */
function formatDisplayValue(value) {
    if (value === null || value === undefined) {
        return '0';
    }
    
    const str = String(value);
    
    // Handle special cases
    if (str === 'Infinity' || str === '-Infinity') {
        return 'Error';
    }
    
    if (str === 'NaN') {
        return 'Error';
    }
    
    // Handle very long numbers
    if (str.length > 12) {
        const num = parseFloat(str);
        if (!isNaN(num)) {
            // Use scientific notation for very large/small numbers
            if (Math.abs(num) >= 1e12 || (Math.abs(num) < 1e-6 && num !== 0)) {
                return num.toExponential(6);
            }
            // Truncate decimal places for long numbers
            return num.toPrecision(10);
        }
    }
    
    return str;
}

/**
 * Show error message
 */
function showError(message) {
    const displayElement = document.getElementById('display-text');
    if (displayElement) {
        displayElement.textContent = message;
        displayElement.parentElement.classList.add('error');
        
        // Clear error after 2 seconds
        setTimeout(() => {
            displayElement.parentElement.classList.remove('error');
            if (calculator.engine) {
                calculator.display.update(calculator.engine.getDisplayValue());
            }
        }, 2000);
    }
}

