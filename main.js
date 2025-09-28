
const noteBox = document.getElementById("noteBox");
const dateBox = document.getElementById("dateBox");
const timeBox = document.getElementById("timeBox");
const noteContainer = document.getElementById("noteContainer");


// gets today date for preventing user to enter past date
function getRightDate() {
    const correctDate = new Date;
    const day = String(correctDate.getDate()).padStart(2, '0');
    const month = String(correctDate.getMonth() + 1).padStart(2, '0');
    const year = String(correctDate.getFullYear());
    dateBox.min = `${year}-${month}-${day}`;
};


getRightDate();

let allItems = [];
let editMode = false;
let editId = null;

// loads items from localStorage 
loadData();

function addNote() {
    if (editMode) {
        updateNote();
    }
    else {
        addData();
    }
    displayDataInCards();
    clearUI();
    saveData();
}

// adding one new item 
function addData() {
    noteBox.style.backgroundColor = "white";
    dateBox.style.backgroundColor = "white";
    timeBox.style.backgroundColor = "white";

    const id = allItems.length + 1;
    const note = noteBox.value;
    const date = dateBox.value;
    const time = timeBox.value;

    if (noteBox.value === "") {
        alert("Please Enter A Note!!!");
        noteBox.focus();
        noteBox.style.backgroundColor = "red";
        return;
    }
    if (dateBox.value === "") {
        alert("Please Enter Date!!!");
        dateBox.focus();
        dateBox.style.backgroundColor = "red";
        return;
    }
    if (timeBox.value === "") {
        alert("Please Enter A Time!!!");
        timeBox.focus();
        timeBox.style.backgroundColor = "red";
        return;
    }

    const oneNote = { id, note, date, time };
    allItems.push(oneNote);
}

// preventing id to be 1,5,6
function idCheck() {
    for (let i = 0; i < allItems.length; i++) {
        index = 1;
        if (allItems[i].id !== i + 1) {
            index += i;
            allItems[i].id = index;
            break;
        }
    }
}

// displays all notes id checking
function displayDataInCards() {

    idCheck();

    let content = "";
    for (const item of allItems) {
        content += `
        <div class = "list">
            <span >Task Number ${item.id}</span>
            <br>
            <br>
            <span class="note" data-id="${item.id}">${item.note}</span>
            <span>${item.date}</span>
            <br>
            <span>${item.time}</span>
            <br>
            <div class="button-container">
                <button onclick="deleteItem(${item.id})"> ❌ </button>
                <button onclick="edit(${item.id})" > 📝 </button>
            </div>
        </div>
        `;

        idCheck();

    }
    noteContainer.innerHTML = content;
    const lists = document.querySelectorAll(".list");
    lists.forEach((list, index) => {
        setTimeout(() => {
            list.classList.add("fade-in");
        }, index * 100);
    });
}


function clearUI() {
    if (noteBox.value !== "" && dateBox.value !== "" && timeBox.value !== "") {
        noteBox.value = ""
        dateBox.value = ""
        timeBox.value = ""
        noteBox.focus();
    }
}


function deleteItem(id) {
    const sure = confirm("Are you sure?");
    if (!sure) return;

    let index = 0;
    for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].id === id) {
            index = i;
            break;
        }
    }
    allItems.splice(index, 1);
    saveData();
    displayDataInCards();
}


function erase() {
    noteBox.value = ""
    dateBox.value = ""
    timeBox.value = ""
    noteBox.focus();
}

function saveData() {
    const json = JSON.stringify(allItems);
    localStorage.setItem("My-Task-Board", json);
}

function loadData() {
    const json = localStorage.getItem("My-Task-Board");
    if (json) {
        allItems = JSON.parse(json);
    }
    displayDataInCards();
}


function edit(id) {
    const noteElement = document.querySelector(`.list span.note[data-id='${id}']`);
    if (!noteElement) return;

    noteElement.contentEditable = true;
    noteElement.focus();

    noteElement.addEventListener("keydown", function handler(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            noteElement.contentEditable = false;

            const item = allItems.find(n => n.id === id);
            if (item) {
                item.note = noteElement.textContent;
                saveData();
            }

            noteElement.removeEventListener("keydown", handler);
        }
    });


    noteElement.addEventListener("blue", function handler() {
        noteElement.contentEditable = false;

        const item = allItems.find(n => n.id === id);
        if (item) {
            item.note = noteElement.textContent;
            saveData()
        }

        noteElement.removeEventListener("blue", handler);
    })
}

function updateNote() {
    const item = allItems.find(n => n.id === editId);
    if (!item) return;

    item.note = noteBox.value;
    item.date = dateBox.value;
    item.time = timeBox.value;

    editMode = false;
    editId = null;

    const saveBtn = document.querySelector("button[onclick='addNote()']");
    saveBtn.textContent = "Save";
}