import React, { useState } from "react";
import Table from "./Table";
import data from "../data/data";

function Main() {
  const [budgetValues, setBudgetValues] = useState(
    data.reduce((acc, data) => {
      acc[data.store.id] = data.months.reduce((acc, month) => {
        acc[month.id] = month.value;
        return acc;
      }, {});
      return acc;
    }, {})
  );
  const handleBudgetChange = (storeId, monthId, value) => {
    setBudgetValues((prevValues) => ({
      ...prevValues,
      [storeId]: {
        ...prevValues[storeId],
        [monthId]: value,
      },
    }));
  };
  const calculateTotals = () => {
    const storeTotals = data.reduce((acc, data) => {
      acc[data.store.id] = data.months.reduce((acc, month) => {
        acc += budgetValues[data.store.id][month.id] || 0;
        return acc;
      }, 0);
      return acc;
    }, {});
    const monthTotals = Array.from({ length: 12 }).map((_, monthNumber) => {
      const stores = Object.values(budgetValues); // array of stores: [{1_1: 4, 2_1: 0, …}, ...]
      return stores.reduce((acc, store) => {
        const months = Object.values(store); // 12 values of a store per month
        return acc + months[monthNumber];
      }, 0);
    });
    return { storeTotals, monthTotals };
  };
  return (
    <Table
      data={data}
      budgetValues={budgetValues}
      handleBudgetChange={handleBudgetChange}
      calculateTotals={calculateTotals}
    />
  );
}
export default Main;
