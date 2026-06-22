import { Routes, Route, useLocation } from "react-router-dom";
import styled from "styled-components";
import Verbum from '../../../components/pages/Verbum';
import Header from './../../../components/molecules/header';
import Sidebar from './../../../components/molecules/Sidebar';
import Textus from './../../../components/pages/Textus';
import Lectiones from './../../../components/pages/Lectiones';
import Footer from './../../../components/molecules/footer';
import Quiz from './../../../components/pages/Quiz';
import Litterae from './../../../components/pages/Litterae';
import TextSection from '../../pages/TextSection';
import Grammatica from './../../../components/pages/Grammatica';
import Vocabula from './../../../components/pages/Vocabula';
import Examinatio from './../../../components/pages/Examinatio';
import StartPage from './../../../components/pages/StartPage';
import Trainer from "../../pages/Trainer";
import AdminLemmaEditor from "../../pages/AdminLemmaEditor";
import RegisterPage from "../../pages/RegisterPage";
import LoginPage from "../../pages/LoginPage";
import WordList from "../../pages/WordList";
import ListTrainer from "../../pages/ListTrainer";
import UserPage from "../../pages/UserPage";
import UserSettings from "../../pages/UserSettings";
import Vocabulary from "../../pages/Vocabulary";
import Text from "../../pages/Text";

const Body = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  width:90%;
  height: 100%;
  font-family: "Cormorant Garamond", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-size: 25px;
  margin-left: 0%;
  justify-content: center;
  
  padding-top: ${({ isStartPage }) => isStartPage ? "0" : "70px"};
`;

function AppContent() {
  const location = useLocation();

  const isStartPage = location.pathname === "/";

  return (
    <>
      {!isStartPage && <Header />}

      <Body>
        {!isStartPage && <Sidebar />}

        <Content isStartPage={isStartPage}>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/admin" element={<AdminLemmaEditor />} />
            <Route path="/trainer" element={<Trainer />} />
            <Route path="/dictionary/:word" element={<Verbum />} />
            {/* <Route path="/search" element={<SearchPage />} /> */}
            <Route path="/lectiones" element={<Lectiones />} />
            <Route path="/lectiones/1/textus" element={<Textus />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/read" element={<Litterae />} />
            <Route path="/read/:author/:title" element={<Text />}/>
            <Route path="/read/:author/:title/:position" element={<TextSection />}/>
            <Route path="/lectiones/1/grammatica" element={<Grammatica />} />
            <Route path="/lectiones/1/vocabula" element={<Vocabula />} />
            <Route path="/lectiones/1/examinatio" element={<Examinatio />} />

            <Route path="/vocabulary" element={<Vocabulary />} />
            <Route path="/user/list" element={<WordList />} />
            <Route path="/listtrainer" element={<ListTrainer />} />

            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/user/settings" element={<UserSettings />} />
          </Routes>
        </Content>
      </Body>

      {!isStartPage && <Footer />}
    </>
  );
}

export default AppContent;