import './App.scss';
import TodoApp from './components/TodoApp';
import { Scrollbars } from 'react-custom-scrollbars';

function App() {
  return (
    <Scrollbars style={{ width: '100%', height: '100vh' }}>
    <div className="App">
      <TodoApp />
    </div>
    </Scrollbars>
  );
}

export default App;
