const taskList = document.querySelector(".list");
const inputText = document.querySelector(".input-bar");
const resetBtn = document.querySelector(".reset-btn-img");
const checkMark = document.querySelector(".check-mark");
const removeBtn = document.querySelector(".remove-btn");
const addBtn = document.querySelector(".add-btn");
const fullDate=document.querySelector(".day-date")
//ITEMID for storing in list
let itemId = 0;
//List for storing the to-do, later stored in localstorage
let list = [];
//Date object
let date=new Date;

export const setDayDate=()=>{
  const day = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  fullDate.textContent =
  day[date.getDay()] +
  ", " +
  date.getDate() +
  " " +
  month[date.getMonth()] +
  " " +
  date.getFullYear();


}

const userInput = () => {
  inputText.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
      addItem(inputText.value, itemId);
      inputText.value = "";
    }
  });
};
//Add item, placed under class .list
const addItem = (text, id) => {
  const item = `<il class="item">
    <i class="check-mark" id="${id}"><img src="./image/checkmark.svg" alt="checkmark"></i>
    <p class="text" id="${id}">${text}</p>
    <i class="remove-btn" id="${id}"><img src="./image/remove.svg" alt="remove" id="${id}"></i>
</il>`;

  taskList.insertAdjacentHTML("beforeend", item);
  addToList(text, id);
  itemId++;
};
//Add item, only used after page get reloaded
const addItemLocalStorage = (text, id) => {
  const item = `<il class="item">
    <i class="check-mark" id="${id}"><img src="./image/checkmark.svg" alt="checkmark"></i>
    <p class="text" id="${id}">${text}</p>
    <i class="remove-btn" id="${id}"><img src="./image/remove.svg" alt="remove" id="${id}"></i>
</il>`;

  taskList.insertAdjacentHTML("beforeend", item);
};

//add to list as object
const addToList = (text, id) => {
  let item = {
    id: id,
    name: text,
  };

  list.push(item);
  addToLocalStorage(itemId, item);
};

//Store list to local storage
const addToLocalStorage = (id, item) => {
  localStorage.setItem(id, JSON.stringify(item));
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
    addItemLocalStorage(temp.name, temp.id);
  }
};


//Remove item from
export const removeItem = () => {
  taskList.addEventListener("click", (e) => {
    const element = e.target;
    console.log(element.nodeName); //From <img> up 3 times to <UL>, then delete  <IL> from  <img> 2 times up
    if (element.nodeName === "IMG") {
      //So it only delete element, when the icon is clicked
      element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode); //simplify?
      localStorage.removeItem(element.id);//remove item from localstorage
      list = []; //empty list, so it doesn't ruin the localstorage
    }
  });
};

export const resetList=()=>{
  resetBtn.addEventListener("click", ()=>{
    if(taskList.hasChildNodes){
      console.log(taskList.nodeName)
      //Set whole innerhtml to empty string
      taskList.innerHTML=""
      //Emtpy local storage
      localStorage.clear()
    }
  })
}

export default userInput;
