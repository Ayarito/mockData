import React from "react";
import "./style.css";

function Table({ data, budgetValues, handleBudgetChange, calculateTotals }) {
  const { storeTotals, monthTotals } = calculateTotals();
  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Store</th>
            {data[0].months.map((month) => (
              <th key={month.id}>{month.name}</th>
            ))}
            <th>Total of STORE</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => (
            <tr key={data.store.id}>
              <td>{data.store.name}</td>
              {data.months.map((month) => (
                <td key={month.id}>
                  <input
                    autofocus
                    type="number"
                    value={budgetValues[data.store.id][month.id] || ""}
                    onChange={(e) =>
                      handleBudgetChange(
                        data.store.id,
                        month.id,
                        parseInt(e.target.value) || ""
                      )
                    }
                  />
                </td>
              ))}
              <td>{storeTotals[data.store.id]}</td>
            </tr>
          ))}
          <tr>
            <td>Total: all stores</td>
            {data[0].months.map((month, index) => (
              <td key={month.id}>{monthTotals[index]}</td>
            ))}
            <td>
              <td>Total of Totals</td>
              {Object.values(storeTotals).reduce(
                (acc, total) => acc + total,
                0
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default Table;
