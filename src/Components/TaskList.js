
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ListElement from './ListElement';
import * as Actions from '../Actions/Actions';

function TaskList() {
    const store = useSelector(state => state);
    const dispatch = useDispatch();
    const inputField = useRef(null);
    const [newTask, setTask] = useState(undefined);


    function onAddTask() {
        if(newTask){
            dispatch({
                type: Actions.ADD_TASK,
                value: { value: newTask, completed: false }
            });
            inputField.current.value = null;
            setTask(null);
        }
    }

    function displayList() {
        return store.reducer.tasks.map((item) => {
            if(store.reducer.display==="ALL")
                return <ListElement value={item.value} completed={item.completed} key={item.id} id={item.id}/>
            else if(store.reducer.display==="COMPLETED" && item.completed)
                return <ListElement value={item.value} completed={item.completed} key={item.id} id={item.id}/>
            else if(store.reducer.display==="ACTIVE" && !item.completed)
                return <ListElement value={item.value} completed={item.completed} key={item.id} id={item.id}/>
            else 
                return "";
            }
        )
    }

    return (
        <div className="tasklist" align="center" >
            <input ref={inputField} style={{margin: '5px'}} type="text" name="addTask" onChange={(event) => { setTask(event.target.value) }} />
            <button onClick={() => onAddTask()}>Add Task</button>
            <div style={{'overflowY': 'scroll', height:'50vh'}}>
            {displayList()}
            </div> 
        </div>
    );
}

export default TaskList;

 