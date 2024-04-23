import Main from './components/main';
import Sidebar from './components/sidebar';
import { Patient } from './lib/types';

function App() {

  function onSubmit(values: Patient) {
    console.log(values);
  }

  return (
    <div className="h-screen grid grid-cols-[auto,1fr]">
      <Sidebar onFormSubmit={onSubmit} />
      <Main />
    </div>
  );
}

export default App;
