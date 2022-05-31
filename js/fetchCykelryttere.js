const urlCykelrytter = "http://localhost:8080/cykelryttere";
const urlHold = "http://localhost:8080/cykelhold";

const rytterMap = new Map();      //forEach loop for at hente totalTid fra alle ryttere?
const rytterHoldMap = new Map();

/**
 * Fetcher alle ryttere fra vores DB
 * @returns {Promise<void>}
 */
async function fetchRyttereFraDB() {
  console.log('FETCHING FROM DB');
  const promise = fetch(urlCykelrytter).then(response => response.json());
  await promise.then(data => {
    data.forEach(cykelrytter => {
      rytterMap.set(cykelrytter.rytterId, cykelrytter);
    })
  })
}

/**
 * Fetcher alle hold fra vores DB
 * @returns {Promise<void>}
 */
async function fetchHoldFraDB() {
  console.log('FETCHING HOLD FROM DB');
  const promise = fetch(urlHold).then(response => response.json());
  await promise.then(data => {
    data.forEach(cykelhold => {
      rytterHoldMap.set(cykelhold.holdId, cykelhold);
    })
  })
}

