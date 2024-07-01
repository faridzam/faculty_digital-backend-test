import { getStockService } from '../services/stockService';

export const getStockController = async () => {

  try {
    const data = await getStockService();

    if (data) {
      return data
    } else {
      return null
    }
  } catch (error) {
    return null
  }
};