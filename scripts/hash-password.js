const crypto = require("crypto");

const pw = process.argv[2];
if (!pw || pw.length < 10) {
  console.error('Usage: node scripts/hash-password.js "your-strong-password" (min 10 characters)');
  process.exit(1);
}

const salt = crypto.randomBytes(16).toString("hex");
const hash = crypto.scryptSync(pw, salt, 64).toString("hex");
console.log(`ADMIN_PASSWORD_HASH=${salt}:${hash}`);