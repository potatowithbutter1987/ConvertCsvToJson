const app = require("./convert");

main();

async function main() {
  const startTime = Date.now();

  await app.csv2json();

  const endTime = Date.now();

  console.log("completed !!");
  console.log(`process time : ${endTime - startTime} ms`);
}
