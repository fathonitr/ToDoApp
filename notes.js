const taskList = document.querySelector(".list");
const inputText = document.querySelector(".input-bar");
const resetBtn = document.querySelector(".reset-btn-img");
const removeBtn = document.querySelector(".remove-btn");
const addBtn = document.querySelector(".add-btn-img");
const fullDate = document.querySelector(".day-date");
//ITEMID for storing in list
let itemId = 0;
//List for storing the to-do, later stored in localstorage
let list = [];
//Date object
let date = new Date();

export const setDayDate = () => {
  const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const month = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  fullDate.textContent = day[date.getDay()] + ", " + date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear();
};

const userInput = () => {
  inputText.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
      addItem(inputText.value, itemId, "unmarked");
      inputText.value = ""; //Clear input bar
    }
  });
  addBtn.addEventListener("click", () => {
    addItem(inputText.value, itemId, "unmarked");
    inputText.value = ""; //Clear input bar
  });

  markItem();
  removeItem();
  resetList();
};
//Add item, placed under class .list. It won't add item with the same id with existing items
const addItem = (text, id, isMarked) => {
  const item = `<il class="item">
    <i class="check-mark" id="${id}"><img src="./image/checkmark.svg" class="check-mark-img" alt="checkmark"></i>
    <p class="text" id="${id}" done="${isMarked}">${text}</p>
    <i class="remove-btn" id="${id}"><img src="./image/remove.svg" class="remove-btn-img" alt="remove" id="${id}"></i>
</il>`;
  
    taskList.insertAdjacentHTML("beforeend", item);
    addToList(text, id, isMarked);
    itemId++;
  
};
//Add item, only used after page get reloaded
const addItemLocalStorage = (text, id, isMarked) => {
  let checkIcon = isMarked === "marked" ? 'style="text-decoration:line-through"' : "";
  const item = `<il class="item">
    <i class="check-mark" id="${id}"><img src="./image/checkmark.svg" class="check-mark-img" alt="checkmark"></i>
    <p class="text" ${checkIcon} id="${id}" done="${isMarked}">${text}</p>
    <i class="remove-btn" id="${id}"><img src="./image/remove.svg" class="remove-btn-img" alt="remove" id="${id}"></i>
</il>`;

  taskList.insertAdjacentHTML("beforeend", item);
};

//add to list as object
const addToList = (text, id, check) => {
  let item = {
    id: id,
    name: text,
    done: check,
  };

  list.push(item);
  addToLocalStorage(id, item);
};

//Store list to local storage
const addToLocalStorage = (id, item) => {
  if (localStorage.getItem(id) === null) {
    localStorage.setItem(id, JSON.stringify(item));
    console.log("its line 76")
  } else {
    console.log("id and key don't match");
    console.log(localStorage.getItem(id));
  }
};

export const loadLocalStorage = () => {
  let keyLocalStorage = Object.keys(localStorage).sort(); //keys from local storage, sorted
  let lastKey = keyLocalStorage[keyLocalStorage.length - 1];
  if (lastKey < 0 || lastKey == undefined) {
    itemId = 0;
  } else {
    itemId = lastKey;
    itemId++;
  }
  for (let x of keyLocalStorage) {
    //loop through array, get item from localstorage by using key
    let temp = JSON.parse(localStorage.getItem(x));
    addItemLocalStorage(temp.name, temp.id, temp.done);
  }
};

//Mark the item in a list, it will accsess the localstorage, remove unmarked with mark vice versa, and re adding the item
const markItem = () => {
  taskList.addEventListener("click", (e) => {
    //event listener on list, because item and its child doesn't exist at the begining
    const element = e.target;
    if (element.className === "check-mark-img") {
      //Only icon should be clicked
      //Get the element, search for <p>
      const test = element.parentNode.parentNode.childNodes[3];
      //Extract the id and text from <p>
      let id = Number(test.id);
      let text = test.innerHTML;
      let lined = test.style.textDecoration;
      let marked;
      if (lined === "line-through") {
        test.style.textDecoration = "";
        marked = "unmarked";
      } else {
        test.style.textDecoration = "line-through";
        marked = "marked";
      }

      localStorage.removeItem(id);
      //delete item that gonna be replaced
      // element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
      //Readding
      list = [];
      //addItem(text, id, marked);
      addToList(text, id, marked);
      // console.log(test.style.textDecoration)
    }
  });
};
//Remove item from
export const removeItem = () => {
  taskList.addEventListener("click", (e) => {
    //event listener on list, because item and its child doesn't exist at the begining
    const element = e.target;
    // console.log(element.nodeName); //From <img> up 3 times to <UL>, then delete  <IL> from  <img> 2 times up
    if (element.className === "remove-btn-img") {
      //So it only delete element, when the icon is clicked
      element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode); //simplify?
      localStorage.removeItem(element.id); //remove item from localstorage
      list = []; //empty list, so it doesn't ruin the localstorage
    }
  });
};

//Reset list, cleare localstorage. Create blank
export const resetList = () => {
  resetBtn.addEventListener("click", () => {
    if (taskList.hasChildNodes) {
      //  console.log(taskList.nodeName);
      //Set whole innerhtml to empty string
      taskList.innerHTML = "";
      //Emtpy local storage
      localStorage.clear();
    }
  });
};

export default userInput;
