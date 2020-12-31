import { swapiUrl } from "./consts";

export const getSwapiData = (type) => {
  let currUrl = `${swapiUrl}/${type}`;
  let isLoading = true;
  return new Promise(async (resolve, reject) => {
    try {
      let result = {};

      while (isLoading) {
        const resp = await fetch(currUrl);
        const data = await resp.json();

        let keyVal = {};
        for (const r of data.results) {
          keyVal[r.url] = r;
        }

        result = { ...result, ...keyVal };

        if (data.next === null) {
          resolve(result);
          isLoading = false;
          return;
        }
        currUrl = data.next;
      }
    } catch (error) {
      reject(error);
    }
  });
};
