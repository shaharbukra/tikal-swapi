import MaxPopTable from "./component/MaxPopTable/maxPopTable";
import PlanetChartBar from "./component/PlanetChartBar/planetChartBar";
import Loader from "./component/Loader/loader";
import { useSwapi } from "./customHooks/useSwapi";
import { useSwapiForAnswers } from "./customHooks/useSwapiForAnswers";

function App() {
  const swapiData = useSwapi([
    "people",
    "vehicles",
    "planets",
  ]);

  const { answers } = useSwapiForAnswers(swapiData);

  if (answers === null) return <Loader/>;

  return (
    <div className="App">
      <MaxPopTable data={answers.maxPopTable} />
      <PlanetChartBar data={answers.chartData} />
    </div>
  );
}

export default App;
