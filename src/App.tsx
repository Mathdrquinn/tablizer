import React from 'react';
import './App.scss';
import Tablizer from './components/tablizer';

const App: React.FC = () => {
  return (
    <main style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <Tablizer />
    </main>
  );
}

export default App;
