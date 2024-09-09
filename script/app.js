const url = " http://localhost:3004";
const inputtodo = document.getElementById("title_todolist");
const formtodo = document.getElementById("form_todo");
const btnAdd=document.querySelector(".add-task");
const edit=document.querySelector(".input-edit");
const ulelementtodo = document.querySelector("#todolist ul");
const ulelementdone = document.querySelector("#donelist ul");
const todolist = document.querySelector("#todolist");
const donelist = document.querySelector("#donelist");

//input value check and send for posttodo
const checkinput=()=>{
    let inputvalue = inputtodo.value.trim();
    if (inputvalue) {
        if(inputvalue.length > 15){
            inputvalue=inputvalue.slice(1,15) + ".....";
        }
        const data = {
            title: inputvalue
        }
        posttodo(data);
    }
    else{
        const span=document.createElement("span");
        span.innerText="you cant let title empty!!!!";
        formtodo.prepend(span);
        setTimeout(function(){
            formtodo.removeChild(span);
        },2000)
    }
    inputtodo.value = "";
}
//creat in fake api todolist
const posttodo = async (data) => {
    const respons = await fetch(url + "/todolist", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    });
}
//creat in fake api donelist
const postdone = async (data) => {
    const respons = await fetch(url + "/donelist", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
}
//get fake api and creat listtodo
const gettodo = async () => {
    const respons = await fetch(url + "/todolist");
    const datas = await respons.json();
    for (const data of datas) {
        ulelementtodo.innerHTML += `
        <li class="list_todo">
            <h3>${data.title}</h3>
            <div data-id="${data.id}">
                <i class='bx bx-edit-alt edit'></i>
                <i class='bx bx-x-circle deleat'></i>
                <button class="btn">Done</button>
            </div>
        </li>`
    }
}
//get fake api and creat listdone
const getdone = async () => {
    const respons = await fetch(url + "/donelist");
    const datas = await respons.json();
    for (const data of datas) {
        ulelementdone.innerHTML += `
        <li class="list_done">
            <h3>${data.title}</h3>
            <div data-id="${data.id}">
                <i class='bx bx-x-circle deleat'></i>
                <button class="btn">Undo</button>
            </div>
        </li>`
    }
}
//delete todolist
const deletetodo = async (id) => {
    const response = await fetch(url + `/todolist/${id}`, {
        method: "DELETE",
    });
};
//edit todolist
const edittodo = async (id) => {
    if (inputtodo.value.trim()) {
        if(inputtodo.value.length > 15){
            inputvalue.value=inputvalue.value.slice(1,15) + ".....";
        }
        const data = {
            title: inputtodo.value
        };    
        const response = await fetch(url + `/todolist/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        });
    }
    else{
        const span=document.createElement("span");
        span.innerText="you cant let title empty!!!!";
        formtodo.prepend(span);
        setTimeout(function(){
            formtodo.removeChild(span);
        },2000)
    }
};
//button done todolist
const btntodo = async (id) => {
    const respons = await fetch(url + `/todolist/${id}`)
    const data = await respons.json();
    await postdone(data);
    deletetodo(id);
}
//delete donelist
const deletedone = async (doneid) => {
    const respons = await fetch(url + `/donelist/${doneid}`, {
        method: "DELETE"
    });
}
//button undo donelist
const btndone = async (doneid) => {
    const respons = await fetch(url + `/donelist/${doneid}`)
    const data = await respons.json();
    await posttodo(data);
    deletedone(doneid);
}
//submit input
formtodo.addEventListener("submit", (e) => {
    e.preventDefault();
    checkinput();
});
//click button Add
btnAdd.addEventListener("click",(e)=>{
    e.preventDefault();
    checkinput();
})
//click icons delete and edit and button Done in todolist
todolist.addEventListener("click", function (e) {
    const id = e.target.parentElement.dataset.id;
    if (e.target.classList.contains("deleat")) {
        deletetodo(id);
    }
    if (e.target.classList.contains("edit")) {
        edittodo(id);
    }
    if (e.target.classList.contains("btn")) {
        btntodo(id);
    }
})
//click icon delete and button Undo in donelist
donelist.addEventListener("click", function (e) {
    const doneid = e.target.parentElement.dataset.id;
    if (e.target.classList.contains("deleat")) {
        deletedone(doneid);
    }
    if (e.target.classList.contains("btn")) {
        btndone(doneid);
    }
})
gettodo();
getdone();
