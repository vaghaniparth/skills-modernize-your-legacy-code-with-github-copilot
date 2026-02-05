/**
 * Unit Tests for Account Management System
 * 
 * Comprehensive test suite for modernized banking application
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { DataStore, Operations, AccountManagementSystem } from './index.js';

/**
 * DataStore Tests
 */
test('DataStore - should initialize with default balance', () => {
  const store = new DataStore();
  assert.strictEqual(store.read(), 1000.00);
});

test('DataStore - should initialize with custom balance', () => {
  const store = new DataStore(5000.50);
  assert.strictEqual(store.read(), 5000.50);
});

test('DataStore - should throw error for negative initial balance', () => {
  assert.throws(() => {
    new DataStore(-100);
  }, /Initial balance must be a non-negative number/);
});

test('DataStore - should throw error for non-number initial balance', () => {
  assert.throws(() => {
    new DataStore('invalid');
  }, /Initial balance must be a non-negative number/);
});

test('DataStore - should read current balance', () => {
  const store = new DataStore(2500.75);
  assert.strictEqual(store.read(), 2500.75);
});

test('DataStore - should write new balance', () => {
  const store = new DataStore(1000);
  store.write(1500.25);
  assert.strictEqual(store.read(), 1500.25);
});

test('DataStore - should throw error when writing negative balance', () => {
  const store = new DataStore(1000);
  assert.throws(() => {
    store.write(-500);
  }, /Balance must be a non-negative number/);
});

test('DataStore - should throw error when writing non-number balance', () => {
  const store = new DataStore(1000);
  assert.throws(() => {
    store.write('invalid');
  }, /Balance must be a non-negative number/);
});

test('DataStore - should format balance correctly', () => {
  const store = new DataStore(1234.5);
  assert.strictEqual(store.getFormattedBalance(), '1234.50');
});

test('DataStore - should format whole number balance with decimals', () => {
  const store = new DataStore(1000);
  assert.strictEqual(store.getFormattedBalance(), '1000.00');
});

/**
 * Operations Tests
 */
test('Operations - should require valid DataStore instance', () => {
  assert.throws(() => {
    new Operations(null);
  }, /Operations requires a valid DataStore instance/);
});

test('Operations - should view balance', () => {
  const store = new DataStore(1000);
  const ops = new Operations(store);
  const balance = ops.viewBalance();
  assert.strictEqual(balance, 1000);
});

test('Operations - should credit amount successfully', () => {
  const store = new DataStore(1000);
  const ops = new Operations(store);
  const newBalance = ops.credit(250.50);
  assert.strictEqual(newBalance, 1250.50);
  assert.strictEqual(store.read(), 1250.50);
});

test('Operations - should throw error for negative credit amount', () => {
  const store = new DataStore(1000);
  const ops = new Operations(store);
  assert.throws(() => {
    ops.credit(-100);
  }, /Credit amount must be a positive number/);
});

test('Operations - should throw error for zero credit amount', () => {
  const store = new DataStore(1000);
  const ops = new Operations(store);
  assert.throws(() => {
    ops.credit(0);
  }, /Credit amount must be a positive number/);
});

test('Operations - should throw error for non-number credit amount', () => {
  const store = new DataStore(1000);
  const ops = new Operations(store);
  assert.throws(() => {
    ops.credit('invalid');
  }, /Credit amount must be a positive number/);
});

test('Operations - should debit amount successfully with sufficient funds', () => {
  const store = new DataStore(1000);
  const ops = new Operations(store);
  const newBalance = ops.debit(300.25);
  assert.strictEqual(newBalance, 699.75);
  assert.strictEqual(store.read(), 699.75);
});

test('Operations - should throw error for insufficient funds', () => {
  const store = new DataStore(500);
  const ops = new Operations(store);
  assert.throws(() => {
    ops.debit(600);
  }, /Insufficient funds for this debit/);
  // Balance should remain unchanged
  assert.strictEqual(store.read(), 500);
});

