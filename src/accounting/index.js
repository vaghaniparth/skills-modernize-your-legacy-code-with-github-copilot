/**
 * Account Management System
 * 
 * Modern Node.js implementation of legacy COBOL banking application.
 * Provides account balance viewing, credit, and debit operations with
 * proper error handling and input validation.
 * 
 * @module AccountManagementSystem
 */

import readline from 'readline';

/**
 * DataStore class manages account balance persistence
 * Modernized from COBOL DataProgram
 */
class DataStore {
  #balance;

  /**
   * Initialize the data store with a default balance
   * @param {number} initialBalance - Starting balance (default: 1000.00)
   */
  constructor(initialBalance = 1000.00) {
    if (typeof initialBalance !== 'number' || initialBalance < 0) {
      throw new Error('Initial balance must be a non-negative number');
    }
    this.#balance = initialBalance;
  }

  /**
   * Read the current balance
   * @returns {number} Current account balance
   */
  read() {
    return this.#balance;
  }

  /**
   * Write a new balance value
   * @param {number} newBalance - The new balance to store
   * @throws {Error} If balance is invalid
   */
  write(newBalance) {
    if (typeof newBalance !== 'number' || newBalance < 0) {
      throw new Error('Balance must be a non-negative number');
    }
    this.#balance = newBalance;
  }

  /**
   * Get formatted balance string
   * @returns {string} Formatted balance with 2 decimal places
   */
  getFormattedBalance() {
    return this.#balance.toFixed(2);
  }
}

/**
 * Operations class handles account transactions
 * Modernized from COBOL Operations program
 */
class Operations {
  #dataStore;

  /**
   * Initialize operations with a data store
   * @param {DataStore} dataStore - The data store instance
   */
  constructor(dataStore) {
    if (!(dataStore instanceof DataStore)) {
      throw new Error('Operations requires a valid DataStore instance');
    }
    this.#dataStore = dataStore;
  }

  /**
   * Display current account balance
   */
  viewBalance() {
    try {
      const balance = this.#dataStore.read();
      console.log(`Current balance: ${this.#dataStore.getFormattedBalance()}`);
      return balance;
    } catch (error) {
      console.error('Error retrieving balance:', error.message);
      throw error;
    }
  }

  /**
   * Credit (add) amount to account
   * @param {number} amount - Amount to credit
   * @returns {number} New balance after credit
   * @throws {Error} If amount is invalid
   */
  credit(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('Credit amount must be a positive number');
    }

    try {
      const currentBalance = this.#dataStore.read();
      const newBalance = currentBalance + amount;
      this.#dataStore.write(newBalance);
      console.log(`Amount credited. New balance: ${this.#dataStore.getFormattedBalance()}`);
      return newBalance;
    } catch (error) {
      console.error('Error processing credit:', error.message);
      throw error;
    }
  }

  /**
   * Debit (subtract) amount from account with overdraft protection
   * @param {number} amount - Amount to debit
   * @returns {number} New balance after debit
   * @throws {Error} If amount is invalid or insufficient funds
   */
  debit(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('Debit amount must be a positive number');
    }

    try {
      const currentBalance = this.#dataStore.read();
      
      if (currentBalance < amount) {
        throw new Error('Insufficient funds for this debit');
      }

      const newBalance = currentBalance - amount;
      this.#dataStore.write(newBalance);
      console.log(`Amount debited. New balance: ${this.#dataStore.getFormattedBalance()}`);
      return newBalance;
    } catch (error) {
      console.error('Error processing debit:', error.message);
      throw error;
    }
  }
}

/**
 * AccountManagementSystem class - main application controller
 * Modernized from COBOL MainProgram
 */
class AccountManagementSystem {
  #operations;
  #rl;
  #isRunning;

  /**
   * Initialize the account management system
   * @param {Operations} operations - Operations instance for transactions
   */
  constructor(operations) {
    if (!(operations instanceof Operations)) {
      throw new Error('AccountManagementSystem requires a valid Operations instance');
    }
    this.#operations = operations;
    this.#rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.#isRunning = false;
  }

  /**
   * Display the main menu
   */
  #displayMenu() {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');
  }

  /**
   * Parse and validate amount input
   * @param {string} input - User input string
   * @returns {number} Parsed amount
   * @throws {Error} If input is invalid
   */
  #parseAmount(input) {
    const amount = parseFloat(input);
    if (isNaN(amount)) {
      throw new Error('Invalid amount. Please enter a valid number.');
    }
    if (amount <= 0) {
      throw new Error('Amount must be greater than zero.');
    }
    return amount;
  }

  /**
   * Handle view balance option
   */
  async #handleViewBalance() {
    try {
      this.#operations.viewBalance();
    } catch (error) {
      // Error already logged in operations
    }
    return this.#promptMenu();
  }

  /**
   * Handle credit account option
   */
  async #handleCredit() {
    return new Promise((resolve) => {
      this.#rl.question('Enter credit amount: ', (input) => {
        try {
          const amount = this.#parseAmount(input);
          this.#operations.credit(amount);
        } catch (error) {
          console.log(error.message);
        }
        resolve(this.#promptMenu());
      });
    });
  }

  /**
   * Handle debit account option
   */
  async #handleDebit() {
    return new Promise((resolve) => {
      this.#rl.question('Enter debit amount: ', (input) => {
        try {
          const amount = this.#parseAmount(input);
          this.#operations.debit(amount);
        } catch (error) {
          console.log(error.message);
        }
        resolve(this.#promptMenu());
      });
    });
  }

  /**
   * Handle user menu choice
   * @param {string} choice - User's menu selection
   */
  async #handleChoice(choice) {
    switch (choice) {
      case '1':
        return this.#handleViewBalance();
      case '2':
        return this.#handleCredit();
      case '3':
        return this.#handleDebit();
      case '4':
        console.log('Exiting the program. Goodbye!');
        this.#isRunning = false;
        this.#rl.close();
        return;
      default:
        console.log('Invalid choice, please select 1-4.');
        return this.#promptMenu();
    }
  }

  /**
   * Display menu and prompt for user choice
   */
  #promptMenu() {
    return new Promise((resolve) => {
      if (!this.#isRunning) {
        resolve();
        return;
      }

      this.#displayMenu();
      this.#rl.question('Enter your choice (1-4): ', (choice) => {
        resolve(this.#handleChoice(choice.trim()));
      });
    });
  }

  /**
   * Start the application main loop
   */
  async run() {
    this.#isRunning = true;
    console.log('\nWelcome to the Account Management System!\n');
    await this.#promptMenu();
  }

  /**
   * Cleanup resources
   */
  close() {
    this.#isRunning = false;
    this.#rl.close();
  }
}

/**
 * Main entry point - Initialize and run the application
 */
async function main() {
  let system = null;
  
  try {
    // Initialize the system with default balance of 1000.00
    const dataStore = new DataStore(1000.00);
    const operations = new Operations(dataStore);
    system = new AccountManagementSystem(operations);
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n\nReceived interrupt signal. Shutting down gracefully...');
      if (system) {
        system.close();
      }
      process.exit(0);
    });

    // Run the application
    await system.run();
  } catch (error) {
    console.error('Fatal error:', error.message);
    if (system) {
      system.close();
    }
    process.exit(1);
  }
}

// Export classes for testing
export { DataStore, Operations, AccountManagementSystem };

// Run main only if this is the entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
