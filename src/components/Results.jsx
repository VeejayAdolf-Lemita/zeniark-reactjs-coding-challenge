import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../images/logo.png';

// eslint-disable-next-line no-unused-vars
const Results = ({ onPlayAgain }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { answeredQuestions, totalQuestions } = location.state;

  console.log(answeredQuestions);

  Results.propTypes = {
    onPlayAgain: PropTypes.func.isRequired,
  };

  const correctAnswers = answeredQuestions.filter(
    (answeredQuestion) => answeredQuestion.answer === answeredQuestion.question.correct_answer,
  );

  const handlePlayAgain = () => {
    navigate('/');
  };

  return (
    <div className='result-wrapper' style={{ color: '#000' }}>
      <div className='result-header__container'>
        <img src={logo} alt='logo' width={50} />
        <h2>Final Results</h2>
        <div style={{ width: '60px' }}></div>
      </div>
      <h1>
        {correctAnswers.length} / {totalQuestions}
      </h1>
      <h2>Your Score</h2>
      {answeredQuestions.length > 0 && (
        <ol>
          {answeredQuestions.map((answeredQuestion, index) => (
            <li key={index} className='list-container'>
              <div className='question-result__container'>
                <p>{answeredQuestion.question.question}</p>
                {answeredQuestion.answer === answeredQuestion.question.correct_answer ? (
                  <div style={{ maxWidth: '70px' }}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='34'
                      height='34'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='green'
                    >
                      <polyline points='20 6 9 17 4 12'></polyline>
                    </svg>
                  </div>
                ) : (
                  <div style={{ maxWidth: '70px' }}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='34'
                      height='34'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='red'
                    >
                      <line x1='18' y1='6' x2='6' y2='18'></line>
                      <line x1='6' y1='6' x2='18' y2='18'></line>
                    </svg>
                  </div>
                )}
              </div>
              <div className='answer-result__container'>
                <p>
                  The correct answer is{' '}
                  <span
                    style={{
                      color: answeredQuestion.question.correct_answer === 'True' ? 'green' : 'red',
                      fontStyle: 'italic',
                      fontWeight: 'bold',
                    }}
                  >
                    {answeredQuestion.question.correct_answer}
                  </span>
                </p>
                <p>
                  You answered{' '}
                  <span
                    style={{
                      color: answeredQuestion.answer === 'True' ? 'green' : 'red',
                      fontStyle: 'italic',
                      fontWeight: 'bold',
                    }}
                  >
                    {answeredQuestion.answer}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
      <button className='play-btn pulsate' onClick={handlePlayAgain}>
        PLAY AGAIN
      </button>
    </div>
  );
};

export default Results;
