import { swapiUrl } from "./consts";

export const getSwapiData = (type) => {
  let currUrl = `${swapiUrl}/${type}`;
  let isLoading = true;
  return new Promise(async (resolve, reject) => {
    (async () => {
      try {
        let result = [];

        while (isLoading) {
          const resp = await fetch(currUrl);
          const data = await resp.json();

          result = [...result, ...data.results];

          if (data.next === null) {
            // create key value pair
            const keyValObject = result.reduce(
              (obj, item) => ({ ...obj, [item.url]: item }),
              {}
            );

            resolve(keyValObject);
            isLoading = false;
            return;
          }
          currUrl = data.next;
        }
      } catch (error) {
        reject(error);
      }
    })();
  });
};

// const a = {
//   fun1: () => console.log("fun1"),
//   fun2: function () {
//     console.log("fun2", this);
//   },
//   fun3: function () {
//     console.log("fun3");
//   },
// };
// a.fun2();

// function fun1(a) {
//   this.
// }

// const closureAdd = (x) => {
//   const a = 'asd';
//   return (y) => {
//     return x + y;
//   };
// };
// fun1('blah')
// const add5 = closureAdd(5);
// console.log(add5(3));
