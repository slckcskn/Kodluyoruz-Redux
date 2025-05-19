import './App.css';
import Header from './components/Header';
import Form from './components/Form';
import Notes from './components/Notes';
import Search from './components/Search';

function App() {

  return (
    <div className="container mt-4">
      <div className='row justify-content-center'>
        <div className='col-md-6 text-center'>
          <Header />
          <Search />
          <Form />
          <Notes />
        </div>
      </div>
    </div>
  );
}

export default App;
