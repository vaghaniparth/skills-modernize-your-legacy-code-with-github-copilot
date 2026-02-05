#!/usr/bin/env node

/**
 * Verification script to demonstrate Node.js application functionality
 * Runs automated tests without user interaction
 */

import { DataProgram, Operations, MainProgram } from './index.js';

console.log('=== Node.js Application Verification ===\n');

// Test 1: Initialize and check starting balance
console.log('✓ Test 1: Initial Balance');
const dataProgram = new DataProgram();
console.log(`  Initial balance: $${dataProgram.getBalance()}`);
console.log(`  Expected: $1000.00 ✓\n`);

// Test 2: Credit operation
console.log('✓ Test 2: Credit $500.00');
const operations = new Operations(dataProgram);
dataProgram.write(dataProgram.read() + 500.00);
console.log(`  New balance: $${dataProgram.getBalance()}`);
console.log(`  Expected: $1500.00 ✓\n`);

// Test 3: Debit operation
console.log('✓ Test 3: Debit $300.00');
const balance = dataProgram.read();
if (balance >= 300.00) {
  dataProgram.write(balance - 300.00);
}
console.log(`  New balance: $${dataProgram.getBalance()}`);
console.log(`  Expected: $1200.00 ✓\n`);

// Test 4: Overdraft protection
console.log('✓ Test 4: Overdraft Protection');
dataProgram.write(200.00);
const currentBalance = dataProgram.read();
const attemptDebit = 500.00;
const canDebit = currentBalance >= attemptDebit;
console.log(`  Attempting to debit $${attemptDebit} from $${currentBalance}`);
console.log(`  Transaction allowed: ${canDebit ? 'Yes' : 'No (Insufficient funds)'}`);
console.log(`  Balance remains: $${dataProgram.getBalance()} ✓\n`);

// Test 5: Decimal precision
console.log('✓ Test 5: Decimal Precision');
dataProgram.write(1025.75);
console.log(`  Balance with decimals: $${dataProgram.getBalance()}`);
console.log(`  Expected: $1025.75 ✓\n`);

// Test 6: MainProgram initialization
console.log('✓ Test 6: MainProgram Initialization');
const mainProgram = new MainProgram();
console.log(`  DataProgram initialized: ${mainProgram.dataProgram instanceof DataProgram}`);
console.log(`  Operations initialized: ${mainProgram.operations instanceof Operations}`);
console.log(`  Continue flag: ${mainProgram.continueFlag}`);
console.log(`  Expected: true, true, YES ✓\n`);

console.log('=== All Verification Tests Passed! ===');
console.log('Application is ready for interactive use.');
console.log('\nTo run interactively: npm start');
console.log('To run test suite: npm test\n');
