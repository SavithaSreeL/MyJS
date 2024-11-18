// todo.js

const valuearray = JSON.parse(localStorage.getItem("savedArr")) || [];
let pendingFlag = false ;
let completedFlag = false ;
function addTask() {
    debugger;
    const category = document.getElementById("drop1").value;
    const description = document.getElementById("desc1").value;
    let tempArr = { category: category, desc: description, status: false }
    valuearray.push(tempArr);
    console.log('values', valuearray)
    localStorage.setItem("savedArr", JSON.stringify(valuearray));
    displayValues(valuearray);
    resetValues();
}
function resetValues() {
    document.getElementById("drop1").value = '';
    document.getElementById("desc1").value = null;
}
function CheckFunction(item) {
    valuearray[item].status = !valuearray[item].status;
    localStorage.setItem("savedArr", JSON.stringify(valuearray))
    const storedValues = localStorage.getItem("savedArr");
    console.log(storedValues)
}
function displayValues(array) {
    debugger;
    console.log('entered')
    console.log('initial', array)
    var rows = '';
    for (var i = 0; i < array.length; i++) {
        rows += '<tr id="row' + i + '">';
        rows += '<td>' + (i + 1) + '</td>';
        rows += '<td>' + array[i].category + '</td>';
        rows += '<td>' + array[i].desc + '</td>';
        rows += '<td ><div class="form-check form-check-success "><input type="checkbox" class="form-check-input" ' + (array[i].status ? 'checked' : '') + '  id="check' + i + '" onchange="CheckFunction(' + i + ')"></div></td>';
        rows += '<td><button class="btn text-danger" onclick="DeleteRow(' + i + ')">Delete</button></td>';
        rows += '</tr>';
    }
    document.getElementById('tbody1').innerHTML = rows;
}
function DeleteRow(item) {
    debugger;
    console.log('val in d ',valuearray)
    valuearray.splice(item,1);
    localStorage.setItem("savedArr", JSON.stringify(valuearray));
    
   // displayValues(arrayName);
   
    if(completedFlag){
        CompletedClicked();
    }
    else if(pendingFlag){
        PendingClicked()
    }
    else{
        displayValues(valuearray);
    }
   
}

function CompletedClicked(){
    completedFlag = true ;
    pendingFlag = false;
    let CompletedItems = valuearray.filter(item => item.status === true);
    displayValues(CompletedItems);

}
function AllClicked(){
    completedFlag = false ;
    pendingFlag = false;    
    displayValues(valuearray);
}
function PendingClicked(){
    pendingFlag = true;
    completedFlag = false ;
    let PendingItems = valuearray.filter(item => item.status === false);
    displayValues(PendingItems);
}
function clearCompleted(){
   for(i=0;i<valuearray.length;i++){
    if(valuearray[i].status === true){
        valuearray.splice(i)

    }
   }
    localStorage.setItem("savedArr", JSON.stringify(valuearray));
    displayValues(valuearray);

}
displayValues(valuearray);


