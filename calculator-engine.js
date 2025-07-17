/**
 * Calculator Engine Module
 * Core calculation logic and state management
 */
export class CalculatorEngine {
    constructor() {
        this.state = {
            currentNumber: "0",
            previousNumber: null,
            operator: null,
            waitingForOperand: false,
            justCalculated: false
        };
    }

    /**
     * Handles digit input for number entry
     * @param {string} digit - The digit to input (0-9)
     * @returns {string} - The updated current number
     */
    inputNumber(digit) {
        if (typeof digit !== 'string' || !/^[0-9]$/.test(digit)) {
            throw new Error('Invalid digit input');
        }

        // If we just calculated, start fresh with new number
        if (this.state.justCalculated) {
            this.state.currentNumber = digit;
            this.state.justCalculated = false;
            this.state.waitingForOperand = false;
            return this.state.currentNumber;
        }

        // If waiting for operand or current number is "0", replace it
        if (this.state.waitingForOperand || this.state.currentNumber === "0") {
            this.state.currentNumber = digit;
            this.state.waitingForOperand = false;
        } else {
            // Append digit to current number (with length limit)
            // For decimal numbers, we need to be more careful about the limit
            const currentDigits = this.state.currentNumber.replace(/[^0-9]/g, '');
            const hasDecimal = this.state.currentNumber.includes('.');
            
            // Allow more digits if we have a decimal point (reasonable display limit)
            const maxDigits = hasDecimal ? 15 : 10;
            
            if (currentDigits.length < maxDigits) {
                this.state.currentNumber += digit;
            }
        }

        return this.state.currentNumber;
    }

    /**
     * Clears all calculator state (C button)
     */
    clear() {
        this.state = {
            currentNumber: "0",
            previousNumber: null,
            operator: null,
            waitingForOperand: false,
            justCalculated: false
        };
    }

    /**
     * Clears only the current entry (CE button)
     */
    clearEntry() {
        this.state.currentNumber = "0";
        this.state.waitingForOperand = false;
        this.state.justCalculated = false;
    }

    /**
     * Gets a copy of the current calculator state
     * @returns {Object} - Copy of the current state
     */
    getCurrentState() {
        return { ...this.state };
    }

    /**
     * Gets the current display value
     * @returns {string} - The value that should be displayed
     */
    getDisplayValue() {
        return this.state.currentNumber;
    }

    /**
     * Handles operator input (+, -, ×, ÷)
     * @param {string} operator - The operator to input
     * @returns {string} - The current display value
     */
    inputOperator(operator) {
        const validOperators = ['+', '-', '×', '÷', '*', '/'];
        if (!validOperators.includes(operator)) {
            throw new Error('Invalid operator');
        }

        // Normalize multiplication and division symbols
        const normalizedOperator = operator === '*' ? '×' : operator === '/' ? '÷' : operator;

        // If we just calculated, use the result as the first operand
        if (this.state.justCalculated) {
            this.state.previousNumber = this.state.currentNumber;
            this.state.operator = normalizedOperator;
            this.state.waitingForOperand = true;
            this.state.justCalculated = false;
            return this.state.currentNumber;
        }

        // If we have a previous number and operator, and we're not waiting for operand, calculate first
        if (this.state.previousNumber !== null && this.state.operator && !this.state.waitingForOperand) {
            const result = this.performCalculation();
            this.state.currentNumber = result;
            this.state.previousNumber = result;
        } else {
            // Store current number as previous number
            this.state.previousNumber = this.state.currentNumber;
        }

        this.state.operator = normalizedOperator;
        this.state.waitingForOperand = true;

        return this.state.currentNumber;
    }

    /**
     * Performs the calculation and returns the result
     * @returns {string} - The calculation result
     */
    calculate() {
        if (this.state.previousNumber === null || this.state.operator === null) {
            return this.state.currentNumber;
        }

        const result = this.performCalculation();
        
        // Update state after calculation
        this.state.currentNumber = result;
        this.state.previousNumber = null;
        this.state.operator = null;
        this.state.waitingForOperand = false;
        this.state.justCalculated = true;

        return result;
    }

    /**
     * Performs the actual arithmetic calculation
     * @returns {string} - The calculation result
     * @private
     */
    performCalculation() {
        const prev = parseFloat(this.state.previousNumber);
        const current = parseFloat(this.state.currentNumber);

        if (isNaN(prev) || isNaN(current)) {
            throw new Error('Invalid numbers for calculation');
        }

        let result;

        switch (this.state.operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    throw new Error('Division by zero');
                }
                result = prev / current;
                break;
            default:
                throw new Error('Unknown operator');
        }

        // Handle floating point precision issues
        if (Number.isFinite(result)) {
            // Round to 10 decimal places to avoid floating point errors
            result = Math.round(result * 1e10) / 1e10;
        }

        return result.toString();
    }

    /**
     * Handles decimal point input
     * @returns {string} - The updated current number
     */
    inputDecimal() {
        // If we just calculated, start fresh with "0."
        if (this.state.justCalculated) {
            this.state.currentNumber = "0.";
            this.state.justCalculated = false;
            this.state.waitingForOperand = false;
            return this.state.currentNumber;
        }

        // If waiting for operand, start with "0."
        if (this.state.waitingForOperand) {
            this.state.currentNumber = "0.";
            this.state.waitingForOperand = false;
            return this.state.currentNumber;
        }

        // If current number already has a decimal point, ignore
        if (this.state.currentNumber.includes('.')) {
            return this.state.currentNumber;
        }

        // Add decimal point to current number
        this.state.currentNumber += '.';
        return this.state.currentNumber;
    }

    /**
     * Handles backspace functionality (delete last digit)
     * @returns {string} - The updated current number
     */
    inputBackspace() {
        // If we just calculated, treat backspace as clear entry
        if (this.state.justCalculated) {
            this.clearEntry();
            return this.state.currentNumber;
        }

        // If waiting for operand, clear the current number
        if (this.state.waitingForOperand) {
            this.state.currentNumber = "0";
            return this.state.currentNumber;
        }

        // If current number is "0" or single character, replace with "0"
        if (this.state.currentNumber === "0" || this.state.currentNumber.length <= 1) {
            this.state.currentNumber = "0";
            return this.state.currentNumber;
        }

        // Handle negative single digit numbers
        if (this.state.currentNumber.length === 2 && this.state.currentNumber.startsWith('-')) {
            this.state.currentNumber = "0";
            return this.state.currentNumber;
        }

        // Remove last character
        this.state.currentNumber = this.state.currentNumber.slice(0, -1);
        
        // If we removed everything, set to "0"
        if (this.state.currentNumber === '' || this.state.currentNumber === '-') {
            this.state.currentNumber = "0";
        }

        return this.state.currentNumber;
    }
}