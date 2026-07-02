import { Routes, Route, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from './../../../components/molecules/header';
import Sidebar from './../../../components/molecules/Sidebar';
import Textus from './../../../components/pages/Textus';
import Lessons from '../../pages/Lessons';
import Footer from './../../../components/molecules/footer';
import Quiz from './../../../components/pages/Quiz';
import TextSection from '../../pages/TextSection';
import Grammatica from './../../../components/pages/Grammatica';
import Vocabula from './../../../components/pages/Vocabula';
import Examinatio from './../../../components/pages/Examinatio';
import StartPage from './../../../components/pages/StartPage';
import TrainerPage from "../../pages/TrainerPage";
import AdminLemmaEditor from "../../pages/AdminLemmaEditor";
import AdminPage from "../../pages/AdminPage";
import RegisterPage from "../../pages/RegisterPage";
import LoginPage from "../../pages/LoginPage";
import WordList from "../../pages/WordList";
import ListTrainer from "../../pages/ListTrainer";
import UserPage from "../../pages/UserPage";
import UserSettings from "../../pages/UserSettings";
import Vocabulary from "../../pages/Vocabulary";
import Text from "../../pages/Text";
import AdminRoute from "../../../routes/AdminRoutes";
import Impressum from "../../pages/Impressum";
import PrivacyPolicy from "../../pages/PrivacyPolicy";
import BulkImportPage from "../../pages/BulkImportPage";
import ReadPage from "../../pages/ReadPage";
import DictionaryPage from "../../pages/DictionaryPage";
import VerifyEmail from "../../pages/VerifyEmail";

const Body = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const Content = styled.div`
    display: flex;
    width: 90%;
    height: 100%;

    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.xl};

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

            <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
            <Route path="/admin/editor" element={<AdminRoute><AdminLemmaEditor /></AdminRoute>} />
            <Route path="/admin/editor/:id" element={<AdminRoute><AdminLemmaEditor /></AdminRoute>} />
            <Route path="/admin/bulk" element={<AdminRoute><BulkImportPage /></AdminRoute>} />

            <Route path="/trainer" element={<TrainerPage />} />
            <Route path="/dictionary/:word" element={<DictionaryPage />} />
            <Route path="/lesson" element={<Lessons />} />
            <Route path="/lesson/1/textus" element={<Textus />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/read" element={<ReadPage />} />
            <Route path="/read/:author/:title" element={<Text />}/>
            <Route path="/read/:author/:title/:position" element={<TextSection />}/>
            <Route path="/lesson/1/grammatica" element={<Grammatica />} />
            <Route path="/lesson/1/vocabula" element={<Vocabula />} />
            <Route path="/lesson/1/examinatio" element={<Examinatio />} />

            <Route path="/vocabulary" element={<Vocabulary />} />
            <Route path="/user/list" element={<WordList />} />
            <Route path="/listtrainer" element={<ListTrainer />} />

            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/user/settings" element={<UserSettings />} />

            <Route path="/impressum" element={<Impressum />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />

            <Route path="/verify-email" element={<VerifyEmail />} />
          </Routes>
        </Content>
      {!isStartPage && <Footer />}
      </Body>

    </>
  );
}

export default AppContent;