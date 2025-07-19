import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';

import { useState, useEffect } from 'react';

import myApi from '../utils/api.js';

import CurrentUserContext from '../contexts/CurrentUserContext.js';

function App() {
  // Estado para armazenar as informações do usuário atual
  const [currentUser, setCurrentUser] = useState({});

  // Estado para armazenar o popup atual, (não utilizado neste arquivo, mas necessário para manter a estrutura do código)
  const [popup, setPopup] = useState(null);

  // Obtém as informações do usuário atual do servidor quando o componente é montado
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

  // Função para atualizar as informações do usuário, retorna uma Promise para que o tratamento de erro seja feito por quem chamou
  const handleUpdateUser = async (userData) => {
    const updatedUserData = await myApi.updateProfileInfo(userData);
    setCurrentUser(updatedUserData); // atualiza o estado do usuário atual com os dados retornados pela API
    return updatedUserData; // devolve os dados para quem chamou a função (handleSubmit no componente EditProfile)
  };

  // Função para atualizar a foto do perfil, retorna uma Promise para que o tratamento de erro seja feito por quem chamou
  const handleUpdateAvatar = async (avatarData) => {
    const updatedAvatarData = await myApi.updateProfileAvatar(avatarData);
    setCurrentUser((prevUser) => ({
      ...prevUser, // mantém os dados anteriores do usuário
      avatar: updatedAvatarData.avatar, // atualiza apenas a foto do perfil
    }));
    return updatedAvatarData; // devolve os dados para quem chamou a função (handleSubmit no componente EditAvatar)
  };

  // Função para abrir o popup atual
  const handleOpenPopup = (popup) => {
    setPopup(popup);
  };

  // Função para fechar o popup atual
  const handleClosePopup = () => {
    setPopup(null);
  };

  return (
    // Provedor do contexto para compartilhar o usuário atual com os componentes filhos
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page">
        <Header />
        <Main
          popup={popup}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
