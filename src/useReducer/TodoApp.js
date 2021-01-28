import React, { useEffect, useReducer } from 'react'
import { useForm } from '../customHooks/useForm';
import './style.css';
import { todoReducer } from './todoReducer';



const init =()=>{
    return JSON.parse(localStorage.getItem('todos')) || []

    /* return [{
        id: new Date().getTime(),
        desc: 'aprender react',
        done:false
    }]   */  
}
export const TodoApp = () => {

    const [todos, dispatch] = useReducer(todoReducer, [], init)

    const [{description}, handleInputChange, reset]=useForm({
        description:''
    });

     useEffect(()=>{
        localStorage.setItem('todos', JSON.stringify(todos))
     }, [todos]);

    const handleDelete=(todoId)=>{
        //crear la acction
        const action = {
            type:'delete',
            payload: todoId
        }
        
        //dispatch
        dispatch(action);
    }

    const handleToggle = (todoId)=>{
        dispatch ({
            type:'toggle',
            payload: todoId
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        
        if (description.trim().length<=1) {
            return;
        }

        const newTodo={
            id: new Date().getTime(),
            desc: description,
            done:false
        }

        const action = {
            type:'add',
            payload: newTodo
        }
        
        dispatch(action);
        reset();
    }

    return (
        <div>
            <h1>Todo App ({todos.length})</h1>
            <hr/>
            <div className="row">
                <div className="col-7">
                    <ul className="list-group list0group-flush">
                        {
                            todos.map((todo, i)=>(
                                <li
                                    key={todo.id}
                                    className="list-group-item"
                                >
                                    <p 
                                        className={`${todo.done && 'complete'}`}
                                        onClick={()=>handleToggle(todo.id)}
                                    >
                                        {i+1}.- {todo.desc}
                                    </p>
                                    <button 
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(todo.id)}
                                    > 
                                        Borrar
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-5">
                        <h4>Agregar ToDo</h4>
                        <hr/>
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text"
                                name="description"
                                className="form-control"
                                placeholder="Aprender..."
                                autoComplete="off"
                                value={description}
                                onChange={handleInputChange}
                            />
                            <button 
                                type="submit"
                                className="btn btn-outline-primary mt-1 btn-block"
                            >
                                Agregar
                            </button>
                        </form>
                </div>
            </div>
        </div>
    )
}
