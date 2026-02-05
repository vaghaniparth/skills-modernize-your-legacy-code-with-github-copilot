# Account Management System - Modernized

## Overview

This is a modern Node.js implementation of the legacy COBOL banking application. The application has been completely refactored using modern JavaScript features, best practices, and comprehensive error handling.

## Features

- ✅ **View Balance**: Check current account balance
- ✅ **Credit Account**: Add funds to account with validation
- ✅ **Debit Account**: Withdraw funds with overdraft protection
- ✅ **Interactive CLI**: User-friendly command-line interface
- ✅ **Error Handling**: Comprehensive validation and error messages
- ✅ **Type Safety**: Input validation and type checking
- ✅ **Secure**: Private class fields for data encapsulation

## Modernization Improvements

### From COBOL to Modern Node.js

| Legacy COBOL | Modern Node.js |
|-------------|----------------|
| Procedural programming | Object-oriented with classes |
| GOTO statements | Async/await flow control |
| No encapsulation | Private class fields (#) |
| Limited error handling | Comprehensive try-catch blocks |
| Fixed-point arithmetic | JavaScript number handling |
| No documentation | JSDoc comments throughout |
| No input validation | Strict type and range validation |
| No tests | Comprehensive unit test suite |

### Modern Language Features Used

- **ES6+ Classes**: Object-oriented design with proper encapsulation
- **Private Fields**: Using `#` syntax for true data privacy
- **Arrow Functions**: Modern function syntax
- **Template Literals**: Clean string interpolation
- **Async/Await**: Modern asynchronous programming
- **ES Modules**: Import/export syntax instead of require
- **Destructuring**: Clean parameter handling
- **Built-in Testing**: Node.js native test runner

### Code Quality Improvements

1. **Separation of Concerns**: Three distinct classes for data, operations, and UI
2. **Single Responsibility**: Each class has one clear purpose
3. **Dependency Injection**: Classes accept dependencies, making them testable
4. **Error Handling**: All operations validate inputs and handle errors gracefully
5. **Documentation**: JSDoc comments on all public methods
6. **Testability**: Exported classes enable comprehensive unit testing

## Installation

```bash
cd src/accounting
npm install
```

## Usage

### Running the Application

```bash
npm start
```

Or directly:

```bash
node index.js
```

### Running Tests

```bash
npm test
```

With coverage:

```bash
npm run test:coverage
```

## VS Code Debugging

The project includes a `.vscode/launch.json` configuration for debugging:

1. Open the "Run and Debug" sidebar (Ctrl+Shift+D)
2. Select "Run Account Management System"
3. Press F5 to start debugging

## Architecture

### DataStore Class

Manages account balance persistence with encapsulation:

- Private `#balance` field ensures data integrity
- Read/write operations with validation
- Formatted balance output

### Operations Class

Handles all account transactions:

- `viewBalance()`: Display current balance
- `credit(amount)`: Add funds with validation
- `debit(amount)`: Withdraw funds with overdraft protection

### AccountManagementSystem Class

Main application controller:

- Interactive menu system
- User input handling with validation
- Graceful error recovery
- Clean shutdown on SIGINT

## Input Validation

All user inputs are validated:

- ✅ Numeric amounts only
- ✅ Positive values required
- ✅ Sufficient funds check for debits
- ✅ Clear error messages for invalid input

## Error Handling

Comprehensive error handling throughout:

- Input validation errors
- Insufficient funds protection
- Graceful error recovery
- User-friendly error messages
- Transaction rollback on errors

## Testing

The test suite includes:

- Unit tests for DataStore (10 tests)
- Unit tests for Operations (17 tests)
- Integration tests (5 tests)
- Edge case coverage
- Error condition testing

All tests use Node.js built-in test runner (no external dependencies).

## Security Features

- Private class fields prevent direct balance manipulation
- Input validation prevents injection attacks
- Type checking prevents invalid data
- Overdraft protection prevents negative balances
- No eval() or other dangerous operations

## Requirements

- Node.js >= 18.0.0 (for native test runner and ES modules)

## License

MIT

## Migration from COBOL

This application maintains 100% functional compatibility with the original COBOL system:

| COBOL Program | Node.js Equivalent |
|--------------|-------------------|
| DataProgram | DataStore class |
| Operations | Operations class |
| MainProgram | AccountManagementSystem class |

All business logic has been preserved while modernizing the implementation.
