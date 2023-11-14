import { useState } from 'react';
import './App.css';
import { Notification } from './components';
import { Status } from './types';

function App() {
  const [status, setStatus] = useState<Status>('unactive')
  const [isModalShown, setIsModalShown] = useState<boolean>(false)
  const [isFetching, setIsFetching] = useState(false)

  // симулция запроса
  const simulateServer = () => {
    return new Promise<void>((resolve, reject) => {

      if (Math.random() > 0.5) { 
        return resolve();
      }
      const t: NodeJS.Timeout = setTimeout(() => {
        reject();
        return clearTimeout(t);
      }, 2000);
    });
  };
  // обработчик события click
  const handleClick:React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    setIsFetching(true)
    simulateServer()
      .then(() => {
        setIsModalShown(true)
        setStatus('success')
      })
      .catch(() => {
        setIsModalShown(true)
        setStatus('error')
      })
      .finally(() => setIsFetching(false))
  }
  
  return (
    <div className="App">
      <button className='test-notification__btn' disabled={isFetching} onClick={handleClick}>
        Test notification
      </button>

      {isModalShown && 
        <Notification 
          status={status} 
          label={status === 'success' ? 'Успешно' : 'Изменения не сохранены'} 
          text={status === 'success' ? 'Изменения успешно сохранены' : 'Потеря интернет соединения'}
          setIsShown={setIsModalShown}
        />}
    </div>
  );
}

export default App;