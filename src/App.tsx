import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Content from './layout/Content';
import './layout/layout.css'

function App() {
  return (
    <div className="global-container">
      <div>
        <Header />
        <Content />
      </div>
      <Footer />
    </div>
  );
}

export default App;
