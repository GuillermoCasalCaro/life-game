import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Content from './layout/Content';
import './layout/layout.css'

function App() {
  return (
    <div className="global-container">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
