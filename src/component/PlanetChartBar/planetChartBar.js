import React from 'react';
import './planetChartBar.css'

export default function PlanetChartBar({displayChart}) {
    return (
        <table className="tableChart">
        <tbody>
          <tr />
          <tr className="bars">
            {displayChart.map((chart, i) => {
              return (
                <td className="bar" key={i}>
                  <pre>{chart.population}</pre>
                  <div
                    className="barColor"
                    style={{ height: `${chart.ratio}%` }}
                  ></div>
                  <p>{chart.name}</p>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    )
}
