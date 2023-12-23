import React, { useReducer, useState } from "react";
import { genrateId } from "../../utiles/genrateId";

const test = { 
    title : "test " , 
    todo : "test",
    id:genrateId()

}
const Data = window.localStorage.getItem("DataTodo") ? window.localStorage.getItem("DataTodo") : 
window.localStorage.setItem("DataTodo" , JSON.stringify(test))
console.log(Data)
const initialState = [
 Data
];

const ACTIONS = {
  ADD_TO_DO: "addToDo",
  DELETE_TO_DO: "deleteToDo",
  EDIT_TO_DO: "editToDo",
};

const reduce = (state, action) => {
  switch (action.type) {
 

    case ACTIONS.DELETE_TO_DO:
      const state2 = [...state];
      const upatedState = state2.filter((e) => e.id !== action.payload);
      window.localStorage.setItem("DataTodo", JSON.stringify(upatedState));

      return upatedState;

    case ACTIONS.EDIT_TO_DO:

    const takenState = [...state]
    const removeEdit = takenState.filter((e)=>e.id !== action.payload.id)
    const edit = takenState.filter((e)=>e.id === action.payload.id)
    edit[0].title = action.payload.title
    edit[0].todo = action.payload.todo

    const updatedStateEdit = [...removeEdit , ...edit]

    window.localStorage.removeItem("DataTodo")
    window.localStorage.setItem("DataTodo" , JSON.stringify(updatedStateEdit))

      return updatedStateEdit;

    case ACTIONS.ADD_TO_DO:

      let inputsData = { ...action.payload };
    
      const values = Object.values(inputsData);
      const isEmptyVals = values.every((e) => e.length !== 0);
      const updatedData = [...state, inputsData];
      if (isEmptyVals) {
        window.localStorage.setItem("DataTodo", JSON.stringify(updatedData));
        return updatedData;
      } else {
        return state;
      }


    default:
      return state;
  }
};

const Cred = () => {
    const [isEdit, setisEdit] = useState({ id: null, isEdiiting: false });
    const [inputs, setInputs] = useState({
        title: "",
        todo: "",
    });
    const [editInp , setEditInp] =useState({...inputs})
  const [state, dispatch] = useReducer(reduce, initialState);
  const handleSubmit = (e) => {
    dispatch({ type: ACTIONS.ADD_TO_DO, payload: inputs });

    e.preventDefault();
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      return {
        id: genrateId(),
        ...prev,
        [name]: value,
      };
    });
 





  };
  const editTodo = (id, newTitle, newpara) => {
    setisEdit({
      id: id,
      isEdiiting: true,
    });

};

const handleInpEdit  = (e , id)=>{

    const { name, value } = e.target;
    
    setEditInp((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });


}

  return (
    <div
      style={{
        margin: "3rem 0 0 0 ",
        backgroundColor: "#4433",
        borderRadius: "8px",
        width: "fit-content",
        padding: "1rem",
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        className="Holder"
      >
        {state?.map((item, i) => {
          return (
            <div key={i} className="info-holder">
              {isEdit.id === item.id ? (
                <>
                  <input
                    className="Edit-inp"
                    type="text"
                    name="title"

                    onChange={handleInpEdit}
                  />

                  <input
                    name="todo"
                    className="Edit-inp"
                    type="text"
                    onChange={handleInpEdit}
                  />
                </>
              ) : (
                <>
                  <h5>{item?.title}</h5>
                
                  <p>{item?.todo}</p>
                </>
              )}
              <div
                className="btns"
                style={{
                  display: "flex",
                  gap: ".7rem",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {isEdit.isEdiiting && isEdit.id === item.id ? (
                  <>
                    <button
                      style={{
                        margin: "1rem 0  0 0",
                        fontSize: "1rem",
                        padding: "2px 4px",
                        backgroundColor: "lightgreen",
                        color: "#334f",
                        border: "1px solid #3344",
                        borderRadius: "5px",
                        boxShadow: "none",
                        outline: "none !important",
                      }}
                      onClick={()=>{
                        setisEdit((prev)=>{
                            return {
                                id: null,
                             isEdiiting: false,
                            }
                        })

                        dispatch({ type: ACTIONS.EDIT_TO_DO, payload: { id:item.id, title:editInp.title ,  todo:editInp.todo } })}}
                    >
                      done
                    </button>
                    <button
                      style={{
                        margin: "1rem 0  0 0",
                        fontSize: "1rem",
                        padding: "2px 4px",
                        backgroundColor: "lightgreen",
                        color: "#334f",
                        border: "1px solid #3344",
                        borderRadius: "5px",
                        boxShadow: "none",
                        outline: "none !important",
                      }}
                      onClick={() =>
                        setisEdit({
                          id: null,
                          isEdioting: false,
                        })
                      }
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  ""
                )}
                {isEdit.id !== item.id ? (
                  <button
                    style={{
                      margin: "1rem 0  0 0",
                      fontSize: "1rem",
                      padding: "2px 4px",
                      backgroundColor: "lightgreen",
                      color: "#334f",
                      border: "1px solid #3344",
                      borderRadius: "5px",
                      boxShadow: "none",
                      outline: "none !important",
                    }}
                    onClick={(e) => editTodo(item.id)}
                  >
                    Edit
                  </button>
                ) : (
                  ""
                )}

                <button
                  style={{
                    margin: "1rem 0  0 0",
                    fontSize: "1rem",
                    padding: "2px 4px",
                    backgroundColor: "red",
                    color: "#fff",
                    border: "1px solid #3344",
                    borderRadius: "5px",
                    boxShadow: "none",
                    outline: "none !important",
                  }}
                  onClick={(e) =>
                    dispatch({ type: ACTIONS.DELETE_TO_DO, payload: item.id })
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}

        <form action="#">
          <input
            name="title"
            value={inputs.title}
            onChange={(e) => handleInputs(e)}
            className="add_input"
            type="text"
            placeholder="Enter title...."
          />
          <input
            name="todo"
            value={inputs.todo}
            onChange={(e) => handleInputs(e)}
            className="add_input"
            type="text"
            placeholder="Enter todo...."
          />

          <button onClick={(e) => handleSubmit(e)} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cred;
