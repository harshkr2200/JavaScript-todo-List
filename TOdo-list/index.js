const inputBox = document.querySelector("#input_box");
const addTaskbtn = document.querySelector("#add-task-btn");
const tableBody = document.querySelector(".table_item");
const btntext = document.querySelector("#add-task-btn");
let workList = [];
let edit_id = null;
const localData = localStorage.getItem("works");
if (localData != null) {
  workList = JSON.parse(localData);
}

addTaskbtn.addEventListener("click", () => {
  let task = inputBox.value;
  if (task.trim().length == "") {
    return;
    task = "";
  }
  if (edit_id != null) {
    workList.splice(edit_id, 1, { work: task });
  } else {
    workList.push({ work: task });
  }
  saveInfo(workList);
  inputBox.value = "";
  btntext.innerText = "Add Task";
});

const saveInfo = (workList) => {
  let string = JSON.stringify(workList);
  localStorage.setItem("works", string);
  displayInfo();
  window.location.reload(true);
};
const displayInfo = () => {
  let statment = "";
  workList.forEach((task, index) => {
    statment += `
    <tr>
    <td>${index + 1}</td>
    <td>${task.work}</td>
    <td class="td_icon">
      <i class="fa fa-edit" style="font-size: 25px; color: green" onclick='editInfo(${index});'></i>
      <i
        class="fa fa-archive"
        style="font-size: 25px; color: red" onclick='deleteInfo(${index});'
      ></i>
    </td>
  </tr>`;
  });
  tableBody.innerHTML = statment;
};
displayInfo();
const editInfo = (id) => {
  edit_id = id;
  inputBox.value = workList[id].work;
  btntext.innerText = "Save change";
};
const deleteInfo = (id) => {
  workList.splice(id, 1);
  saveInfo(workList);
  inputBox.value = "";
};
