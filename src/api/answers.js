export const firstPartAnswer = (swapiData) => {
  const getPilotPlanetAndPopFromVehicle = ({ pilots, name }) => {
    const planets = pilots.map((pilot) => swapiData.people[pilot].homeworld);
    const population = planets
      .map((planet) => Number(swapiData.planets[planet].population))
      .reduce((acc, cur) => acc + cur);

    return {
      population,
      vehiclesName: name,
      planets: planets.map(
        (planet) =>
          `${swapiData.planets[planet].name} - ${Number(
            swapiData.planets[planet].population
          )}`
      ),
      pilots: pilots.map((pilot) => swapiData.people[pilot].name),
    };
  };

  const answer = Object.values(swapiData.vehicles)
    .filter((vehicle) => vehicle.pilots.length)
    .map(getPilotPlanetAndPopFromVehicle)
    .filter((p) => !isNaN(p.population))
    .sort((planet1, planet2) => planet2.population - planet1.population);

  return answer;
};

export const secondPartAnswer = (swapiData) => {
  const chartPlanets = ["Tatooine", "Alderaan", "Naboo", "Bespin", "Endor"];

  const chartData = chartPlanets.map((planet) => {
    const { name, population } = Object.values(swapiData.planets).find(
      ({ name }) => name === planet
    );
    return { name, population };
  });

  // get the max value for ratio calc
  const maxValue = Math.max(...chartData.map(({ population }) => population));

  const displayChart = chartData.map((data) => ({
    ...data,
    ratio: (data.population / maxValue) * 100,
  }));
  return displayChart;
};
