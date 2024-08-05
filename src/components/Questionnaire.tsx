import React, { useState, useEffect } from 'react';
import Intro from './Intro';
import Question from './Question';
import Summary from './Summary';
import 'bootstrap/dist/css/bootstrap.min.css';

interface QuestionData {
  id: number;
  type: string;
  question: string;
  options?: string[];
}

const questionsData: QuestionData[] = [
  {
    id: 1,
    type: 'text',
    question: 'What is your name?',
  },
  {
    id: 2,
    type: 'number',
    question: 'How old are you?',
  },
  {
    id: 3,
    type: 'select',
    question: 'What is your favorite color?',
    options: ['Red', 'Green', 'Blue', 'Yellow'],
  },
  {
    id: 4,
    type: 'radio',
    question: 'Do you like ice cream?',
    options: ['Yes', 'No'],
  },
  {
    id: 5,
    type: 'checkbox',
    question: 'Which hobbies do you enjoy?',
    options: ['Reading', 'Traveling', 'Cooking', 'Gardening'],
  },
  {
    id: 6,
    type: 'select',
    question: 'What is your favorite type of music?',
    options: ['Pop', 'Rock', 'Classical', 'Jazz'],
  },
];

const Questionnaire: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>(() => {
    const savedAnswers = localStorage.getItem('answers');
    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });
  const [font, setFont] = useState<string>('Arial');
  const [fontSize, setFontSize] = useState<string>('16px');

  useEffect(() => {
    localStorage.setItem('answers', JSON.stringify(answers));
  }, [answers]);

  const handleNext = (answer: string | string[]) => {
    const currentQuestionId = questionsData[step - 1].id;
    const updatedAnswers = { ...answers, [currentQuestionId]: answer };
    setAnswers(updatedAnswers);
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleIntroduction = () => {
    setStep(0);
  };

  const handleRestart = () => {
    setAnswers({});
    setStep(0);
    localStorage.removeItem('answers');
  };

  const handleFontChange = (font: string) => {
    setFont(font);
  };

  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
  };

  return (
    <div className="container mt-5" style={{ fontFamily: font, fontSize: fontSize }}>
      <div className="card">
        <div className="card-body">
          {step === 0 && (
            <Intro
              onStart={() => setStep(1)}
              onFontChange={handleFontChange}
              onFontSizeChange={handleFontSizeChange}
              initialFont={font}
              initialFontSize={fontSize}
            />
          )}
          {step > 0 && step <= questionsData.length && (
            <Question
              data={questionsData[step - 1]}
              answer={answers[questionsData[step - 1].id]}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onIntroduction={handleIntroduction}
              isFirst={step === 1}
              isLast={step === questionsData.length}
            />
          )}
          {step > questionsData.length && (
            <Summary answers={answers} questionsData={questionsData} onRestart={handleRestart} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
