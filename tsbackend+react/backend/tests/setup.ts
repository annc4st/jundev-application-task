import * as dotenv from "dotenv";
import { execSync } from 'child_process';

dotenv.config({ path: '.env.test' });

if (process.env.NODE_ENV !== 'test') {
  throw new Error('NODE_ENV must be "test"');
}

console.log('🛠️  Setting up test database...');

try {
  // Push the schema to the test database
  // "prisma db push" is faster than migrate for tests and good for sqlite/prototyping
  execSync('npx prisma db push --schema=./prisma/schema.prisma --accept-data-loss', {
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: process.env.DATABASE_URL // Ensure correct URL is passed
    }
  });
  console.log('✅ Test database set up.');
} catch (error) {
  console.error('❌ Failed to set up test database:', error);
  process.exit(1);
}
