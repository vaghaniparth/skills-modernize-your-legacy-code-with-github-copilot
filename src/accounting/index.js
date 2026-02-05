#!/usr/bin/env node

/**
 * School Accounting System - Node.js Modernization
 * 
 * Converted from COBOL (main.cob, data.cob, operations.cob)
 * Preserves original business logic and menu-driven interface
 * 
 * Architecture:
 * - Data Layer (DataProgram): Manages account balance
 * - Operations Layer (Operations): Implements business logic
 * - Presentation Layer (MainProgram): Menu interface
 */

import PromptSync from 'prompt-sync';

// Initialize prompt for synchronous user input
const prompt = PromptSync();

/**
 * DATA LAYER
 * Equivalent to data.cob (DataProgram)
 * Manages the persistent account balance
 */
class DataProgram {
  constructor() {
    // STORAGE-BALANCE PIC 9(6)V99 VALUE 1000.00
    this.storageBalance = 1000.00;
  }

  /**
   * READ Operation
   * Retrieves current account balance
   * Equivalent to: IF OPERATION-TYPE = 'READ' MOVE STORAGE-BALANCE TO BALANCE
   */
  read() {
    return this.storageBalance;
  }

  /**
   * WRITE Operation
   * Updates account balance
   * Equivalent to: IF OPERATION-TYPE = 'WRITE' MOVE BALANCE TO STORAGE-BALANCE
   */
  write(newBalance) {
    // Validate balance is within PIC 9(6)V99 range (0.00 to 999999.99)
    if (newBalance < 0 || newBalance > 999999.99) {
      throw new Error(`Balance ${newBalance} exceeds field capacity (0.00 to 999999.99)`);
    }
    this.storageBalance = parseFloat(newBalance.toFixed(2));
  }

  /**
   * Get current balance
   * Helper method for display
   */
  getBalance() {
    return this.storageBalance.toFixed(2);
  }
}

/**
 * OPERATIONS LAYER
 * Equivalent to operations.cob (Operations)
 * Implements business logic for account operations
 */
class Operations {
  constructor(dataProgram) {
    this.dataProgram = dataProgram;
    // AMOUNT PIC 9(6)V99
    this.amount = 0;
    // FINAL-BALANCE PIC 9(6)V99 VALUE 1000.00
    this.finalBalance = 1000.00;
  }

  /**
   * TOTAL Operation
   * Equivalent to: IF OPERATION-TYPE = 'TOTAL'
   * Displays current account balance
   */
  viewBalance() {
    try {
      // CALL 'DataProgram' USING 'READ', FINAL-BALANCE
      this.finalBalance = this.dataProgram.read();
      
      // DISPLAY "Current balance: " FINAL-BALANCE
      console.log(`Current balance: ${this.finalBalance.toFixed(2)}`);
      return true;
    } catch (error) {
      console.error(`Error retrieving balance: ${error.message}`);
      return false;
    }
  }

  /**
   * CREDIT Operation
   * Equivalent to: IF OPERATION-TYPE = 'CREDIT'
   * Adds specified amount to account balance
   * No validation - credits are unrestricted
   */
  creditAccount() {
    try {
      // DISPLAY "Enter credit amount: "
      // ACCEPT AMOUNT
      const amountStr = prompt('Enter credit amount: ');
      this.amount = parseFloat(amountStr);

      // Validate numeric input
      if (isNaN(this.amount) || this.amount < 0) {
        console.log('Invalid amount. Please enter a positive number.');
        return false;
      }

      // CALL 'DataProgram' USING 'READ', FINAL-BALANCE
      this.finalBalance = this.dataProgram.read();
      
      // ADD AMOUNT TO FINAL-BALANCE
      this.finalBalance = this.finalBalance + this.amount;

      // CALL 'DataProgram' USING 'WRITE', FINAL-BALANCE
      this.dataProgram.write(this.finalBalance);
      
      // DISPLAY "Amount credited. New balance: " FINAL-BALANCE
      console.log(`Amount credited. New balance: ${this.finalBalance.toFixed(2)}`);
      return true;
    } catch (error) {
      console.error(`Error in credit operation: ${error.message}`);
      return false;
    }
  }

