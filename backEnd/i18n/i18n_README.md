# Backend i18n Documentation

## Overview

This backend implements internationalization (i18n) using i18next with support for 4 languages:

- **English (en)** - Default
- **Russian (ru)** - Русский
- **Armenian (hy)** - Հայերեն
- **Arabic (ar)** - العربية

## Usage in Controllers and Routes

### Basic Translation

Use `req.t()` to translate keys in your route handlers and controllers:

```javascript
// Simple translation
router.get("/example", (req, res) => {
  res.json({
    message: req.t("common:welcome"),
  });
});
```

### Translation with Interpolation

Pass variables to translations using the second parameter:

```javascript
// Translation with variables
router.post("/user", (req, res) => {
  const error = req.t("validators:required", { field: "Email" });
  // Returns: "Email is required" (en) or "Email обязательно для заполнения" (ru)

  res.status(400).json({ error });
});
```

### Using Different Namespaces

Translations are organized into namespaces. Use the `namespace:key` format:

```javascript
// Common namespace
req.t("common:success"); // "Operation successful"
req.t("common:save"); // "Save"

// Validators namespace
req.t("validators:required", { field: "Password" });
req.t("validators:invalid_email");

// Errors namespace
req.t("errors:not_found"); // "Resource not found"
req.t("errors:unauthorized"); // "Unauthorized access"
```

### Accessing Current Language

The detected language is available on the request object:

```javascript
router.get("/info", (req, res) => {
  console.log("Current language:", req.language); // e.g., "ru"
  console.log("Detection source:", req.languageSource); // e.g., "accept-language-header"

  res.json({
    language: req.language,
    message: req.t("common:welcome"),
  });
});
```

## Language Detection

The middleware detects language in the following priority order:

1. **Custom Header**: `X-Language` or `Language`

   ```bash
   curl -H "X-Language: ru" http://localhost:3000/api/test/i18n
   ```

2. **Query Parameter**: `?lng=en`

   ```bash
   curl http://localhost:3000/api/test/i18n?lng=hy
   ```

3. **Accept-Language Header**: Standard HTTP header

   ```bash
   curl -H "Accept-Language: ar" http://localhost:3000/api/test/i18n
   ```

4. **Default**: Falls back to English (en)

## Translation File Structure

Translation files are located in `backEnd/i18n/locales/`:

```
backEnd/i18n/locales/
├── en/
│   ├── common.json       # General UI text
│   ├── validators.json   # Validation messages
│   └── errors.json       # Error messages
├── ru/
│   ├── common.json
│   ├── validators.json
│   └── errors.json
├── hy/
│   └── ...
└── ar/
    └── ...
```

## Translation Key Naming Conventions

### Use descriptive, hierarchical keys:

```javascript
// ✅ Good
req.t("validators:required");
req.t("validators:min_length");
req.t("errors:not_found");
req.t("common:welcome");

// ❌ Avoid
req.t("msg1");
req.t("error");
req.t("text");
```

### Use snake_case for keys:

```javascript
// ✅ Good
req.t("validators:invalid_email");
req.t("errors:rate_limit_exceeded");

// ❌ Avoid
req.t("validators:invalidEmail");
req.t("errors:RateLimitExceeded");
```

## Adding New Translations

### 1. Add to English file first (source of truth):

```json
// backEnd/i18n/locales/en/common.json
{
  "welcome": "Welcome",
  "new_feature": "This is a new feature"
}
```

### 2. Add translations to other languages:

```json
// backEnd/i18n/locales/ru/common.json
{
  "welcome": "Добро пожаловать",
  "new_feature": "Это новая функция"
}
```

### 3. Use in your code:

```javascript
router.get("/feature", (req, res) => {
  res.json({
    message: req.t("common:new_feature"),
  });
});
```

## Adding New Namespaces

### 1. Create translation files for all languages:

```bash
backEnd/i18n/locales/en/notifications.json
backEnd/i18n/locales/ru/notifications.json
backEnd/i18n/locales/hy/notifications.json
backEnd/i18n/locales/ar/notifications.json
```

### 2. Update i18n configuration:

