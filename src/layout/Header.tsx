import './layout.css'

const Header = () => {
    return (
        <div className="header-container ui inverted segment">
            <div>
                <a href='https://gcc-portfolio-astro.netlify.app' target='_blank'>Guillermo Casal Caro</a>
            </div>
            <div>
                <a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life' target='_blank'>Life Game</a>
            </div>
            <div>
                <a href='https://es.react.dev/' target='_blank'>React</a>
            </div>
        </div >
    );
}

export default Header;
