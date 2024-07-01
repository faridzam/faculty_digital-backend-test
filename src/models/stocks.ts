export interface Stock {
  id: number;
  code: string;
  name: string;
  price_leap: number;
  initial_price: number;
}

export interface StockResponse {
  id: number;
  code: string;
  name: string;
  initial_price: number;
  current_price: number;
  time: Date;
}