# School Accounting System - Test Plan

## Overview

This test plan documents all functional test cases for the COBOL Account Management System. These tests validate the core business logic including balance inquiries, credit operations, debit operations with overdraft protection, and menu navigation. This plan serves as the foundation for unit and integration tests in the Node.js migration.

---

## Test Cases

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
|---|---|---|---|---|---|---|---|
| TC-001 | Display Main Menu | Application started | 1. Application launches<br>2. Verify menu options displayed | Menu displays with 4 options: View Balance, Credit Account, Debit Account, Exit | | | |
| TC-002 | View current account balance | Application started, Initial balance is $1000.00 | 1. Select menu option 1 (View Balance)<br>2. System retrieves balance from DataProgram | Display message: "Current balance: 1000.00" | | | |
| TC-003 | Credit account with valid amount | Initial balance: $1000.00 | 1. Select menu option 2 (Credit Account)<br>2. Enter amount: 500.00<br>3. System processes credit | Display: "Amount credited. New balance: 1500.00" | | | |
| TC-004 | Verify balance updated after credit | Initial balance: $1000.00, Previous credit of $500.00 completed | 1. Select menu option 1 (View Balance)<br>2. Verify new balance reflects credit | Display: "Current balance: 1500.00" | | | |
| TC-005 | Credit account with zero amount | Initial balance: $1000.00 | 1. Select menu option 2 (Credit Account)<br>2. Enter amount: 0.00<br>3. System processes credit | Display: "Amount credited. New balance: 1000.00" | | | |
| TC-006 | Credit account with large amount | Initial balance: $1000.00 | 1. Select menu option 2 (Credit Account)<br>2. Enter amount: 500000.00<br>3. System processes credit | Display: "Amount credited. New balance: 501000.00" | | | |
| TC-007 | Credit account with decimal amount | Initial balance: $1000.00 | 1. Select menu option 2 (Credit Account)<br>2. Enter amount: 250.50<br>3. System processes credit | Display: "Amount credited. New balance: 1250.50" | | | |
| TC-008 | Multiple consecutive credits | Initial balance: $1000.00 | 1. Credit $200.00 (result: $1200.00)<br>2. Credit $300.00 (result: $1500.00)<br>3. Credit $150.50 (result: $1650.50)<br>4. View balance | Balance accumulates correctly to $1650.50 | | | |
| TC-009 | Debit account with valid amount | Initial balance: $1000.00 | 1. Select menu option 3 (Debit Account)<br>2. Enter amount: 300.00<br>3. System validates and processes debit | Display: "Amount debited. New balance: 700.00" | | | |
| TC-010 | Verify balance updated after debit | Initial balance: $1000.00, Previous debit of $300.00 completed | 1. Select menu option 1 (View Balance)<br>2. Verify new balance reflects debit | Display: "Current balance: 700.00" | | | |
| TC-011 | Debit account with exact balance | Initial balance: $700.00 | 1. Select menu option 3 (Debit Account)<br>2. Enter amount: 700.00<br>3. System validates and processes debit | Display: "Amount debited. New balance: 0.00" | | | |
| TC-012 | Debit account with zero amount | Initial balance: $1000.00 | 1. Select menu option 3 (Debit Account)<br>2. Enter amount: 0.00<br>3. System processes debit | Display: "Amount debited. New balance: 1000.00" | | | |
| TC-013 | Debit account with insufficient funds | Initial balance: $500.00 | 1. Select menu option 3 (Debit Account)<br>2. Enter amount: 750.00<br>3. System validates balance | Display: "Insufficient funds for this debit."<br>Transaction rejected | | | |
| TC-014 | Verify balance unchanged after failed debit | Initial balance: $500.00, Previous debit of $750.00 failed | 1. Select menu option 1 (View Balance)<br>2. Verify balance unchanged | Display: "Current balance: 500.00" | | | |
| TC-015 | Debit with amount greater than max balance | Initial balance: $1000.00 | 1. Select menu option 3 (Debit Account)<br>2. Enter amount: 1000000.00<br>3. System validates balance | Display: "Insufficient funds for this debit."<br>Transaction rejected | | | |
| TC-016 | Debit with decimal amount | Initial balance: $1000.00 | 1. Select menu option 3 (Debit Account)<br>2. Enter amount: 350.75<br>3. System processes debit | Display: "Amount debited. New balance: 649.25" | | | |
| TC-017 | Multiple consecutive debits | Initial balance: $1000.00 | 1. Debit $100.00 (result: $900.00)<br>2. Debit $200.00 (result: $700.00)<br>3. Debit $50.50 (result: $649.50)<br>4. View balance | Balance decreases correctly to $649.50 | | | |
| TC-018 | Mixed credit and debit operations | Initial balance: $1000.00 | 1. Credit $300.00 (result: $1300.00)<br>2. Debit $200.00 (result: $1100.00)<br>3. Credit $500.00 (result: $1600.00)<br>4. Debit $150.00 (result: $1450.00)<br>5. View balance | Final balance correctly shows $1450.00 | | | |
| TC-019 | Overdraft protection - insufficient funds | Initial balance: $200.00 | 1. Select menu option 3 (Debit Account)<br>2. Enter amount: 500.00<br>3. System validates: 200.00 >= 500.00? No | Display: "Insufficient funds for this debit."<br>Balance remains $200.00 | | | |
| TC-020 | Boundary test - debit at exact balance limit | Initial balance: $450.00 | 1. Select menu option 3 (Debit Account)<br>2. Enter amount: 450.00<br>3. System validates: 450.00 >= 450.00? Yes | Display: "Amount debited. New balance: 0.00" | | | |
| TC-021 | Invalid menu choice - letter input | Application displays menu | 1. Select menu option<br>2. Enter invalid choice: 'A'<br>3. System evaluates input | Display: "Invalid choice, please select 1-4."<br>Menu displays again | | | |
| TC-022 | Invalid menu choice - special character | Application displays menu | 1. Select menu option<br>2. Enter invalid choice: '@'<br>3. System evaluates input | Display: "Invalid choice, please select 1-4."<br>Menu displays again | | | |
| TC-023 | Invalid menu choice - number out of range | Application displays menu | 1. Select menu option<br>2. Enter invalid choice: 5<br>3. System evaluates input | Display: "Invalid choice, please select 1-4."<br>Menu displays again | | | |
| TC-024 | Invalid menu choice - negative number | Application displays menu | 1. Select menu option<br>2. Enter invalid choice: -1<br>3. System evaluates input | Display: "Invalid choice, please select 1-4."<br>Menu displays again | | | |
| TC-025 | Exit program from main menu | Application displays menu | 1. Select menu option 4 (Exit)<br>2. System sets CONTINUE-FLAG to 'NO'<br>3. Program closes | Display: "Exiting the program. Goodbye!"<br>Application terminates | | | |
| TC-026 | Return to menu after balance inquiry | Balance displayed | 1. View Balance operation completes<br>2. Control returns to MainProgram<br>3. Menu displays again | Main menu displays and accepts next choice | | | |
| TC-027 | Return to menu after credit operation | Credit operation completes | 1. Credit operation completes<br>2. Control returns to MainProgram<br>3. Menu displays again | Main menu displays and accepts next choice | | | |
| TC-028 | Return to menu after failed debit | Debit operation fails (insufficient funds) | 1. Debit validation fails<br>2. Error message displays<br>3. Control returns to MainProgram | Main menu displays and accepts next choice | | | |
| TC-029 | Data persistence within session | Multiple operations completed | 1. Perform credit operation (+$500)<br>2. Perform debit operation (-$200)<br>3. View balance<br>4. Verify balance reflects all operations | Balance correctly shows accumulation of all operations | | | |
| TC-030 | Initial balance correctness | Application started fresh | 1. Launch application<br>2. Select View Balance (option 1)<br>3. Verify initial balance | Display: "Current balance: 1000.00" | | | |
| TC-031 | Credit operation data flow | Initial balance: $1000.00 | 1. Credit $100.00<br>2. Verify DataProgram READ called<br>3. Verify amount added<br>4. Verify DataProgram WRITE called | All steps execute in correct order, balance updates to $1100.00 | | | |
| TC-032 | Debit operation data flow with validation | Initial balance: $1000.00 | 1. Debit $300.00<br>2. Verify DataProgram READ called<br>3. Verify validation (1000 >= 300)<br>4. Verify amount subtracted<br>5. Verify DataProgram WRITE called | All steps execute in correct order, balance updates to $700.00 | | | |
| TC-033 | Debit operation data flow with validation failure | Initial balance: $200.00 | 1. Debit $500.00<br>2. Verify DataProgram READ called<br>3. Verify validation (200 >= 500) fails<br>4. Verify DataProgram WRITE NOT called | Validation fails, DataProgram WRITE skipped, balance unchanged at $200.00 | | | |
| TC-034 | Maximum balance capacity | Initial balance: $1000.00 | 1. Credit $900000.00<br>2. View balance<br>3. Verify balance within field limits (PIC 9(6)V99) | Balance updates to $901000.00 (within 999999.99 limit) | | | |
| TC-035 | Precision - two decimal places maintained | Initial balance: $1000.00 | 1. Credit $25.75<br>2. View balance<br>3. Verify decimal precision | Display: "Current balance: 1025.75" (2 decimals preserved) | | | |
| TC-036 | Operations module isolation | Multiple credits and debits | 1. Perform credit in Operations<br>2. Verify only Operations calls DataProgram<br>3. Verify MainProgram doesn't directly modify balance | All balance changes routed through Operations module | | | |
| TC-037 | Data module isolation | Multiple transactions | 1. Multiple operations modify balance<br>2. Verify only DataProgram manages STORAGE-BALANCE<br>3. Verify Operations only updates via DataProgram | All balance persistence managed solely by DataProgram | | | |
| TC-038 | Menu loop continuation | First operation completed | 1. Perform operation (View/Credit/Debit)<br>2. CONTINUE-FLAG remains 'YES'<br>3. Menu displays again<br>4. Verify loop continues | Menu displays continuously until option 4 selected | | | |
| TC-039 | Negative amount input - credit | Initial balance: $1000.00 | 1. Select credit operation<br>2. Enter amount: -500.00 | System behavior (accept or reject) - depends on validation | | | Test negative input handling |
| TC-040 | Negative amount input - debit | Initial balance: $1000.00 | 1. Select debit operation<br>2. Enter amount: -300.00 | System behavior (accept or reject) - depends on validation | | | Test negative input handling |

