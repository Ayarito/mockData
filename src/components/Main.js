import React, { useState } from "react";
import Table from "./Table";
import data from "../data/data";

console.log(data)

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
       [monthId]: value
     }
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

   const monthTotals = data[0].months.reduce((acc, month) => {
    acc[month.id] = Object.values(budgetValues).reduce((acc, store) => {
      acc += store[month.id] || 0;
      return acc;
    }, 0);
    return acc;
  }, {});
  
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
