import zeniarkLogo from '../images/zeniark-logo.png';

const Home = () => {
  return (
    <div className='hero-wrapper'>
      <div className='logo-container'>
        <img src={zeniarkLogo} alt='logo' width={270} />
      </div>
      <div className='welcome-message__container'>
        <h4>Welcome to the Trivia Challenge!</h4>
        <p>You will be presented 10 True or False questions.</p>
      </div>
      <div className='challenge-container'>
        <h5>Can you score 10/10?</h5>
      </div>
      <a href='/quiz' className='start-link'>{`LET'S START!`}</a>
    </div>
  );
};

export default Home;
