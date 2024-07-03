import pool from "../config/database";
import { StockResponse } from "../models/stocks";
import { generateDummyCurrentPrice } from "../utils/helper";


export const getStockService = async (): Promise<StockResponse[] | null> => {
  const resultStock = await pool.query('SELECT * FROM stocks');

  if (
    resultStock.rows.length === 0
  ) {
    return null;
  }

  let stockData: StockResponse[] = resultStock.rows.map((stock) => ({
    id: stock.id,
    code: stock.code,
    name: stock.name,
    price_leap: stock.price_leap,
    initial_price: stock.initial_price,
    current_price: generateDummyCurrentPrice(stock.initial_price, stock.price_leap),
    time: new Date()
  }))

  return stockData;
};