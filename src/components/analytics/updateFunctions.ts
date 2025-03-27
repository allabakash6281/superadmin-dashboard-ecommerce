
import { 
  initialSalesByCategory, 
  initialSalesOverTime, 
  initialCustomerAcquisition, 
  initialTopProducts 
} from './initialData';

// Random update functions to simulate real-time data
export const updateSalesByCategory = (currentData: typeof initialSalesByCategory) => {
  return currentData.map(item => ({
    ...item,
    value: Math.max(1, item.value + Math.floor(Math.random() * 5) - 2)
  }));
};

export const updateSalesOverTime = (currentData: typeof initialSalesOverTime) => {
  return currentData.map(item => ({
    ...item,
    sales: Math.max(1000, item.sales + Math.floor(Math.random() * 500) - 250)
  }));
};

export const updateCustomerAcquisition = (currentData: typeof initialCustomerAcquisition) => {
  return currentData.map(item => ({
    ...item,
    new: Math.max(100, item.new + Math.floor(Math.random() * 50) - 25),
    returning: Math.max(100, item.returning + Math.floor(Math.random() * 50) - 25)
  }));
};

export const updateTopProducts = (currentData: typeof initialTopProducts) => {
  return currentData.map(item => ({
    ...item,
    sales: Math.max(500, item.sales + Math.floor(Math.random() * 50) - 25)
  }));
};

// Generic update function that can work with any data shape
export const createGenericUpdater = <T extends Record<string, any>>(
  fieldToUpdate: keyof T, 
  minValue: number = 0,
  maxChange: number = 10
) => {
  return (items: T[]): T[] => {
    return items.map(item => ({
      ...item,
      [fieldToUpdate]: Math.max(
        minValue, 
        Number(item[fieldToUpdate]) + Math.floor(Math.random() * maxChange) - (maxChange / 2)
      )
    }));
  };
};
