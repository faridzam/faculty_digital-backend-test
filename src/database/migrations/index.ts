import pool from "../../config/database";
import { AccountMigration } from "./AccountMigration";

const RunMigration = async () => {
  await AccountMigration();
}
RunMigration().finally(() => pool.end())