---

## Test Coverage Summary

### Functional Areas Covered

| Functional Area | Test Cases | Coverage |
|---|---|---|
| Menu Navigation | TC-001, TC-021, TC-022, TC-023, TC-024, TC-025, TC-026, TC-027, TC-028 | 9 tests |
| Balance Inquiry (TOTAL) | TC-002, TC-030, TC-004, TC-010, TC-014 | 5 tests |
| Credit Operations (CREDIT) | TC-003, TC-004, TC-005, TC-006, TC-007, TC-008, TC-031, TC-035, TC-034 | 9 tests |
| Debit Operations (DEBIT) | TC-009, TC-010, TC-011, TC-012, TC-013, TC-014, TC-015, TC-016, TC-017, TC-032, TC-033 | 11 tests |
| Mixed Operations | TC-018, TC-019, TC-020 | 3 tests |
| Data Persistence | TC-029, TC-037 | 2 tests |
| Module Isolation | TC-036, TC-037 | 2 tests |
| Data Flow Validation | TC-031, TC-032, TC-033 | 3 tests |
| **Total Test Cases** | | **40+ tests** |

---

## Critical Business Rules to Validate

1. **Initial Balance Rule** (TC-030)
   - All new sessions must start with $1,000.00 balance
   - Validation: TC-030

