import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import questionsData from '../data/questions.json';
import logo from '../images/logo.png';

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const trueFalseQuestions = questionsData.results.filter(
      (question) =>
        question.type === 'boolean' &&
        (question.correct_answer === 'True' || question.correct_answer === 'False'),
    );

    if (trueFalseQuestions.length >= 10) {
      const shuffledQuestions = trueFalseQuestions.sort(() => Math.random() - 0.5);
      const selectedQuestions = shuffledQuestions.slice(0, 10);
      setQuestions(selectedQuestions);
    } else {
      console.error('Not enough true/false questions available.');
    }
  }, []);

  const handleAnswer = (answer) => {
    const answeredQuestion = {
      question: questions[currentQuestionIndex],
      answer,
    };
    setAnsweredQuestions((prevAnsweredQuestions) => [...prevAnsweredQuestions, answeredQuestion]);

    if (currentQuestionIndex === questions.length - 1) {
      navigate('/results', {
        state: {
          answeredQuestions: [...answeredQuestions, answeredQuestion],
          totalQuestions: questions.length,
        },
      });
    } else {
      setFade(true);
      setTimeout(() => {
        setFade(false);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }, 800); // Adjust the duration (in milliseconds) to match your desired animation speed
    }
  };

  const progress = currentQuestionIndex + 1;
  const totalQuestions = questions.length;

  if (questions.length === 0 || currentQuestionIndex >= questions.length) {
    return null;
  }

  return (
    <div className={`quiz-wrapper ${fade ? 'fade' : ''}`}>
      <div className='quiz-header__container'>
        <div className='logo-category__container'>
          <img src={logo} alt='logo' width='40px' height='40px' />
          <h3>Category: {questions[currentQuestionIndex].category}</h3>
        </div>
        <p className='quiz-progress'>
          {progress} of {totalQuestions}
        </p>
      </div>
      <div className='question-container'>
        <p>{questions[currentQuestionIndex].question}</p>
      </div>
      <div className='btn-container'>
        <button className='btn-true' onClick={() => handleAnswer('True')}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            style={{ marginRight: '5px' }}
          >
            <polyline points='20 6 9 17 4 12'></polyline>
          </svg>
          True
        </button>
        <button className='btn-false' onClick={() => handleAnswer('False')}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            style={{ marginRight: '5px' }}
          >
            <line x1='18' y1='6' x2='6' y2='18'></line>
            <line x1='6' y1='6' x2='18' y2='18'></line>
          </svg>
          False
        </button>
      </div>
    </div>
  );
};

export default Quiz;
