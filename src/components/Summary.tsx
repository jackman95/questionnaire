import React, { useState } from 'react';

interface SummaryProps {
  answers: Record<number, string | string[]>;
  questionsData: {
    id: number;
    type: string;
    question: string;
    options?: string[];
  }[];
  onRestart: () => void;
}

const Summary: React.FC<SummaryProps> = ({ answers, questionsData, onRestart }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const name = answers[1] as string;
    const age = answers[2] as string;
    const color = answers[3] as string;
    const iceCream = answers[4] === 'Yes' ? 'likes' : "doesn't like";
    const hobbies = Array.isArray(answers[5]) ? (answers[5] as string[]).join(', ') : answers[5];
    const music = answers[6] as string;

    const shareText = `${name} is ${age} years old.\nFavourite color is ${color}.\n${name} ${iceCream} ice cream.\n${name} enjoys ${hobbies} and likes ${music} music.`;

    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    const qaText = questionsData.map((question, index) => {
      const options = question.options ? question.options.join('; ') : '';
      return `${index + 1}. ${question.question}: ${options}`;
    }).join('\n');

    const element = document.createElement("a");
    const file = new Blob([qaText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "Q&A.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="text-left">
      <h2>Summary of your answers</h2>
      <ul className="list-group text-left">
        {Object.entries(answers).map(([key, value], index) => (
          <li className="list-group-item" key={key}>
            Q{index + 1}: "{questionsData[parseInt(key) - 1].question}" - {Array.isArray(value) ? value.join(', ') : value}
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button className="btn btn-primary mt-3" onClick={onRestart}>Start again</button>
        <div className="d-flex align-items-center">
          {copied && <span className="text-success mt-3 me-2">Copied!</span>}
          <button className="btn btn-success mt-3 ml-2" onClick={handleShare}>Share Answers</button>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <span></span>
        <button className="btn btn-secondary mt-3" onClick={handleDownload}>Download Q&A</button>
      </div>
    </div>
  );
};

export default Summary;
