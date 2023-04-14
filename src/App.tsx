import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import './styles/Global.css';
import {TodoListContextProvider} from './store/TodoListContext';
import {Wrapper} from './components/Wrapper/Wrapper';
import {Header} from './components/Header/Header';

function App() {
  const {i18n, t} = useTranslation();

  return (
    <>
      <Helmet
        titleTemplate={`%s - ${t('app.title')}`}
        defaultTitle={t('app.title')}
        htmlAttributes={{lang: i18n.language}}
      >
        <meta name="description" content={t('app.description')} />
      </Helmet>

      {/**
       * start from here
       */}
      <TodoListContextProvider>
        <Header />
        <Wrapper />
      </TodoListContextProvider>
    </>
  );
}

export default App;
