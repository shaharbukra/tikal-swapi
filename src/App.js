import { useEffect, useState } from "react";
import useLocalStorage from "./customHooks/useLocalStorage";
import { getSwapiData } from "./api/getSwapiData";
import { firstPartAnswer, secondPartAnswer } from "./api/answers";
import MaxPopTable from "./component/MaxPopTable/maxPopTable";
import PlanetChartBar from "./component/PlanetChartBar/planetChartBar";

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

  useEffect(() => {
    if (finishLoading) {
      // Part 1
      const answer = firstPartAnswer(swapiData);
      setDispalyData(answer);

      // Part 2 - Chart Data
      const chartData = secondPartAnswer(swapiData);
      setDisplayChart(chartData);
    }
    //eslint-disable-next-line
  }, [finishLoading]);

  if (dispalyData === null) return "Loading...";

  return (
    <div className="App">
      <MaxPopTable data={dispalyData} />

      <PlanetChartBar data={displayChart} />
    </div>
  );
}

export default App;
