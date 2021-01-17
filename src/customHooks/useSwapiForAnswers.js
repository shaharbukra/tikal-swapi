import { useState, useEffect } from "react";
import { firstPartAnswer, secondPartAnswer } from "../api/answers";

export function useSwapiForAnswers({ finishDownloading, swapiData : {data} }) {
  const [answers, setAnswers] = useState(null);
  useEffect(() => {
    if (finishDownloading) {
    //   const { data } = swapiData;
      setAnswers({
        maxPopTable: firstPartAnswer(data),
        chartData: secondPartAnswer(data),
      });
    }
    //eslint-disable-next-line
  }, [finishDownloading]);

  return { answers };
}