2. **Overdraft Prevention Rule** (TC-013, TC-014, TC-015, TC-019, TC-020)
   - Debits cannot exceed current balance
   - Transaction must be rejected if insufficient funds
   - Balance must not change on failed debit
   - Validation: TC-013, TC-014, TC-015, TC-019, TC-020

3. **Unrestricted Credit Rule** (TC-003, TC-005, TC-006, TC-038)
   - Credits may be any amount (zero to maximum field capacity)
   - No upper limit validation on credit amount
   - Validation: TC-003, TC-005, TC-006

4. **Decimal Precision Rule** (TC-007, TC-035)
   - All amounts maintain 2 decimal places
   - Calculations preserve cents
   - Validation: TC-007, TC-035

5. **State Management Rule** (TC-029)
   - Balance persists across multiple operations within session
   - Sequential operations accumulate correctly
   - Validation: TC-029

6. **Data Isolation Rule** (TC-036, TC-037)
   - Only DataProgram manages persistent balance
   - Operations module cannot bypass DataProgram
   - MainProgram cannot directly modify balance
   - Validation: TC-036, TC-037

---

## Edge Cases and Boundary Tests

| Edge Case | Test Case | Rationale |
|---|---|---|
| Zero Amount Transaction | TC-005, TC-012 | Verify system handles no-op transactions |
| Exact Balance Withdrawal | TC-011 | Boundary condition: balance becomes zero |
| Large Amount Credit | TC-006 | Verify system handles maximum field capacity |
| Large Amount Debit Rejection | TC-015 | Verify overdraft protection for large amounts |
| Decimal Precision | TC-007, TC-016, TC-035 | Ensure cents are preserved in calculations |
| Multiple Sequential Operations | TC-008, TC-017, TC-018 | Verify state accumulation |

---

## Test Execution Notes

### Prerequisites
- COBOL compiler (GnuCOBOL or equivalent)
- Application compiled successfully: `cobc -x src/cobol/main.cob src/cobol/operations.cob src/cobol/data.cob -o accountsystem`
- Test environment with clean application state per test case

### Clearing State Between Tests
- Restart application for each test case to reset STORAGE-BALANCE to $1000.00
- Or implement test setup to initialize balance before each test

### Test Automation Recommendations
- Manual testing suitable for initial validation
- For Node.js migration: Create Jest/Mocha test suite matching test cases
- Mock user input for automated testing
- Verify display output matches expected results
- Validate internal balance state matches display

### Known Limitations in Current COBOL Implementation
- No persistent storage across sessions (balance resets to $1000.00 on restart)
- No input validation for negative amounts
- No transaction history or audit logs
- Single account only
- No concurrent transaction support
- In-memory storage only

---

## Migration to Node.js

When migrating to Node.js, ensure:
1. All 40 test cases pass with equivalent logic
2. Initial balance defaults to $1,000.00
3. Overdraft protection remains enforced
4. Credit operations remain unrestricted
5. Two decimal place precision maintained
6. Module isolation pattern preserved (separate data, operations, presentation layers)
7. Menu-driven interface or API endpoints replicate functionality

