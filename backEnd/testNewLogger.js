import { logger } from "./03_services/_services.index.js";

console.log("🎨 Testing the NEW beautiful log formatting...\n");

// Test different scenarios to show the improved readability
logger.info("🚀 Application startup complete", {
  version: "1.0.0",
  environment: "development",
  port: 3000,
  features: ["authentication", "logging", "validation", "file-upload"],
});

logger.controller.start("userController", {
  endpoint: "/api/users/profile",
  method: "GET",
  userId: "user_12345",
  ip: "192.168.1.100",
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
});

logger.service.error("emailService", new Error("SMTP connection failed"), {
  smtpHost: "smtp.gmail.com",
  port: 587,
  retryAttempt: 3,
  lastError: "Connection timeout after 30 seconds",
  emailQueue: 15,
});

logger.auth.login("user_12345", {
  loginMethod: "email",
  ip: "192.168.1.100",
  location: "New York, USA",
  device: "Chrome on Windows",
  twoFactorEnabled: true,
});

logger.database.query("findMany", "users", {
  filter: {
    status: "active",
    lastLogin: { $gte: "2024-01-01" },
  },
  projection: { password: 0, internalNotes: 0 },
  limit: 100,
  sort: { createdAt: -1 },
  executionTime: "45ms",
});

logger.security.suspiciousActivity("Rapid API calls detected", {
  ip: "203.0.113.42",
  endpoint: "/api/users/search",
  requestCount: 150,
  timeWindow: "60 seconds",
  userAgent: "Python-requests/2.28.1",
  blocked: true,
  riskScore: 8.5,
});

console.log("\n✨ Check your log files now!");
console.log("📁 Look at these files in backEnd/_logs/:");
console.log("   📄 combined.log  - Beautiful readable format");
console.log("   📄 error.log     - Clean error logs");
console.log("   📄 combined.json - Structured JSON for analysis");
console.log("\n🎯 The new format is much more readable and organized!");
