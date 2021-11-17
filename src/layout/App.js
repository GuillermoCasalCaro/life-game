import React from 'react';
import Header from './Header';
import { Container } from "semantic-ui-react";
import Footer from './Footer';
import Content from './Content';
import './layout.css'

if (module.hot) {
    module.hot.accept();
}

const App = () => {
    return (
        <div className="global-container">
            <Header />
            <Content />
            <Footer />
        </div>
    );
}

export default App;
