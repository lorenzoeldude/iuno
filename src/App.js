import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import AppContent from './components/layout/AppContent';
import { AppThemeProvider } from './context/AppThemeProvider';

function App() {
  return (
    <AppThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </AppThemeProvider>
  );
}

export default App;
