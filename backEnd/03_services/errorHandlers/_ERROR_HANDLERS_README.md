# Error Handlers Module

A comprehensive error handling system for the application that provides typed errors, automatic categorization, and structured logging.

## 📁 Module Structure

```
errorHandlers/
├── _errorHandlers.index.js          # Main export file
├── errorTypes.js                     # ERROR_TYPES constant
├── AppError.js                       # AppError class
├── errorHelpers.js                   # Factory functions (create*Error)
├── errorCategorizer.js               # determineErrorResponse function
├── catch_errorHandler_cntrl.js       # Main error handler function
└── README.md                         # This file
```

## 🎯 Features

- **Typed Errors**: Predefined error types with consistent HTTP status codes
- **Factory Functions**: Convenient helper functions for creating errors
- **Automatic Categorization**: Pattern-based error detection for untyped errors
- **Structured Logging**: Winston integration with metadata (user ID, IP, error type)
- **Debug Mode**: Optional stack traces and detailed error information
- **Backward Compatible**: Works with existing error handling patterns

## 📚 Usage

### Basic Usage in Service Functions

```javascript
import {
  createValidationError,
  createUnauthorizedError,
  createNotFoundError,
  createDuplicateError,
} from "../../../03_services/_services.index.js";

export const myService = async (req, isDebug) => {
  const { email, userId } = req.body;

  // Validation error (400)
  if (!email) {
    throw createValidationError("Email is required");
  }

  // Unauthorized error (401)
  if (!req.user) {
    throw createUnauthorizedError("Authentication required");
  }

  // Not found error (404)
  const user = await User.findById(userId);
  if (!user) {
    throw createNotFoundError(`User with ID ${userId} not found`);
  }

  // Duplicate error (409)
  const existing = await User.findOne({ email });
  if (existing) {
    throw createDuplicateError(`Email ${email} already exists`);
  }

  return { success: true, message: "Success", data: user };
};
```

### Controller Integration

```javascript
import {
  catch_errorHandler_cntrl,
  validRespond,
} from "../../../03_services/_services.index.js";

const myController = async (req, res) => {
  try {
    const { success, message, data } = await myService(req, isDebug);
    return validRespond(res, isDebug, displayName, success, message, data);
  } catch (error) {
    // Automatically handles typed errors and logs them
    return catch_errorHandler_cntrl(res, displayName, isDebug, error);
  }
};
```

## 🔧 Available Error Helpers

### Validation Errors (400)

```javascript
createValidationError("Email must be a valid email address");
```

### Authentication Errors (401)

```javascript
createUnauthorizedError("Invalid authentication token");
```

### Authorization Errors (403)

```javascript
createForbiddenError("Insufficient permissions");
```

### Not Found Errors (404)

```javascript
createNotFoundError("User not found");
```

### Conflict Errors (409)

```javascript
createDuplicateError("Email already registered");
```

### Rate Limiting Errors (429)

```javascript
createRateLimitError("Too many login attempts");
```

## 📊 Error Types

The module supports the following predefined error types:

| Error Type               | Status Code | Default Message              |
| ------------------------ | ----------- | ---------------------------- |
| VALIDATION_ERROR         | 400         | Validation failed            |
| MISSING_REQUIRED_FIELD   | 400         | Required field missing       |
| INVALID_INPUT            | 400         | Invalid input provided       |
| UNAUTHORIZED             | 401         | Authentication required      |
| INVALID_TOKEN            | 401         | Invalid or expired token     |
| INVALID_CREDENTIALS      | 401         | Invalid credentials          |
| FORBIDDEN                | 403         | Access denied                |
| INSUFFICIENT_PERMISSIONS | 403         | Insufficient permissions     |
| NOT_FOUND                | 404         | Resource not found           |
| USER_NOT_FOUND           | 404         | User not found               |
| DUPLICATE_ENTRY          | 409         | Resource already exists      |
| EMAIL_ALREADY_EXISTS     | 409         | Email already registered     |
| RATE_LIMIT_EXCEEDED      | 429         | Too many requests            |
| DATABASE_ERROR           | 500         | Database operation failed    |
| EXTERNAL_SERVICE_ERROR   | 500         | External service unavailable |
| INTERNAL_ERROR           | 500         | Internal server error        |

