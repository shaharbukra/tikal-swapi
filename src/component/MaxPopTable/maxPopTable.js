import React from "react";
import "./maxPopTable.css";

export default function MaxPopTable({ data }) {
  return (
    <table className="tableData">
      <tbody>
        <tr>
          <td>Population</td>
          {data.map(({ population }, i) => (
            <td key={i}>{population.toLocaleString()}</td>
          ))}
        </tr>
        <tr>
          <td>Vehicle name with the largest sum</td>
          {data.map(({ vehiclesName }, i) => (
            <td key={i}>{vehiclesName}</td>
          ))}
        </tr>
        <tr>
          <td>Related home planets and their respective population</td>
          {data.map(({ planets }, i) => (
            <td key={i}>
              {planets.map((planet, j) => (
                <pre key={j}>{planet}</pre>
              ))}
            </td>
          ))}
        </tr>
        <tr>
          <td>Related pilot names</td>
          {data.map((p, i) => (
            <td key={i}>
              {p.pilots.map((pilot, j) => (
                <pre key={j}>{pilot}</pre>
              ))}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