test('Operations - should throw error for negative debit amount', () => {
  const store = new DataStore(1000);
  const ops = new Operations(store);
  assert.throws(() => {
    ops.debit(-100);
  }, /Debit amount must be a positive number/);
});

test('Operations - should throw error for zero debit amount', () => {
  const store = new DataStore(1000);
  const ops = new Operations(store);
  assert.throws(() => {
    ops.debit(0);
  }, /Debit amount must be a positive number/);
});

test('Operations - should throw error for non-number debit amount', () => {
  const store = new DataStore(1000);
  const ops = new Operations(store);
  assert.throws(() => {
    ops.debit('invalid');
  }, /Debit amount must be a positive number/);
});

test('Operations - should allow debit equal to balance', () => {
  const store = new DataStore(1000);
  const ops = new Operations(store);
  const newBalance = ops.debit(1000);
  assert.strictEqual(newBalance, 0);
  assert.strictEqual(store.read(), 0);
});

test('Operations - should handle multiple transactions correctly', () => {
  const store = new DataStore(1000);
  const ops = new Operations(store);
  
  ops.credit(500);      // 1500
  ops.debit(200);       // 1300
  ops.credit(100.50);   // 1400.50
  ops.debit(400.50);    // 1000
  
  assert.strictEqual(store.read(), 1000);
});

test('Operations - should maintain precision with decimal amounts', () => {
  const store = new DataStore(1000);
  const ops = new Operations(store);
  
  ops.credit(0.01);
  ops.credit(0.01);
  ops.debit(0.01);
  
  // Should be 1000.01 (floating point might have small errors)
  assert.strictEqual(Math.round(store.read() * 100) / 100, 1000.01);
});

/**
 * AccountManagementSystem Tests
 */
test('AccountManagementSystem - should require valid Operations instance', () => {
  assert.throws(() => {
    new AccountManagementSystem(null);
  }, /AccountManagementSystem requires a valid Operations instance/);
});

test('AccountManagementSystem - should initialize successfully', () => {
  const store = new DataStore(1000);
  const ops = new Operations(store);
  const system = new AccountManagementSystem(ops);
  assert.ok(system);
  system.close();
});

/**
 * Integration Tests
 */
test('Integration - complete workflow with multiple operations', () => {
  const store = new DataStore(1000);
  const ops = new Operations(store);
  
  // Verify initial balance
  assert.strictEqual(ops.viewBalance(), 1000);
  
  // Credit account
  ops.credit(500);
  assert.strictEqual(store.read(), 1500);
  
  // Debit account
  ops.debit(300);
  assert.strictEqual(store.read(), 1200);
  
  // Try to debit more than available
  assert.throws(() => {
    ops.debit(1500);
  }, /Insufficient funds/);
  
  // Balance should remain unchanged after failed debit
  assert.strictEqual(store.read(), 1200);
});

test('Integration - edge case with zero balance', () => {
  const store = new DataStore(100);
  const ops = new Operations(store);
  
  // Debit entire balance
  ops.debit(100);
  assert.strictEqual(store.read(), 0);
  
  // Cannot debit from zero balance
  assert.throws(() => {
    ops.debit(1);
  }, /Insufficient funds/);
  
  // Credit to zero balance
  ops.credit(50);
  assert.strictEqual(store.read(), 50);
});

test('Integration - large amounts handling', () => {
  const store = new DataStore(999999.99);
  const ops = new Operations(store);
  
  ops.credit(0.01);
  assert.strictEqual(store.read(), 1000000);
  
  ops.debit(1000000);
  assert.strictEqual(store.read(), 0);
});

test('Integration - data integrity across operations', () => {
  const store = new DataStore(1000);
  const ops = new Operations(store);
  
  // Perform 100 small credits
  for (let i = 0; i < 100; i++) {
    ops.credit(1);
  }
  assert.strictEqual(store.read(), 1100);
  
  // Perform 50 small debits
  for (let i = 0; i < 50; i++) {
    ops.debit(1);
  }
  assert.strictEqual(store.read(), 1050);
});

console.log('\n✅ All tests completed!\n');
