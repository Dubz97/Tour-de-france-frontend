let ryttere = [];
const tableHurtigsteRyttere = document.getElementById("ryttereTable");
const urlCykelrytter = "http://localhost:8080/cykelryttere";

/**
 * Henter rytterne fra den samlet DB liste, derefter sortere hurtigste tid
 * @returns {Promise<void>}
 */
async function fetchHurtigesteRyttereFraDB() {
  console.log('FETCHING FROM DB');
  const promise = fetch(urlCykelrytter).then(response => response.json());
  await promise.then(data => {
    data.forEach(cykelrytter => {
      ryttere.push(cykelrytter);
    })
  })
  ryttere.sort((a, b) => a.totalTid - b.totalTid
)
}
console.log(ryttere);


/**
 * Tilføjer rows til den passende mængde af ryttere
 * @param cykelrytter
 */
function addRowHurtigste(cykelrytter) {

  console.log("adding rows");

  let rowCount = tableHurtigsteRyttere.rows.length;
  let row = tableHurtigsteRyttere.insertRow(rowCount);
  row.id = cykelrytter.cykelrytter;

  let cell1 = row.insertCell(0);
  cell1.innerHTML = cykelrytter.rytterId;

  let cell2 = row.insertCell(1);
  cell2.innerHTML = cykelrytter.navn;

  let cell3 = row.insertCell(2);
  cell3.innerHTML = cykelrytter.land;

  let cell4 = row.insertCell(3);
  cell4.innerHTML = cykelrytter.bjergpoint;

  let cell5 = row.insertCell(4);
  cell5.innerHTML = cykelrytter.spurtpoint;

  let cell6 = row.insertCell(5);
  console.log(cykelrytter.totalTid);
  cell6.innerHTML = cykelrytter.totalTid;

  let cell7 = row.insertCell(6);
  cell7.innerHTML = cykelrytter.cykelhold.holdNavn;

}

/**
 * Bygger table samt fetch af de hurtigste ryttere sorteret
 * @returns {Promise<void>}
 */
async function createTableFromMap() {
  await fetchHurtigesteRyttereFraDB();
  console.log(ryttere);
  console.log("create table");
  ryttere.forEach((rytter) =>  {
    addRowHurtigste(rytter);
  });
}

createTableFromMap();
