import React from 'react';
import './planetChartBar.css'

export default function PlanetChartBar({data}) {
    return (
        <table className="tableChart">
        <tbody>
          <tr />
          <tr className="bars">
            {data.map((chart, i) => {
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
