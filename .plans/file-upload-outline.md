# FILE UPLOAD SYSTEM — LOGIC OUTLINE

**Stack:** Express.js, Multer, MongoDB, AWS S3, Google Cloud Storage, Azure Blob Storage, Cloudflare R2

---

## FLOW

```
Frontend Request
→ Router
→ Multer Middleware (dynamic storage)
→ Validation/Sanitization Middleware
→ Controller
→ Service (business logic)
→ Cloud Provider
→ Save URL to MongoDB
→ Response to Frontend
```

---

## 1. ROUTER
- Single route handling all file uploads
- Chains middleware in order: multer → validators → controller

---

## 2. MULTER MIDDLEWARE (Dynamic Storage)
- Receives incoming file(s)
- Checks file size:
  - Under 10 MB → MemoryStorage (file lives in `req.file.buffer`)
  - 10 MB to 100 MB → DiskStorage (file saved to `/tmp/uploads`, path in `req.file.path`)
  - Over 100 MB → reject immediately, return `413` status
- Passes `req.file` or `req.files` to next middleware

---

## 3. VALIDATION / SANITIZATION MIDDLEWARE
- Checks file type (mimetype whitelist — images, audio, video, pdf, excel)
- Sanitizes filename (strip special characters, avoid path traversal)
- Any other business rules (user permissions, etc.)
- If anything fails → reject with appropriate error code
- If all passes → `next()`

---

## 4. CONTROLLER
- Receives clean `req.file` / `req.files`
- Calls the upload service function
- Handles response back to frontend (URL, success, error)

---

## 5. UPLOAD SERVICE (Business Logic)
- Queries MongoDB to determine which cloud provider to use for this user/context
- Based on provider value, calls the appropriate upload function:
  - `uploadToS3(file)`
  - `uploadToGCS(file)`
  - `uploadToAzure(file)`
  - `uploadToR2(file)`
- Each upload function:
  - Accepts the file (buffer or disk path, handles both)
  - Uploads to the respective cloud provider using their SDK
  - Returns the public URL
  - If disk storage was used → deletes temp file after upload
- Returns the URL back to the controller
- Controller saves URL to MongoDB

---

## 6. CLOUD PROVIDER MODULES
Four separate modules, one per provider:
- `s3.service.js`
- `gcs.service.js`
- `azure.service.js`
- `r2.service.js`

Each module exposes one upload function. Internally handles SDK initialization and upload logic. Kept separate so swapping or updating a provider doesn't affect the others.

---

## ERROR HANDLING
- File over 100 MB → `413 Payload Too Large`
- Invalid file type → `415 Unsupported Media Type`
- Upload failure → `502 Bad Gateway` (cloud provider failed)
- Validation failure → `400 Bad Request`

---

## DEFERRED (Later Stage)
- Compression layer (images via sharp, frontend pre-compression)
- Direct signed URL upload for files over 100 MB
- Progress tracking for large uploads
