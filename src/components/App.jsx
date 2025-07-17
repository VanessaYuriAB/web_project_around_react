import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';

import { useState, useEffect } from 'react';

import myApi from '../utils/api.js';

import CurrentUserContext from '../contexts/CurrentUserContext.js';

function App() {
  // Estado para armazenar as informações do usuário atual
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    myApi
      .getServerUserInfos()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.error(`Erro ao obter informações do usuário: ${err}`);
      });
  }, []);

  return (
    // Provedor do contexto para compartilhar o usuário atual com os componentes filhos
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
