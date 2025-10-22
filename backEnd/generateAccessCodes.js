import crypto from "crypto";
import bcrypt from "bcrypt";

/**
 * Generates a cryptographically random 12-character alphanumeric access code
 * @returns {string} 12-character access code
 */
function generateAccessCode() {
  // Generate 16 random bytes (more than needed for better randomness)
  const randomBytes = crypto.randomBytes(16);

  // Convert to base64 and remove non-alphanumeric characters
  const code = randomBytes
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "") // Remove special chars (+, /, =)
    .slice(0, 12); // Take first 12 characters

  // If somehow we don't have 12 chars (rare), recursively generate again
  return code.length === 12 ? code : generateAccessCode();
}

/**
 * Hashes an access code using bcrypt with 12 salt rounds
 * @param {string} code - The access code to hash
 * @returns {Promise<string>} Bcrypt hash of the code
 */
async function hashAccessCode(code) {
  const saltRounds = 12; // High security - computationally expensive for attackers
  return await bcrypt.hash(code, saltRounds);
}

/**
 * Main execution: Generate 10 access codes and their hashes
 */
async function generateAccessCodes() {
  const numberOfCodes = 10;
  const codes = [];
  const hashes = [];

  console.log("Generating access codes...\n");

  // Generate all codes and their hashes
  for (let i = 0; i < numberOfCodes; i++) {
    const code = generateAccessCode();
    const hash = await hashAccessCode(code);

    codes.push(code);
    hashes.push(hash);
  }

  // Output all codes first
  console.log("=== ACCESS CODES ===");
  codes.forEach((code, index) => {
    console.log(`${index + 1}. ${code}`);
  });

  console.log("\n=== HASHED CODES ===");
  // Then output all hashes
  hashes.forEach((hash, index) => {
    console.log(`${index + 1}. ${hash}`);
  });

  console.log("\nDone! Copy the codes and hashes above.");
}

// Execute the script
generateAccessCodes().catch((error) => {
  console.error("Error generating access codes:", error);
  process.exit(1);
});
