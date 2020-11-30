
import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as Actions from '../Actions/Actions';

function ListElement(props) {
  const [cross, setCrossShown] = useState(false);
  const store = useSelector(state => state);
  const dispatch = useDispatch();

  function onChangeStatus(id) {
    let index = 0;
    for (let element of store.reducer.tasks) {
      if (element.id === id)
        break;
      index++;
    }
    dispatch({
      type: Actions.COMPLETE,
      index: index,
      value: Object.assign({}, store.reducer.tasks[index], { completed: true })
    });
  }

  function deleteActivity(id) {
    let index = 0;
    for (let element of store.reducer.tasks) {
      if (element.id === id)
        break;
      index++;
    }
    dispatch({
      type: Actions.DELETE_ACTIVITY,
      index: index
    });
  }

  return (
      <div className="list" onMouseEnter={() => setCrossShown(true)} onMouseLeave={() => setCrossShown(false)}>
        <div style={{ width:'5%'}}>
          {!props.completed &&
            <input type="radio" id={props.id} value="completed" onChange={() => { onChangeStatus(props.id) }} />}
        </div>
        <div className="content" style={{ width:'85%'}}>
          {(props.completed && store.reducer.display !== "COMPLETED") && <s>{props.value}</s>}
          {(!props.completed || store.reducer.display === "COMPLETED") && props.value}
        </div>
        <div style={{ width:'10%'}}>
          {cross &&
            <span className="cross" onClick={() => deleteActivity(props.id)}>X</span>}
        </div>
      </div>
  );
}

export default ListElement;