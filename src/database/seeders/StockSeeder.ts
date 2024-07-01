import pool from "../../config/database";

export default async function StockSeeder() {
  try {
    await pool.query(`
      INSERT INTO stocks (code, name, price_leap, initial_price)
      VALUES
        ('BBRI', 'Bank Rakyat Indonesia (Persero) Tbk.', 10, 4630),
        ('ICBP', 'Indofood CBP Sukses Makmur Tbk.', 25, 10300),
        ('ANTM', 'Aneka Tambang Tbk.', 5, 1305),
        ('GOTO', 'GoTo Gojek Tokopedia Tbk.', 1, 50)
      ON CONFLICT DO NOTHING;
    `);
    console.log('Stock seeding complete.');
  } catch (error) {
    console.error('Error running stock seeds:', error);
  }
}