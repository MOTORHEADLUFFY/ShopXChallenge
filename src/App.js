import './App.css';
import store from './Store';
import { Provider } from 'react-redux';
import TopBar from './Components/TopBar';
import TaskList from './Components/TaskList';

function App() {
  return (
    <Provider store={store}>
      <h1 align="center">MY LIST</h1>
      <div className="App">
        <TopBar>

        </TopBar>
        <TaskList>

        </TaskList>
      </div>
    </Provider>
  );
}

export default App;
