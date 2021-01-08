import { useEffect, useState } from "react";
import useLocalStorage from "./customHooks/useLocalStorage";
import { getSwapiData } from "./api/helper";
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
          const data = { people, vehicles, planets };

          setSwapiData({ data });
          setSwapiLocalStorage({ data });

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
      const { data } = swapiData;
      const answers = {
        maxPopTable: firstPartAnswer(data),
        chartData: secondPartAnswer(data),
      };

      setSwapiData((p) => {
        return { ...p, answers };
      });
    }
  }, [finishLoading, swapiData]);

  if (finishLoading === false || swapiData.answers === undefined)
    return "Loading...";

  return (
    <div className="App">
      <MaxPopTable data={swapiData.answers.maxPopTable} />
      <PlanetChartBar data={swapiData.answers.chartData} />
    </div>
  );
}

export default App;
