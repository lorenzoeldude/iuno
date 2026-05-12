import './App.css';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import Verbum from './components/pages/Verbum';
import Header from './components/molecules/header';
import Sidebar from './components/molecules/Sidebar';
import Textus from './components/pages/Textus';
import Lectiones from './components/pages/Lectiones';
import Footer from './components/molecules/footer';
import Quiz from './components/pages/Quiz';
import Litterae from './components/pages/Litterae';
import Aeneis from './components/pages/Aeneis';
import Grammatica from './components/pages/Grammatica';
import Vocabula from './components/pages/Vocabula';
import Examinatio from './components/pages/Examinatio';

const Body = styled.div`
  display: flex;
`;

const Content = styled.div`
  display: flex;
  width:100%;
  font-family: "Cormorant Garamond", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-size: 25px;
  margin-left: 0%;
  justify-content: center;
`;


function App() {
  return (
    <>
      <Router>
        <Header />
        <Body>
          <Sidebar />
          <Content>
            <Routes>
              <Route path="/dictionary/:word" element={<Verbum />} />
              <Route path="/lectiones" element={<Lectiones />} />
              <Route path="/lectiones/1/textus" element={<Textus />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/litterae" element={<Litterae />} />
              <Route path="/litterae/aeneis" element={<Aeneis />} />
              <Route path="/lectiones/1/grammatica" element={<Grammatica />} />
              <Route path="/lectiones/1/vocabula" element={<Vocabula />} />
              <Route path="/lectiones/1/examinatio" element={<Examinatio />} />
            </Routes>
          </Content>
        </Body>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
