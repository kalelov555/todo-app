var todoObjects = [];

class Todo_Class {
  constructor(item) {
    this.ulElement = item;
  }

  add() {
    var todoInput = document.querySelector("input").value;
      if(todoInput!="") {
        var todos = {
          id: todoObjects.length,
          todoText: todoInput,
          isDone: false,
        }

        todoObjects.unshift(todos);
        this.display();
        document.querySelector("input").value="";

        $(".bottom-content").text(todoObjects.length + " items left");

      }
    }

  done_undone(selectedId) {
    const selectedTodoIndex = todoObjects.findIndex((item)=> item.id == selectedId);
    if(todoObjects[selectedTodoIndex].isDone==false) {
      todoObjects[selectedTodoIndex].isDone = true;
    }
    else {
      todoObjects[selectedTodoIndex].isDone = false;
    }
    this.display();
  }

  deleteElement(deleteId) {
    const selectedTodoIndex = todoObjects.findIndex((item)=> item.id == deleteId);
    todoObjects.splice(selectedTodoIndex, 1);
    this.display();

    if(todoObjects.length===0) $(".bottom-todo").hide();
    $(".bottom-content").text(todoObjects.length + " items left");
  }

  display() {
    this.ulElement.innerHTML = "";

    for(var i=0; i<todoObjects.length; i++) {

      const liElement = document.createElement("li");   //creates new list
      const delBtn = document.createElement("i");       //creates new x icons

      liElement.innerText = todoObjects[i].todoText;
      liElement.setAttribute("data-id", todoObjects[i].id);

      delBtn.setAttribute("data-id", todoObjects[i].id);
      delBtn.classList.add("fas", "fa-times");


      liElement.appendChild(delBtn);

      delBtn.addEventListener("click", function(e) {
        const deleteId = e.target.getAttribute("data-id");
        myTodoList.deleteElement(deleteId);
      });

      liElement.addEventListener("click", function(e) {
        const selectedId = e.target.getAttribute("data-id");
        myTodoList.done_undone(selectedId);
      });

      if (todoObjects[i].isDone) {
        liElement.classList.add("checked");
      }

      this.ulElement.appendChild(liElement);

    }

    // $(".myTodo").prepend('<li><i class="fas fa-check-circle"></i>' + todos.todoText + '<i class="fas fa-times"></i>' + '</li>');

  }

}


function showAll() {
  myTodoList.display();
}

function showActive() {
  var x = document.querySelectorAll("li");

  for(var i=0; i<x.length; i++) {
    if(todoObjects[i].isDone === true) {
      x[i].style.display = "none";
    }
    else {
      x[i].style.display = "block";
      x[i].style.display = "flex";
      x[i].style.alignItems = "center";
    }
  }

}

function showComplited() {
  var x = document.querySelectorAll("li");

  for(var i=0; i<x.length; i++) {
    if(todoObjects[i].isDone === false) {
      x[i].style.display = "none";
    }
    else {
      x[i].style.display = "block";
      x[i].style.display = "flex";
      x[i].style.alignItems = "center";
    }
  }
}

function clearComplited() {

}


$(".bottom-todo").hide();

var listSection = document.querySelector(".myTodo");

myTodoList = new Todo_Class(listSection);
document.querySelector(".add-btn").addEventListener("click", function() {
    myTodoList.add();
    if(todoObjects.length>0) {
      $(".bottom-todo").show();
    }

});

$(".select-all").click(function() {
  showAll();
});

$(".select-active").click(function() {
  showActive();
});

$(".select-completed").click(function() {
  showComplited();
});

$(".clear-complited").click(function() {
  clearComplited();
});
