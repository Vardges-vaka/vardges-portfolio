import { logger } from "./03_services/_services.index.js";

console.log("🧪 Testing the new logger formatting...\n");

// Test different log types
logger.info("Application started successfully", {
  port: 3000,
  environment: "development",
  features: ["auth", "logging", "validation"],
});

logger.controller.start("testController", {
  userId: "user123",
  ip: "192.168.1.100",
  endpoint: "/api/test",
});

logger.controller.success("testController", {
  responseTime: "45ms",
  statusCode: 200,
  dataSize: "1.2KB",
});

logger.service.error("testService", new Error("Connection timeout"), {
  database: "MongoDB",
  retryAttempt: 3,
  timeout: "5000ms",
});

logger.auth.login("user123", {
  ip: "192.168.1.100",
  userAgent: "Mozilla/5.0...",
  loginMethod: "email",
});

logger.security.suspiciousActivity("Multiple failed login attempts", {
  ip: "192.168.1.200",
  attempts: 10,
  timeWindow: "5 minutes",
});

logger.database.query("find", "users", {
  filter: { active: true },
  limit: 50,
  sort: { createdAt: -1 },
});

console.log("\n✅ Test completed! Check the log files in backEnd/_logs/");
console.log("📁 Files created:");
console.log("   - error.log (readable format)");
console.log("   - error.json (JSON format)");
console.log("   - combined.log (readable format)");
console.log("   - combined.json (JSON format)");
console.log("   - http.log (readable format)");
