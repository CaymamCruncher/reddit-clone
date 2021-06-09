import { Fragment, React } from 'react';
import PostDashboard from './components/PostDashboard';
import './styles/css/App.css';
import {UserContext} from './context/UserContext';

function App() {
  return (
    <Fragment>
      <header>
        {/* turn into own component in the future? */}
        <div className='container'>
          <h1>Breaddit</h1>
          <nav>
            <div>
              <input></input>
              <button>Submit</button>
            </div>
            <a href='/'>Home</a>
            <a href='/'>Popular</a>
            <a href='/'>New</a>
          </nav>
        </div>
      </header>
      <main>
        <UserContext.Provider value='guest'>
          <PostDashboard />
        </UserContext.Provider>
      </main>
      <footer>
        {/* turn into own component in the future? */}
        <div className='container'>
          <small>&copy;2021 Breaddit Incorporated</small>
        </div>
      </footer>
    </Fragment>
  );
}

export default App;