## 🔍 Error Categorization

The error handler uses a priority-based categorization system:

1. **Custom Error Type** (Highest Priority)

   - Checks if error has a `type` property matching ERROR_TYPES
   - Used by AppError instances created with helper functions

2. **Pattern Matching**

   - Analyzes error message for keywords
   - Patterns: "validation", "required", "unauthorized", "token", "not found", "duplicate", "already exists"

3. **Error Name**

   - Checks error.name for database-specific errors
   - Handles: MongoError, ValidationError

4. **Default** (Lowest Priority)
   - Falls back to INTERNAL_ERROR (500)

## 📝 Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "payload": {
    /* data */
  }
}
```

### Error Response (Production)

```json
{
  "success": false,
  "message": "Email is required",
  "payload": null
}
```

### Error Response (Debug Mode)

```json
{
  "success": false,
  "message": "Email is required",
  "payload": null,
  "debug": {
    "stack": "AppError: Email is required\n    at createValidationError...",
    "originalMessage": "Email is required"
  }
}
```

## 📊 Winston Logging

All errors are automatically logged with structured metadata:

```javascript
{
  "controller": "⚠️ ☠️ 🚨 | myController.js | |<=>| ",
  "error": "Email is required",
  "stack": "AppError: Email is required...",
  "errorType": "VALIDATION_ERROR",
  "statusCode": 400,
  "userId": "user123",  // if available
  "ip": "192.168.1.1"   // if available
}
```

## 🧪 Testing

Run the test suite to verify error handling:

```bash
node backEnd/testTypedErrors.js
```

The test suite covers:

- ✅ Validation errors (400)
- ✅ Unauthorized errors (401)
- ✅ Not found errors (404)
- ✅ Duplicate errors (409)
- ✅ Success responses (200)
- ✅ Winston logging verification
- ✅ Custom error messages
- ✅ Debug mode

## 🔄 Migration Guide

### Before (Old Pattern)

```javascript
if (!email) {
  throw new Error("Email is required");
}
```

### After (New Pattern)

```javascript
if (!email) {
  throw createValidationError("Email is required");
}
```

### Benefits

- ✅ Automatic HTTP status code (400)
- ✅ Structured error type (VALIDATION_ERROR)
- ✅ Winston logging with metadata
- ✅ Consistent error responses
- ✅ Better error tracking and debugging

## 📖 API Reference

### AppError Class

```javascript
class AppError extends Error {
  constructor(type, message, statusCode)
}
```

**Parameters:**

- `type` (string): Error type from ERROR_TYPES
- `message` (string): Custom error message
- `statusCode` (number): HTTP status code

### Error Helper Functions

All helper functions follow the same pattern:

```javascript
create*Error(message: string): AppError
```

**Returns:** AppError instance with predefined type and status code

### catch_errorHandler_cntrl

```javascript
catch_errorHandler_cntrl(res, name, isDebug, error);
```

**Parameters:**

- `res` (Object): Express response object
- `name` (string): Controller name for logging
- `isDebug` (boolean): Include debug info in response
- `error` (Error): Error object to handle

**Returns:** Express response with error details

## 🎓 Best Practices

1. **Always use typed errors** in service functions
2. **Provide descriptive messages** that help users understand the issue
3. **Use appropriate error types** for different scenarios
4. **Enable debug mode** in development, disable in production
5. **Log errors** at the controller level, not in services
6. **Include context** in error messages (e.g., user ID, resource name)
7. **Test error scenarios** to ensure proper handling

## 🔗 Related Files

- `backEnd/03_services/cntrl_returnHandler.js` - Re-exports error handlers
- `backEnd/03_services/_services.index.js` - Main services export
- `backEnd/testTypedErrors.js` - Test suite
- `backEnd/testResults_Task8.md` - Test results documentation

## 📄 License

Part of the vardges.me backend application.
