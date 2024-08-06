import React, { useState, useEffect } from 'react';

interface QuestionProps {
  data: {
    id: number;
    type: string;
    question: string;
    options?: string[];
  };
  answer: string | string[] | undefined;
  onNext: (answer: string | string[]) => void;
  onPrevious: () => void;
  onIntroduction: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const Question: React.FC<QuestionProps> = ({ data, answer, onNext, onPrevious, onIntroduction, isFirst, isLast }) => {
  const [currentAnswer, setCurrentAnswer] = useState<string | string[]>(answer || (data.type === 'checkbox' ? [] : ''));
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setCurrentAnswer(answer || (data.type === 'checkbox' ? [] : ''));
    setError('');
  }, [answer, data.type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (data.type === 'checkbox') {
      const value = e.target.value;
      setCurrentAnswer((prev) =>
        Array.isArray(prev)
          ? prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
          : [value]
      );
    } else {
      setCurrentAnswer(e.target.value);
    }
  };

  const handleNext = () => {
    if (data.type === 'text') {
      const textRegex = /^[A-Za-zÀ-ž\s]+$/;
      if (!textRegex.test(currentAnswer as string)) {
        setError('Enter a valid name');
        return;
      }
    } else if (data.type === 'checkbox' && (currentAnswer as string[]).length === 0) {
      setError('Please select an option');
      return;
    } else if (data.type === 'number' && (currentAnswer === '' || Number(currentAnswer) <= 0)) {
      setError('Write 1 or greater');
      return;
    } else if (!currentAnswer) {
      setError('I miss the answer');
      return;
    }
    setError('');
    onNext(currentAnswer);
  };

  return (
    <div>
      <h2>{data.question}</h2>
      {data.type === 'text' && <input className="form-control" type="text" value={currentAnswer as string} onChange={handleChange} style={{ fontSize: 'inherit' }} />}
      {data.type === 'number' && <input className="form-control" type="number" value={currentAnswer as string} onChange={handleChange} min="1" style={{ fontSize: 'inherit' }} />}
      {data.type === 'select' && (
        <select className="form-control" value={currentAnswer as string} onChange={handleChange} style={{ fontSize: 'inherit' }}>
          <option value="">Select...</option>
          {data.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
      {data.type === 'radio' && (
        data.options?.map((option) => (
          <div className="form-check py-1" key={option}>
            <input
              className="form-check-input"
              type="radio"
              value={option}
              checked={currentAnswer === option}
              onChange={handleChange}
              style={{ fontSize: 'inherit' }}
            />
            <label className="form-check-label" style={{ fontSize: 'inherit' }}>{option}</label>
          </div>
        ))
      )}
      {data.type === 'checkbox' && (
        data.options?.map((option) => (
          <div className="form-check py-1" key={option}>
            <input
              className="form-check-input"
              type="checkbox"
              value={option}
              checked={(currentAnswer as string[]).includes(option)}
              onChange={handleChange}
              style={{ fontSize: 'inherit' }}
            />
            <label className="form-check-label" style={{ fontSize: 'inherit' }}>{option}</label>
          </div>
        ))
      )}
      <div className="d-flex justify-content-between align-items-center mt-3">
        {isFirst ? (
          <button className="btn btn-secondary d-flex align-items-center" onClick={onIntroduction}>
            Intro
          </button>
        ) : (
          <button className="btn btn-secondary d-flex align-items-center" onClick={onPrevious}>
            <i className="bi bi-caret-left-fill"></i> Back
          </button>
        )}
        {error && <div className="text-danger ml-3">{error}</div>}
        {isLast ? (
          <button className="btn btn-primary d-flex align-items-center" onClick={handleNext}>
            Summary
          </button>
        ) : (
          <button className="btn btn-primary d-flex align-items-center" onClick={handleNext}>
            Next <i className="bi bi-caret-right-fill"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Question;
