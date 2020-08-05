const taskList = document.querySelector(".list");
const inputText = document.querySelector(".input-bar");
const resetBtn = document.querySelector(".reset-btn");
const checkMark = document.querySelector(".check-mark");
const removeBtn = document.querySelector(".remove-btn");
const addBtn = document.querySelector(".add-btn");
//ITEMID for storing in list
let itemId = 0;
//List for storing the to-do, later stored in localstorage
let list = [];

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
  itemId++;
  addToList(text, id);
  console.log(list);
};
//add to list as object
const addToList = (text, id) => {
  list.push({
    id: id,
    name: text,
  });
};
//Remove item from
export const removeItem = () => {
  taskList.addEventListener("click", (e) => {
    const element = e.target;
    //   console.log(element.parentNode.parentNode.parentNode.nodeName)//From tag img up 3 times to UL, then delete tag IL from tag img 2 times up
    element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode); //simplify?

    // we have an array of objects, we want to remove one object using only the id property
    // get index of object with id
    var removeIndex = list.map(function (item) {return item.id;}).indexOf(37);
    // remove object
    list.splice(removeIndex, 1);
    //Magic! https://gist.github.com/scottopolis/6e35cf0d53bae81e6161662e6374da04
    console.log(list);
  });
};

export default userInput;
