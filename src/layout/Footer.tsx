import './layout.css'

const Footer = () => {
  return (
    <div className="footer-container">
      <div>
        <p>{new Date().getFullYear()} Life Game by Guillermo Casal Caro</p>
      </div>
      <div>
        <p>All rigths reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
