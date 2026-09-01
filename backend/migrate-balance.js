/**
 * @file migrate-balance.js
 * @description Migration script to update all existing users in the database to have the balance field.
 */

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./models/User');

dotenv.config();

const migrateBalances = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Update users without balance
    const adminResult = await User.updateMany(
      { role: 'admin', balance: { $exists: false } },
      { $set: { balance: 500 } }
    );
    console.log(`Migrated admin users without balance: ${adminResult.modifiedCount}`);

    const userResult = await User.updateMany(
      { balance: { $exists: false } },
      { $set: { balance: 100 } }
    );
    console.log(`Migrated regular users without balance: ${userResult.modifiedCount}`);

    // Also ensure any null/undefined balance is fixed
    const fixNulls = await User.updateMany(
      { balance: null },
      { $set: { balance: 100 } }
    );
    console.log(`Fixed users with null balance: ${fixNulls.modifiedCount}`);

    const allUsers = await User.find({}, 'name email role balance');
    console.log('\n--- Current User Balances in Database ---');
    allUsers.forEach((u) => {
      console.log(`- ${u.name} (${u.email}) [${u.role}]: $${u.balance}`);
    });

    console.log('\nMigration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrateBalances();
