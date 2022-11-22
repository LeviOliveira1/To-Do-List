var selectedRow = null;

//Alerts
function showAlert(message, className){
    const div = document.createElement("div");
    div.className =  `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(()=> document.querySelector(".alert").remove(),3000);

}
//Clear All Fields
function clearFields(){
    document.querySelector("#taskName").value = "";
    document.querySelector("#startTask").value = "";
    document.querySelector("#endTask").value = "";


}

//Add Data
document.querySelector("#student-form").addEventListener("submit",(e)=>{
    e.preventDefault();

    //Get Form Values
    const taskName = document.querySelector("#taskName").value;
    const startTask = document.querySelector("#startTask").value;
    const endTask = document.querySelector("#endTask").value;

    //validate
    if(taskName == "" || startTask == "" || endTask ==""){
        showAlert("Por favor, Preencha os campos abaixo.", "danger")
    }
    else{
        if(selectedRow == null){
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${taskName}</td>
                <td>${startTask}</td>
                <td>${endTask}</td>
                <td>
                <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                <a href="#" class="btn btn-danger btn-sm delete">Delete</a>`;

                list.appendChild(row);
                selectedRow = null;
                showAlert("Tarefa Adicionada.","success")

        }
        else{
            selectedRow.children[0].textContent = taskName;
            selectedRow.children[1].textContent = startTask;
            selectedRow.children[2].textContent = endTask;
            selectedRow = null;
            showAlert("Tarefa Editada", "info")

        }
        clearFields();
    }


});

//Edit Data

document.querySelector("#student-list").addEventListener("click", (e)=>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("taskName").value =  selectedRow.children[0].textContent;
        document.querySelector("#startTask").value =  selectedRow.children[1].textContent;
        document.querySelector("#endTask").value =  selectedRow.children[2].textContent;

    }
})



//Delete Data

document.querySelector("#student-list").addEventListener("click",(e)=>{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Dados da tarefa deletado.", "danger");
    }
})
