let selectedHold;
const cykelholdSelector = document.getElementById("cykelholdDropDown");
document.addEventListener("DOMContentLoaded", loadAsyncData);

const url = "http://localhost:8080/create/cykelrytter"

document.addEventListener("DOMContentLoaded", createDropDown);
document.addEventListener("DOMContentLoaded", createFormEvent);

async function loadAsyncData() {
  await fetchHoldFraDB();
  createDropDown();
}

function createDropDown() {
  console.log(rytterHoldMap);
  rytterHoldMap.forEach((cykelhold) => {
      let options = document.createElement("option");
      options.text = cykelhold.holdNavn;
      options.value = JSON.stringify(cykelhold);
      cykelholdSelector.options.add(options);

    }
  )
}


document.addEventListener("DOMContentLoaded", createFormEvent);


function createFormEvent() {  //create form event listener
  const formObject = document.getElementById("assign");
  formObject.addEventListener("submit", handleCykelrytterSubmit);
}

async function handleCykelrytterSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;


  try {
    const formData = new FormData(form);

    await insertCykelrytterInBackend(url, formData);

    alert(formData.get("navn") + " is created");
  } catch (error) {
    alert("Error in function handleCykelrytterSubmit " + error.message);
  }
  window.location.href = "addCykelrytter.html";                  //Nødvendig?
}

async function insertCykelrytterInBackend(url, formData) {
  const plainFormData = Object.fromEntries(formData.entries());
  console.log(plainFormData);

  const formDataJsonString = JSON.stringify(plainFormData);
  console.log(formDataJsonString);
  let cykelholdObj = JSON.parse(cykelholdSelector.value);
  console.log(cykelholdObj);
  let cykelrytterJSON = {
    navn: plainFormData.navn,
    alder: parseInt(plainFormData.alder),
    land: plainFormData.land,
    bjergpoint: parseInt(plainFormData.bjergpoint),
    spurtpoint: parseInt(plainFormData.spurtpoint),
    totalTid: parseInt(plainFormData.totalTid),
    cykelhold: cykelholdObj
  }

  const JSONObjectToJSONString = JSON.stringify(cykelrytterJSON);
  console.log(JSONObjectToJSONString);

  const POSTOptions = {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSONObjectToJSONString
  }

  const response = await fetch(url, POSTOptions);

  if (!response) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

  return response;

}
