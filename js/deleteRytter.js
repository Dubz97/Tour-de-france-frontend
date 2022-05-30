const tableRyttere = document.getElementById("ryttereTable");

function addRow(cykelrytter) {

  console.log("adding rows");

  let rowCount = tableRyttere.rows.length;
  let row = tableRyttere.insertRow(rowCount);
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
  cell6.innerHTML = cykelrytter.cykelhold.holdId;

  let cell7 = row.insertCell(6);
  cell7.innerHTML = cykelrytter.cykelhold.holdNavn;

  let cell8 = row.insertCell(7);
  let pbDelete = document.createElement("input");
  pbDelete.type = "button";
  pbDelete.setAttribute("value", "slet rytter");
  pbDelete.onclick = function () {
    document.getElementById(cykelrytter.cykelrytter).remove();
    deleteRytter(cykelrytter);
  }
  cell8.appendChild(pbDelete);
}

/**
 * Bygger table samt fetch af ryttere
 * @returns {Promise<void>}
 */
async function createTableFromMap() {
  await fetchRyttereFraDB();
  console.log(rytterMap);
  console.log("create table");
  for (const rytterKey of rytterMap.keys()) {
    const rytter1 = rytterMap.get(rytterKey);
    addRow(rytter1);
  }
}

createTableFromMap();

async function deleteRytter(cykelrytter) {

  try {
    await restDeleteRytter(cykelrytter);

  } catch (error) {
    alert(error.message);
    console.log(error);
  }
}

async function restDeleteRytter(cykelrytter) {
  const url = "http://localhost:8080/delete/cykelrytter/" + cykelrytter.rytterId;

  const fetchOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: ""
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    console.log("Rytteren blev IKKE slettet");
  }
  alert('Rytter er nu slettet');
  window.location.href = "deleteCykelrytter.html";
  return response;
}
