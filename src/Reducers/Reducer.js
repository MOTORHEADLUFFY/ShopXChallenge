/* eslint-disable import/no-anonymous-default-export */
import * as  Actions from '../Actions/Actions';

const initialState = {
  tasks: [],
  id: 0,
  display: "ALL"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case Actions.ADD_TASK: {
      return {
        ...state,
        tasks: [...state.tasks, { ...action.value, id:(state.id + 1)}],
        id: state.id + 1
      };
    }

    case Actions.COMPLETE:{
      return {
        ...state,
        tasks: [...state.tasks.slice(0,action.index),
                action.value,
                ...state.tasks.slice(action.index + 1)]
      };
    }

    case Actions.DELETE_ACTIVITY:{
      return {
        ...state,
        tasks: [...state.tasks.slice(0,action.index),
                ...state.tasks.slice(action.index + 1)]
      };
    }

    case Actions.CHANGE_DISPLAY:
      return {
        ...state,
        display: action.value
      };

    case Actions.CLEAR_COMPLETED:
      return {
        ...state,
        tasks: action.value
      }
    default:
      return state;
  }
}