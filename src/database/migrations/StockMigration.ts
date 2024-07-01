import pool from "../../config/database";

export async function StockMigration() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS stocks (
        id SERIAL PRIMARY KEY,
        code VARCHAR(4) UNIQUE NOT NULL,
        name VARCHAR(50) UNIQUE NOT NULL,
        price_leap INT NOT NULL,
        initial_price INT NOT NULL
      );
    `)
    console.log('Stock migration complete.');
  } catch (error) {
    console.error('Error running stock migration:', error);
  }
}