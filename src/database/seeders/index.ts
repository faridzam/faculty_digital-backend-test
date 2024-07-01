import pool from "../../config/database";
import AccountSeeder from "./AccountSeeder";
import StockSeeder from "./StockSeeder";


const RunSeeder = async () => {
  await AccountSeeder();
  await StockSeeder();
}

RunSeeder().finally(() => pool.end())
