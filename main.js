const noteBox = document.getElementById("noteBox");
const dateBox = document.getElementById("dateBox");
const timeBox = document.getElementById("timeBox");
const noteContainer = document.getElementById("noteContainer");

const allItems = [];



function addNote(){
    addData();
    displayDataInCards();
    clearUI()
}



function addData(){
    const id = allItems.length + 1;
    const note = noteBox.value;
    const date = dateBox.value;
    const time = timeBox.value;

    const oneNote = {id,note,date,time};
    allItems.push(oneNote);
}



function displayDataInCards(){
    let content = "";
    for (const item of allItems){
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


function clearUI(){
    noteBox.value = null
    dateBox.value = null
    timeBox.value = null

    noteBox.focus();

}


function deleteItem(id){
    const sure = confirm("Are you sure?");
    if (!sure) return;

    let index = 0;
    for (let i = 0; i < allItems.length; i++){
        if (allItems[i].id === id){
            index = i;
            break;
        }
    }
    allItems.splice(index, 1);
    displayDataInCards();
}






// add earse button
// notification one day before deleting note
// JSON till time and date runs out
// ID FIN (EX): Task Number 1/2/3/4/5 not 1/2/3/3/3
// Forse to enter input
// CSS
// EDIT