const inputBox=document.getElementById("input-box");
const listContainer=document.getElementById("list-container");
const dateInput=document.getElementById("due-date");
const searchInput=document.getElementById("input-search");
let date=new Date();

function addTask(){
    if(inputBox.value===''){
        console.log('puste');
        alert("Musisz cos wpisać!");

    }else if(3<inputBox.value.length && inputBox.value.length<255){
        console.log('zakres 3-255');
        if(new Date(dateInput.value)>date) {

                let li = document.createElement("li");
                let checkbox = document.createElement("input");

                checkbox.type = "checkbox";
                li.appendChild(checkbox);

                li.innerHTML += inputBox.value;
                li.innerHTML += "\t";
                li.innerHTML += dateInput.value;
                listContainer.appendChild(li);

                let span = document.createElement("span");
                span.innerHTML = "\u00d7";
                li.appendChild(span);

        }else{
            console.log("zla data");
        }
    }else{
        console.log('poza zakresem');
        alert("Tekst musi byc dluzszy niz 3 i krotszy niz 255 i data nie może być w przeszłości");
    }
    inputBox.value="";
    save();

}
searchInput.addEventListener("input",function (){
    const searchQuery=searchInput.value.toLowerCase();
    const tasks=listContainer.getElementsByTagName("li");

    for(let i=0;i<tasks.length;i++){
        const taskText=tasks[i].textContent.toLowerCase();
        if(taskText.includes(searchQuery)){
            tasks[i].style.display="block";
            tasks[i].classList.add("search-result");
        }else{
            tasks[i].style.display="none";
            tasks[i].classList.remove("search-result");
        }
    }
})
listContainer.addEventListener("click",function (a){
    if(a.target.tagName==="LI"){
        a.target.classList.toggle("checked");
        save();
    }
    else if(a.target.tagName==="SPAN"){
        a.target.parentElement.remove();
        save();
    }
},false);

listContainer.addEventListener("click", function (event) {
    const clickedElement = event.target;

    if (clickedElement.tagName === "LI") {
        const listItem = clickedElement;
        listItem.contentEditable = true;
        listItem.focus();
        listItem.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                listItem.contentEditable = false;
                save();
            }
        });
    } else if (clickedElement.tagName === "SPAN") {
        clickedElement.parentElement.remove();
        save();
    }

    // Jeśli jest checkbox wewnątrz LI, to przerywamy kliknięcie checkboxa
    if (clickedElement.tagName === "INPUT" && clickedElement.type === "checkbox") {
        event.stopPropagation();
    }
}, false);




function save(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function show(){
    listContainer.innerHTML=localStorage.getItem("data");
}
function showData(){
    for (let key in localStorage) {
        console.log(key, +"\n"+localStorage.getItem(key));
    }
}
show();
showData();