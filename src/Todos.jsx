import { useState } from "react";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    id: "",
    todoName: "",
    todoDescription: "",
    todoStatus: "Not Completed",
  });
  // Define a state variable for the filter status
  const [filterStatus, setFilterStatus] = useState("All");

  const handleAddTodo = () => {
    event.preventDefault();
    const existingId = todos.findIndex((todo) => todo.id === newTodo.id);

    if (existingId === -1 && newTodo.todoName !== "") {
      newTodo.id = new Date();
      setTodos([...todos, newTodo]);
      setNewTodo({
        ...newTodo,
        id: "",
        todoName: "",
        todoDescription: "",
        todoStatus: "Not Completed",
      });
    } else {
      const updatedArray = [...todos];
      updatedArray[existingId] = newTodo;
      setTodos(updatedArray);
      setNewTodo({
        ...newTodo,
        id: "",
        todoName: "",
        todoDescription: "",
        todoStatus: "Not Completed",
      });
    }
  };
// Function to handle changes in the name input field
  const handleNameChange = (event) => {
    setNewTodo({ ...newTodo, todoName: event.target.value }); // Update the state with the new name
  };

  // Function to handle changes in the description input field
  const handleDescriptionChange = (event) => {
    setNewTodo({ ...newTodo, todoDescription: event.target.value }); // Update the state with the new description
  };
  // Function to handle changes in the status select dropdown for a specific item
  const handleStatusChange = (id, event) => {
    const { value } = event.target;
    const updatedArray = todos.map((item) => {
      if (item.id === id) {
        return { ...item, todoStatus: value };
      }
      return item;
    });
    setTodos(updatedArray);
  };


  // Function to handle editing an input object
  const handleEditTodo = (id) => {
    const selectedItem = todos.find((todo) => todo.id === id);
    if (selectedItem) {
      setNewTodo(selectedItem);
    }
  };
   // Function to handle deleting an input object
  const handleDeleteTodo = (id) => {
    const updateTasks = todos.filter((todo) => todo.id !== id);
    setTodos(updateTasks);
  };

  // Function to handle changes in the filter select dropdown
  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value); // Update the state with the new filter status
  };

  // Filter the input array based on the selected filter status
  const filteredArray =
    filterStatus === "All"
      ? todos
      : todos.filter((item) => item.todoStatus === filterStatus);
  return (
    <div className="container">
      <div className=" m-5 container">
        <h1 className="text-center text-success text-opacity-75">My todo</h1>
        <div className="row g-3 m-3 justify-content-evenly">
          <div className="col-md-4 col-lg-4">
            <input
              type="text"
              value={newTodo.todoName}
              onChange={handleNameChange}
              placeholder="Todo Name"
              className="form-control border border-success rounded"
            />
          </div>
          <div className="col-md-4 col-lg-4">
            <input
              type="text"
              value={newTodo.todoDescription}
              onChange={handleDescriptionChange}
              placeholder="Todo Description"
              className=" form-control border border-success rounded"
            />
          </div>
          <div className="col-md-4 col-lg-4">
            <button
              onClick={() => handleAddTodo()}
              className="form-control  btn btn-success btn-sm"
            >
              {newTodo.id ? "Update Todo" : "Add Todo"}
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col d-flex justify-content-end">
            <h5 className="">Status Filter:</h5>
            <select
              className="m-1 bg-danger text-light opacity-75 border rounded"
              value={filterStatus}
              onChange={handleFilterChange}
            >
              <option value="All">All</option>
              <option value="Not Completed">Not Completed</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <h1>My Todos</h1>
            <div className="row">
              {filteredArray.map((todo, index) => (
                <div className="col-sm-6 col-md-4 col-lg-3 g-3" key={index}>
                  <div className="card bg-success p-2 text-dark bg-opacity-50">
                    <div className="card-body">
                      <p className="card-text">Name:{todo.todoName}</p>
                      <p>Description:{todo.todoDescription}</p>
                      Status:
                      <select
                        value={todo.todoStatus}
                        onChange={(event) => handleStatusChange(todo.id, event)}
                        className="m-1 border rounded"
                        style={{backgroundColor: todo.todoStatus=='Completed' ? 'green' : 'red', opacity:"0.5", color:"white" }}
                      >
                        <option
                          className="text-light opacity-75"
                          value="Not Completed"
                        >
                          Not Completed
                        </option>
                        <option
                          className="text-light opacity-75"
                          value="Completed"
                        >
                          Completed
                        </option>
                      </select>
                      <div className=" d-flex flex-row justify-content-end ">
                        <button
                          className="btn btn-success btn-sm rounded m-2"
                          onClick={() => handleEditTodo(todo.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn text-light btn-warning opacity-100 btn-sm rounded m-2"
                          onClick={() => handleDeleteTodo(todo.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todos;
