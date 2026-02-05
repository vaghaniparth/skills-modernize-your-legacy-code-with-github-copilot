# School Accounting System - Node.js Implementation

## Overview

This is a Node.js modernization of the legacy COBOL Account Management System. The application preserves all original business logic, data flow, and menu-driven interface while leveraging modern JavaScript features.

## Architecture

The application follows the same three-layer architecture as the original COBOL system:

```
┌─────────────────────────────┐
│   MainProgram (Class)       │  ← Presentation Layer
│   - Menu Interface          │
│   - User Input Handling     │
└──────────┬──────────────────┘
           │
           ├─────────────────────────────┐
           │                             │
    ┌──────▼─────────────┐    ┌─────────▼────────┐
    │  Operations        │    │  DataProgram     │
    │  - Business Logic  │───→│  - Data Storage  │
    │  - Validation      │    │  - CRUD Ops      │
    └────────────────────┘    └──────────────────┘
       Business Layer            Data Layer
```

## Features

✅ **Original Business Logic Preserved**
- Initial balance: $1,000.00
- View balance inquiry
- Credit operations (unrestricted)
- Debit operations (with overdraft protection)
- Menu-driven interface

✅ **Business Rules Enforced**
- Overdraft prevention (debits cannot exceed balance)
- Two decimal place precision
- Balance capacity: $0.00 to $999,999.99
- Module isolation (data, operations, presentation)

## Installation

```bash
# Navigate to the accounting directory
cd src/accounting

# Install dependencies
npm install
```

## Running the Application

### Method 1: Command Line
```bash
npm start
```

### Method 2: VS Code Debugger
1. Open VS Code
2. Press `F5` or select "Run and Debug"
3. Choose "Account Management System" configuration
4. Application will launch in integrated terminal

## Testing

### Run All Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

## Test Coverage

The test suite includes **54 comprehensive tests** covering:

| Category | Test Count | Test Cases |
|----------|-----------|------------|
| **Data Layer** | 8 tests | TC-030, TC-034, TC-035, TC-037 + validation |
| **Balance Inquiry** | 2 tests | TC-002 + integration |
| **Credit Operations** | 6 tests | TC-003, TC-005, TC-006, TC-007, TC-008, TC-031 |
| **Debit Operations** | 11 tests | TC-009, TC-011-017, TC-019-020, TC-032-033 |
| **Mixed Operations** | 2 tests | TC-018, TC-029 |
| **Menu & Navigation** | 7 tests | TC-001, TC-025, TC-026-028, TC-038 |
| **Input Validation** | 5 tests | TC-021, TC-023-024, TC-039-040 |
| **Integration Tests** | 4 tests | End-to-end workflows |
| **Business Rules** | 6 tests | Critical business logic validation |
| **Module Isolation** | 3 tests | TC-036, TC-037 + integration |

### Test Results
```
Test Suites: 1 passed
Tests:       54 passed
Duration:    ~0.3s
```

All tests mirror scenarios from [docs/TESTPLAN.md](../../docs/TESTPLAN.md)

## Usage Examples

### Example Session
```
================================
Account Management System
1. View Balance
2. Credit Account
3. Debit Account
4. Exit
================================
Enter your choice (1-4): 1
Current balance: 1000.00

Enter your choice (1-4): 2
Enter credit amount: 500.00
Amount credited. New balance: 1500.00

Enter your choice (1-4): 3
Enter debit amount: 300.00
Amount debited. New balance: 1200.00

Enter your choice (1-4): 4
Exiting the program. Goodbye!
```

## Project Structure

```
src/accounting/
├── index.js           # Main application (DataProgram, Operations, MainProgram)
├── index.test.js      # Comprehensive test suite (54 tests)
├── package.json       # Dependencies and scripts
├── jest.config.js     # Jest configuration
└── README.md          # This file
```

## Classes

### DataProgram (Data Layer)
**Purpose:** Manages account balance storage and retrieval

**Methods:**
- `read()` - Retrieves current balance
- `write(newBalance)` - Updates balance with validation
- `getBalance()` - Returns formatted balance string

**Initial State:** `storageBalance = 1000.00`

### Operations (Business Logic Layer)
**Purpose:** Implements account operations and business rules

**Methods:**
- `viewBalance()` - Display current balance (TOTAL)
- `creditAccount()` - Add funds (CREDIT)
- `debitAccount()` - Withdraw funds with validation (DEBIT)

**Business Logic:**
- Credits: Unrestricted, always succeed
- Debits: Validated with overdraft protection
- All operations use DataProgram for persistence

### MainProgram (Presentation Layer)
**Purpose:** User interface and menu navigation

**Methods:**
- `displayMenu()` - Shows menu options
- `run()` - Main program loop

**Flow:**
1. Display menu
2. Accept user choice
3. Route to appropriate operation
4. Repeat until exit (choice 4)

## Migration Notes

### COBOL → Node.js Mapping

| COBOL Concept | Node.js Implementation |
|---------------|------------------------|
| `WORKING-STORAGE SECTION` | Class properties |
| `LINKAGE SECTION` | Method parameters |
| `PROCEDURE DIVISION` | Class methods |
| `CALL 'Program'` | Method calls |
| `GOBACK` | `return` statement |
| `PERFORM UNTIL` | `while` loop |
| `EVALUATE` | `switch` statement |
| `PIC 9(6)V99` | `parseFloat().toFixed(2)` |

### Preserved from COBOL
✅ Three-layer architecture (main, operations, data)  
✅ Initial balance of $1,000.00  
✅ Overdraft protection on debits  
✅ Unrestricted credit operations  
✅ Menu-driven interface  
✅ Module isolation principles  
✅ Two decimal place precision

### Enhanced in Node.js
🚀 Unit testing with Jest (54 tests)  
🚀 Error handling with try-catch  
🚀 Input validation for negative amounts  
🚀 Bounds checking for PIC 9(6)V99 limits  
🚀 ES6 modules and classes  
🚀 Comprehensive test coverage  

## Development

### Adding New Features
1. Update business logic in `Operations` class
2. Add corresponding tests in `index.test.js`
3. Update `TESTPLAN.md` with new test cases
4. Run tests to ensure no regressions

### Debugging
Use VS Code debugger configuration:
- Set breakpoints in `index.js`
- Press `F5` to start debugging
- Step through code with F10/F11

## Documentation

- **System Documentation:** [docs/README.md](../../docs/README.md)
- **Test Plan:** [docs/TESTPLAN.md](../../docs/TESTPLAN.md)
- **COBOL Source:** [src/cobol/](../cobol/)

## License

MIT License - See [LICENSE](../../LICENSE) for details

## Modernization Journey

This application demonstrates successful legacy modernization:
- ✅ COBOL → Node.js conversion complete
- ✅ All business logic preserved
- ✅ Comprehensive test coverage added
- ✅ Documentation created
- ✅ 54 tests passing

**Next Steps for Production:**
- [ ] Add persistent storage (database)
- [ ] Implement transaction history
- [ ] Create REST API endpoints
- [ ] Add authentication/authorization
- [ ] Support multiple accounts
- [ ] Deploy to cloud platform
