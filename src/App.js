import "./App.css";
import { useEffect, useState } from "react";
import useLocalStorage from "./api/useLocalStorage";
import { getSwapiData } from "./api/getSwapiData";

function App() {
  // trigger when data finish loading
  const [finishLoading, setFinishLoading] = useState(false);
  // get data from localstorage
  const [swapiLocalStorage, setSwapiLocalStorage] = useLocalStorage("swapi");
  // hold the data for query
  const [swapiData, setSwapiData] = useState({});

  // the final result of the query
  const [dispalyData, setDispalyData] = useState(null);
  // the result for the chart
  const [displayChart, setDisplayChart] = useState([]);

  useEffect(() => {
    const fetchSwapiData = async () => {
      if (swapiLocalStorage === null) {
        try {
          const result = await Promise.all([
            getSwapiData("people"),
            getSwapiData("vehicles"),
            getSwapiData("planets"),
          ]);
          const [people, vehicles, planets] = result;
          const swapiDataResponse = { people, vehicles, planets };
          setSwapiData(swapiDataResponse);
          setSwapiLocalStorage(swapiDataResponse);

          setFinishLoading(true);
        } catch (error) {
          console.log(error);
        }
      } else {
        setSwapiData(swapiLocalStorage);
        setFinishLoading(true);
      }
    };

    fetchSwapiData();
    //eslint-disable-next-line
  }, []);

  // Part 1
  useEffect(() => {
    if (finishLoading) {
      const populationRreducer = (acc, cur) => acc + cur;
      const getPilotPlanet = (pilot) => swapiData.people[pilot].homeworld;
      const getPilotName = (pilot) => swapiData.people[pilot].name;
      const getPilotsPlanets = (pilots) => pilots.map(getPilotPlanet);
      const getPilotsName = (pilots) => pilots.map(getPilotName);
      const vehiclesWithPilots = (vehicle) => vehicle.pilots.length;
      const sortByPopulation = (plant1, plant2) =>
        plant2.population - plant1.population;

      const getPlanetToDisplay = (planet) =>
        `${swapiData.planets[planet].name} - ${Number(
          swapiData.planets[planet].population
        )}`;

      const getPlanetPopulation = (planet) =>
        Number(swapiData.planets[planet].population);

      const getPilotPlantAndPopFromVehicle = (vehicleWithPilots) => {
        const planets = getPilotsPlanets(vehicleWithPilots.pilots);
        const population = planets
          .map(getPlanetPopulation)
          .reduce(populationRreducer);

        return {
          population: population,
          vehiclesName: vehicleWithPilots.name,
          planets: planets.map(getPlanetToDisplay),
          pilots: getPilotsName(vehicleWithPilots.pilots),
        };
      };

      const answer = Object.values(swapiData.vehicles)
        .filter(vehiclesWithPilots)
        .map(getPilotPlantAndPopFromVehicle)
        .filter((p) => !isNaN(p.population))
        .sort(sortByPopulation);

      setDispalyData(answer);
    }
    //eslint-disable-next-line
  }, [finishLoading]);

  // Part 2 - Chart Data
  useEffect(() => {
    if (finishLoading) {
      const chartPlanets = ["Tatooine", "Alderaan", "Naboo", "Bespin", "Endor"];

      let chartData = chartPlanets.map((planet) => {
        const currPlanet = Object.values(swapiData.planets).find((p) => p.name === planet );
        return { name: currPlanet.name, population: currPlanet.population };
      });

      // get the max value for ration calc
      const maxValue = Math.max(...chartData.map((d) => d.population));
      
      chartData = chartData.map((data) => {
        return { ...data, ratio: (data.population / maxValue) * 100 };
      });

      setDisplayChart(chartData);
    }
    //eslint-disable-next-line
  }, [finishLoading]);

  if (dispalyData === null) return "Loading...";

  return (
    <div className="App">
      <table className="tableData">
        <tbody>
          <tr>
            <td>Population</td>
            {dispalyData.map((pop, i) => {
              return <td key={i}>{pop.population.toLocaleString()}</td>;
            })}
          </tr>
          <tr>
            <td>Vehicle name with the largest sum</td>
            {dispalyData.map((vn, i) => {
              return <td key={i}>{vn.vehiclesName}</td>;
            })}
          </tr>
          <tr>
            <td>Related home planets and their respective population</td>
            {dispalyData.map((p, i) => {
              return (
                <td key={i}>
                  {p.planets.map((planet, j) => (
                    <pre key={j}>{planet}</pre>
                  ))}
                </td>
              );
            })}
          </tr>
          <tr>
            <td>Related pilot names</td>
            {dispalyData.map((p, i) => {
              return (
                <td key={i}>
                  {p.pilots.map((pilot, j) => (
                    <pre key={j}>{pilot}</pre>
                  ))}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>

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
    </div>
  );
}

export default App;
