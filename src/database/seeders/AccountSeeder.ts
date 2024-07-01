import pool from "../../config/database";

export default async function AccountSeeder() {
  try {
    await pool.query(`
      INSERT INTO accounts (user_id, username, password)
      VALUES
        (1, 'user1', '$2a$12$GFPgdEHguO7NEn/YzCb1C.f7Uml4zA51xuiUA/IC/b7oKlIjuCt9e'),
        (2, 'user2', '$2a$12$GFPgdEHguO7NEn/YzCb1C.f7Uml4zA51xuiUA/IC/b7oKlIjuCt9e'),
        (3, 'user3', '$2a$12$GFPgdEHguO7NEn/YzCb1C.f7Uml4zA51xuiUA/IC/b7oKlIjuCt9e'),
      ON CONFLICT DO NOTHING;
    `);
    console.log('Account seeding complete.');
  } catch (error) {
    console.error('Error running account seeds:', error);
  }
}