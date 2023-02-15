let priorityIndex = 0
const priorityColors = [
    {priorityLevel: "low", color: "#A6BB8D"},
    {priorityLevel: "mid", color: "#FFDB89"},
    {priorityLevel: "high", color: "#FF8E9E"}
]

const render = function (todos) {

    $("#todos").empty()

    todos.forEach(todo => {
        $("#todos").append(`
        <div data-id=${todo.id} class="todo ${todo.complete ? 'complete' : ''}">
            <i class="fas fa-check-circle"></i>
            <span class=text>${todo.text}</span>
            <span class="delete"><i class="fas fa-trash"></i></span>
            <div class=priority>
                <i class="high fas fa-solid fa-circle"></i>
                <i class="mid fas fa-solid fa-circle"></i>
                <i class="low fas fa-solid fa-circle"></i>
            </div>
            
        </div>
        `)
    })
}

const add = function () {
    $.post('/todo', { text: $("#todo-input").val() }, function (todos) {
        render(todos)
        $("#todo-input").val("")
    })
}

$("#todos").on("click", ".fa-check-circle", function () {
    const id = $(this).closest(".todo").data().id
    $.ajax({
        method: "PUT",
        url: "/todo/" + id,
        success: todos => render(todos)
    })
})

$("#todos").on("click", ".fa-trash", function () {
    const id = $(this).closest(".todo").data().id
    $.ajax({
        method: "DELETE",
        url: "/todo/" + id,
        success: todos => render(todos)
    })
})

$.get('/todos', todos => render(todos))

const changeTodoPriority = function (todoID, priorityLevel) {
    priorityIndex = priorityColors.findIndex(pc => pc.priorityLevel === priorityLevel)
    $(`[data-id=${todoID}]`).css("background-color", priorityColors[priorityIndex].color)
}

$("#todos").on("click", ".todo .low", function() {
    const todoID = $(this).closest(".todo").data().id
    changeTodoPriority(todoID, "low")
})

$("#todos").on("click", ".todo .mid", function() {
    const todoID = $(this).closest(".todo").data().id
    changeTodoPriority(todoID, "mid")
})

$("#todos").on("click", ".todo .high", function() {
    const todoID = $(this).closest(".todo").data().id
    changeTodoPriority(todoID, "high")
})

$("#todos").on("click", ".todo .text", function() {
    priorityIndex ++
    if (priorityIndex == priorityColors.length) {
        priorityIndex = 0
    }
    $(this).closest(".todo").css("background-color", priorityColors[priorityIndex].color)
})