```javascript
// backEnd/i18n/i18n.config.js
export const i18nConfig = {
  // ...
  ns: ["common", "validators", "errors", "notifications"], // Add new namespace
  // ...
};
```

### 3. Use the new namespace:

```javascript
req.t("notifications:email_sent");
req.t("notifications:push_notification");
```

## Integration Examples

### In Error Handlers

```javascript
// backEnd/03_services/errorHandlers/notFoundHandler.js
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: req.t("errors:not_found"),
    message: req.t("errors:bad_request"),
  });
};
```

### In Validators

```javascript
// backEnd/09_validators/userValidator.js
import { body } from "express-validator";

export const validateEmail = [
  body("email")
    .isEmail()
    .withMessage((value, { req }) => req.t("validators:invalid_email"))
    .notEmpty()
    .withMessage((value, { req }) =>
      req.t("validators:required", { field: "Email" })
    ),
];
```

### In Controllers

```javascript
// backEnd/07_controllers/userController.js
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      message: req.t("common:success"),
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: req.t("errors:server_error"),
    });
  }
};
```

### In Response Handlers

```javascript
// backEnd/03_services/cntrl_returnHandler.js
export const sendSuccess = (req, res, data, messageKey = "common:success") => {
  res.json({
    success: true,
    message: req.t(messageKey),
    data,
  });
};

export const sendError = (
  req,
  res,
  statusCode,
  messageKey = "errors:server_error"
) => {
  res.status(statusCode).json({
    success: false,
    message: req.t(messageKey),
  });
};
```

## Testing

### Test Endpoints

Three test endpoints are available:

1. **Basic i18n test**: `GET /api/test/i18n`

   - Tests translation from all namespaces
   - Shows interpolation
   - Demonstrates fallback behavior

2. **All languages test**: `GET /api/test/i18n/all-languages`

   - Shows same translations in all 4 languages
   - Useful for verifying translations

3. **Namespace test**: `GET /api/test/i18n/namespaces`
   - Verifies all namespaces are loaded correctly

### Testing with Different Languages

```bash
# Test with Russian
curl -H "X-Language: ru" http://localhost:3000/api/test/i18n

# Test with Armenian
curl -H "X-Language: hy" http://localhost:3000/api/test/i18n

# Test with Arabic
curl -H "X-Language: ar" http://localhost:3000/api/test/i18n

# Test with query parameter
curl http://localhost:3000/api/test/i18n?lng=ru

# Test with Accept-Language header
curl -H "Accept-Language: hy" http://localhost:3000/api/test/i18n
```

## Console Logging

The middleware logs language detection for debugging:

```
[i18n] Request received
[i18n] Detected language: ru
[i18n] Language source: accept-language-header
[i18n] Supported: true
```

## Best Practices

1. **Always use translation keys, never hardcode text**:

   ```javascript
   // ✅ Good
   res.json({ message: req.t("common:success") });

   // ❌ Bad
   res.json({ message: "Success" });
   ```

2. **Use interpolation for dynamic content**:

   ```javascript
   // ✅ Good
   req.t("validators:min_length", { field: "Password", min: 8 })// ❌ Bad
   `Password must be at least 8 characters`;
   ```

3. **Organize translations by namespace**:

   - `common`: General UI text
   - `validators`: Validation messages
   - `errors`: Error messages
   - Add more as needed

4. **Keep translation keys consistent across languages**:

   - All language files should have the same keys
   - Only the values should differ

5. **Test with all languages**:
   - Use the test endpoints to verify translations
   - Check console logs for missing keys

## Troubleshooting

### Missing Translation Warning

If you see: `🌐 Missing translation: [en] common:some_key`

1. Check if the key exists in the translation file
2. Verify the namespace is correct
3. Ensure the file is valid JSON
4. Restart the server to reload translations

### Language Not Detected

If language detection isn't working:

1. Check the header format: `X-Language: ru` or `Accept-Language: ru`
2. Verify the language code is supported (en, ru, hy, ar)
3. Check console logs for detection information
4. Ensure middleware is applied before routes

### Translation Returns Key Instead of Value

This happens when:

1. The translation key doesn't exist
2. The namespace is missing
3. The language file has syntax errors

Check console for warnings and verify your translation files.
