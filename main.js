const noteBox = document.getElementById("noteBox");
const dateBox = document.getElementById("dateBox");
const timeBox = document.getElementById("timeBox");
const noteContainer = document.getElementById("noteContainer");

const allItems = [];



function addNote() {
    addData();
    displayDataInCards();
    clearUI()
}

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

function displayDataInCards() {
    let content = "";
    for (const item of allItems) {
        content += `
        <div>
            <span>Task Number ${item.id}</span>
            <br>
            <span>${item.note}</span>
            <br>
            <span>${item.date}</span>
            <br>
            <span>${item.time}</span>
            <button onclick="deleteItem(${item.id})"> ❌ </button>
        </div>
        `;
    }
    noteContainer.innerHTML = content;

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
    displayDataInCards();
}

function erase() {
    noteBox.value = ""
    dateBox.value = ""
    timeBox.value = ""
    noteBox.focus();
}



// notification one day before deleting note
// JSON till time and date runs out
// ID FIN (EX): Task Number 1/2/3/4/5 not 1/2/3/3/3
// CSS
// EDIT button
// not letting to enter expired dates