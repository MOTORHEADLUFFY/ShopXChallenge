
import React, { useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as Actions from '../Actions/Actions';

function TopBar() {
  const store = useSelector(state => state);
  const dispatch = useDispatch();
  let input = {};
  input['ALL'] = useRef();
  input['COMPLETED'] = useRef();
  input['ACTIVE'] = useRef();

  function changeDisplay(display){
    input['ALL'].current.classList.remove('selected');
    input['COMPLETED'].current.classList.remove('selected');
    input['ACTIVE'].current.classList.remove('selected');
    input[display].current.classList.add('selected');

    dispatch({
      type: Actions.CHANGE_DISPLAY,
      value: display
    });
  }

  function calculateRemaining(){
    let count = 0;
    for( let item of store.reducer.tasks){
      if(!item.completed)
        count++;
    }
    return count;
  }

  function clearCompleted(){
    let newTasks = [];
    for( let item of store.reducer.tasks){
      if(!item.completed)
        newTasks.push(item);
    }
    dispatch({
      type: Actions.CLEAR_COMPLETED,
      value: newTasks
    })
  }

  return (
    <div>
      <ul>
          <div style={{float: 'left', width: '40%', display: 'inline-block'}}>
            <li>{calculateRemaining()} items Remaining</li>
          </div>
          <div style={{width: '30%', display: 'inline-block'}}>
            <li ref={input["ALL"]} onClick={() => changeDisplay("ALL")}> All </li>
            <li ref={input["ACTIVE"]} onClick={() => changeDisplay("ACTIVE")}> Active </li>
            <li ref={input["COMPLETED"]} onClick={() => changeDisplay("COMPLETED")}> Completed </li>
          </div>
          <div style={{float: 'right', display: 'inline-block'}}>
            <li onClick={() => clearCompleted()}> Clear Completed </li>
          </div>
      </ul>
    </div>
  );
}

export default TopBar;