  /**
   * DEBIT Operation
   * Equivalent to: IF OPERATION-TYPE = 'DEBIT'
   * Removes specified amount from account balance
   * Includes overdraft protection validation
   */
  debitAccount() {
    try {
      // DISPLAY "Enter debit amount: "
      // ACCEPT AMOUNT
      const amountStr = prompt('Enter debit amount: ');
      this.amount = parseFloat(amountStr);

      // Validate numeric input
      if (isNaN(this.amount) || this.amount < 0) {
        console.log('Invalid amount. Please enter a positive number.');
        return false;
      }

      // CALL 'DataProgram' USING 'READ', FINAL-BALANCE
      this.finalBalance = this.dataProgram.read();

      // IF FINAL-BALANCE >= AMOUNT (Overdraft protection)
      if (this.finalBalance >= this.amount) {
        // SUBTRACT AMOUNT FROM FINAL-BALANCE
        this.finalBalance = this.finalBalance - this.amount;
        
        // CALL 'DataProgram' USING 'WRITE', FINAL-BALANCE
        this.dataProgram.write(this.finalBalance);
        
        // DISPLAY "Amount debited. New balance: " FINAL-BALANCE
        console.log(`Amount debited. New balance: ${this.finalBalance.toFixed(2)}`);
        return true;
      } else {
        // ELSE DISPLAY "Insufficient funds for this debit."
        console.log('Insufficient funds for this debit.');
        return false;
      }
    } catch (error) {
      console.error(`Error in debit operation: ${error.message}`);
      return false;
    }
  }
}

/**
 * PRESENTATION LAYER
 * Equivalent to main.cob (MainProgram)
 * Displays menu and routes user requests
 */
class MainProgram {
  constructor() {
    // Initialize data and operations layers
    this.dataProgram = new DataProgram();
    this.operations = new Operations(this.dataProgram);
    
    // USER-CHOICE PIC 9 VALUE 0
    this.userChoice = 0;
    
    // CONTINUE-FLAG PIC X(3) VALUE 'YES'
    this.continueFlag = 'YES';
  }

  /**
   * Display main menu
   * Equivalent to menu display in main.cob
   */
  displayMenu() {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');
  }

  /**
   * Main program logic
   * Equivalent to MAIN-LOGIC in main.cob
   * PERFORM UNTIL CONTINUE-FLAG = 'NO'
   */
  run() {
    console.log('\n=== School Accounting System - Account Management ===\n');

    // PERFORM UNTIL CONTINUE-FLAG = 'NO'
    while (this.continueFlag === 'YES') {
      this.displayMenu();
      
      // DISPLAY "Enter your choice (1-4): "
      // ACCEPT USER-CHOICE
      const choiceStr = prompt('Enter your choice (1-4): ');
      this.userChoice = parseInt(choiceStr);

      // EVALUATE USER-CHOICE
      switch (this.userChoice) {
        case 1:
          // WHEN 1: CALL 'Operations' USING 'TOTAL '
          this.operations.viewBalance();
          break;
        
        case 2:
          // WHEN 2: CALL 'Operations' USING 'CREDIT'
          this.operations.creditAccount();
          break;
        
        case 3:
          // WHEN 3: CALL 'Operations' USING 'DEBIT '
          this.operations.debitAccount();
          break;
        
        case 4:
          // WHEN 4: MOVE 'NO' TO CONTINUE-FLAG
          this.continueFlag = 'NO';
          break;
        
        default:
          // WHEN OTHER: DISPLAY "Invalid choice, please select 1-4."
          console.log('Invalid choice, please select 1-4.');
      }
      // END-EVALUATE

      // Add blank line for readability
      if (this.continueFlag === 'YES') {
        console.log('');
      }
    }

    // DISPLAY "Exiting the program. Goodbye!"
    console.log('\nExiting the program. Goodbye!');
    // STOP RUN
    process.exit(0);
  }
}

/**
 * APPLICATION ENTRY POINT
 * Equivalent to: STOP RUN in main.cob
 */
function main() {
  try {
    const program = new MainProgram();
    program.run();
  } catch (error) {
    console.error('Fatal error:', error.message);
    process.exit(1);
  }
}

// Export classes for testing
export { DataProgram, Operations, MainProgram };

// Execute main program only if running directly (not imported in tests)
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
