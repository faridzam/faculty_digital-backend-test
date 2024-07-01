import pool from "../../config/database";

export default async function AccountSeeder() {
  try {
    await pool.query(`
      INSERT INTO accounts (username, password)
      VALUES
        ('user1', '$2a$12$GFPgdEHguO7NEn/YzCb1C.f7Uml4zA51xuiUA/IC/b7oKlIjuCt9e'),
        ('user2', '$2a$12$GFPgdEHguO7NEn/YzCb1C.f7Uml4zA51xuiUA/IC/b7oKlIjuCt9e'),
        ('user3', '$2a$12$GFPgdEHguO7NEn/YzCb1C.f7Uml4zA51xuiUA/IC/b7oKlIjuCt9e')
      ON CONFLICT DO NOTHING;
    `);
    console.log('Account seeding complete.');
  } catch (error) {
    console.error('Error running account seeds:', error);
  }
}