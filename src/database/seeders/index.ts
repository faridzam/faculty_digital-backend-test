import pool from "../../config/database";
import AccountSeeder from "./AccountSeeder";


const RunSeeder = async () => {
  await AccountSeeder();
}

RunSeeder().finally(() => pool.end())
