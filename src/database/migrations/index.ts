import pool from "../../config/database";
import { AccountMigration } from "./AccountMigration";
import { StockMigration } from "./StockMigration";

const RunMigration = async () => {
  await AccountMigration();
  await StockMigration();
}
RunMigration().finally(() => pool.end())