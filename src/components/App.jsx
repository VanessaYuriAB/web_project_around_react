import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';

import { useState, useEffect } from 'react';

import myApi from '../utils/api.js';

import CurrentUserContext from '../contexts/CurrentUserContext.js';

/*
Linha comentada para prevenir duplicação ao enviar cards iniciais. Executar apenas uma vez, quando necessário enviar os dados para a API.
// envia meus cards iniciais
// myApi.createInitialCards();
*/

function App() {
  // Estado para armazenar os cartões do usuário
  const [cards, setCards] = useState([]);

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

  // Obtém os cartões iniciais do servidor quando o componente é montado e atualiza o estado dos cartões com os dados retornados pela API
  useEffect(() => {
    myApi
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.error(`Erro ao obter os cartões iniciais: ${err}`);
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

  // Função para lidar com o evento de curtir/descurtir um cartão: ela recebe o cartão atual como argumento e verifica se ele já foi curtido ou não, se o cartão já foi curtido, a função envia uma solicitação para a API para remover o like, caso contrário, envia uma solicitação para adicionar o like - após a solicitação, atualiza o estado dos cartões com os dados retornados pela API
  async function handleCardLike(card) {
    // Verifica, mais um vez, se o cartão já foi curtido - é verificado no componente Card, mas é uma boa prática verificar novamente aqui
    const isLiked = card.isLiked;

    // Envia uma solicitação para a API e obtém os dados do cartão atualizados
    await myApi
      // !isLiked = ação inversa do estado atual de curtida - corresponde à shouldLike no método toggleLikeCard
      .toggleLikeCard(card._id, !isLiked)
      .then((updatedCard) => {
        setCards((stateCards) =>
          stateCards.map((currentCardInMap) =>
            currentCardInMap._id === card._id ? updatedCard : currentCardInMap
          )
        );
      })
      .catch((error) =>
        console.error(`Erro ao curtir/descurtir o cartão: ${error}`)
      );
  }

  // Função para lidar com a exclusão de um cartão: ela recebe o cartão atual como argumento e envia uma solicitação para a API para excluir o cartão, após a solicitação, atualiza o estado dos cartões removendo o cartão excluído
  async function handleCardDelete(card) {
    await myApi
      .deleteCard(card._id)
      .then(() => {
        setCards((stateCards) =>
          stateCards.filter(
            (currentCardInFilter) => currentCardInFilter._id !== card._id
          )
        );
      })
      .catch((error) => console.error(`Erro ao excluir o cartão: ${error}`));
  }

  // Função para lidar com o envio de um novo cartão: ela recebe os dados do cartão como argumento, envia uma solicitação para a API para criar o novo cartão e, após a solicitação, atualiza o estado dos cartões adicionando o novo cartão ao início da lista - a função é chamada no componente NewCard quando o formulário é enviado, deve ser assíncrona para lidar com a Promise retornada pela API - isso garante que o novo cartão apareça imediatamente na interface do usuário
  const handleAddPlaceSubmit = async (cardData) => {
    console.log('Adicionando novo cartão:', cardData);
    const newCardData = await myApi.createNewCard(cardData);
    setCards([newCardData, ...cards]); // adiciona o novo cartão ao início da lista de cartões
    return newCardData; // devolve os dados para quem chamou a função (handleSubmit no componente NewCard)
  };

  // Função para abrir o popup atual, ela recebe um objeto popup que contém os dados do popup a ser aberto
  const handleOpenPopup = (popup) => {
    setPopup(popup);
  };

  // Função para fechar o popup atual, limpando o estado do popup
  const handleClosePopup = () => {
    setPopup(null);
  };

  return (
    // Provedor do contexto para compartilhar o usuário atual com os componentes filhos
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
      }}
    >
      <div className="page">
        <Header />
        <Main
          popup={popup}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
