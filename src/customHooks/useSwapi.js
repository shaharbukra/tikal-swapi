import { useState, useEffect } from "react";
import { getSwapiData } from "../api/helper";

import useLocalStorage from "./useLocalStorage";

export function useSwapi(types) {
  const [swapiData, setSwapiData] = useState({});
  const [finishDownloading, setFinishDownloading] = useState(false);
  const [swapiLocalStorage, setSwapiLocalStorage] = useLocalStorage("swapi");

  useEffect(() => {
    const fetchSwapiData = async () => {
      if (swapiLocalStorage === null) {
        try {
          //   console.log(r);
          const swapiRequests = types.map(getSwapiData);
          const result = await Promise.all(swapiRequests);
          const [people, vehicles, planets] = result;
          const data = { people, vehicles, planets };

          setSwapiData({ data });
          setSwapiLocalStorage({ data });

          setFinishDownloading(true);
        } catch (error) {
          console.log(error);
        }
      } else {
        setSwapiData(swapiLocalStorage);
        setFinishDownloading(true);
      }
    };
    fetchSwapiData();
    //eslint-disable-next-line
  }, []);

  return { finishDownloading, swapiData };
}
