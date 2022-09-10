const rootElement = document.querySelector(".root");
const textInput = document.querySelector(".input-text");
const addButton = document.querySelector(".input-submit");
const ulElement = document.querySelector("ul");
const clearButton = document.querySelector(".clear");


function addItem() {
  
  let textEnterd = textInput.value.trim();

  if (textEnterd.length < 1) {
    textInput.value = "";
  } else {
    
    const date = new Date();
    let liElement = document.createElement("li");
    liElement.innerHTML = `
      <div class="main-container">
        <span>${textEnterd}</span>
        <div class="btn-group">
          <button class="done">✔</button>
          <button class="delete">✖</button>
          
        </div>
      </div>
      <div class="p-date">
        <span>Created: </span>
        <p class="date">${date.toDateString()} - ${date.toLocaleTimeString()}</p>
      </div>`;

    ulElement.append(liElement);

    clearButton.classList.add("clear-appear");
    textInput.value = "";

    let deleteButton = liElement.querySelector(".delete");
    let doneButton = liElement.querySelector(".done");
    let spanElement = liElement.querySelector("span");
    let spanText = liElement.querySelector("span").innerText;
    let divElement = liElement.querySelector(".main-container");

    deleteButton.addEventListener(
      "click",
      function () {
        liElement.outerHTML = "";
        if (!ulElement.innerText) {
          clearButton.classList.remove("clear-appear");
        }
      },
      false
    );
 
    doneButton.addEventListener(
      "click",
      function () {
        if (liElement.classList != "font") {
          
          if (
            spanElement.innerText.trim().replace(/&nbsp;/g, "") != "" &&
            spanElement.innerText.trim().replace(/&nbsp;/g, "").length <= 50
          ) {
            spanElement.innerHTML = spanElement.innerHTML
              .trim()
              .replace(/&nbsp;/g, "");

            if (
              spanElement.innerText.trim().replace(/&nbsp;/g, "") !=
              spanText.trim().replace(/&nbsp;/g, "")
            ) {
              let editSpanElement = document.createElement("span");
              editSpanElement.innerHTML = "Edited";
              editSpanElement.classList.add("edited");
              divElement.after(editSpanElement);
            }
            
            const newDate = new Date();
            
            let divDoneElement = document.createElement("div");

            let content = `
            <div class="done-date">
              <span>Done: </span>
              <p class="new-date">${newDate.toDateString()} - ${newDate.toLocaleTimeString()}</p>
            </div>
            `;

            divDoneElement.innerHTML = content;
            liElement.append(divDoneElement);
            
            liElement.classList.add("font");
            
            spanElement.setAttribute("contenteditable", false);
          }
        }
      },
      false
    ); 
  }
}

addButton.addEventListener("click", addItem, false);

textInput.addEventListener("keyup", function (event) {
 
  if (event.keyCode === 13) {
    
    event.preventDefault();
   
    addItem();
    
  }
});

clearButton.addEventListener(
  "click",
  function () {
   
    ulElement.innerHTML = "";
    textInput.value = "";
    clearButton.classList.remove("clear-appear");
  },
  false
);
