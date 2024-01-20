import { useCallback } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { decrement, increment } from './store/counter';
import { selectCounterState } from './store/counter/selectors';

function App() {
  const { value } = useAppSelector(selectCounterState);
  const dispatch = useAppDispatch();

  const handleCounterIncrement = useCallback(
    () => dispatch(increment()),
    [dispatch]
  );

  const handleCounterDecrement = useCallback(
    () => dispatch(decrement()),
    [dispatch]
  );
  // const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div style={{ textAlign: 'center' }} className="card">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <button onClick={handleCounterIncrement}> + </button>
          <div>count is {value}</div>
          <button onClick={handleCounterDecrement}> - </button>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
