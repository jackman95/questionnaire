import React, { useState, useEffect } from 'react';

interface IntroProps {
  onStart: () => void;
  onFontChange: (font: string) => void;
  onFontSizeChange: (size: string) => void;
  initialFont: string;
  initialFontSize: string;
}

const Intro: React.FC<IntroProps> = ({ onStart, onFontChange, onFontSizeChange, initialFont, initialFontSize }) => {
  const [selectedFont, setSelectedFont] = useState<string>(initialFont);
  const [selectedFontSize, setSelectedFontSize] = useState<string>(initialFontSize);

  useEffect(() => {
    setSelectedFont(initialFont);
    setSelectedFontSize(initialFontSize);
  }, [initialFont, initialFontSize]);

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFont(e.target.value);
    onFontChange(e.target.value);
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFontSize(e.target.value);
    onFontSizeChange(e.target.value);
  };

  return (
    <div className="text-center">
      <div className="d-flex justify-content-end mb-3">
        <div className="me-3">
          <select id="fontSelect" className="form-select" value={selectedFont} onChange={handleFontChange}>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Verdana">Verdana</option>
          </select>
        </div>
        <div>
          <select id="fontSizeSelect" className="form-select" value={selectedFontSize} onChange={handleFontSizeChange}>
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="20px">20px</option>
            <option value="28px">28px</option>
          </select>
        </div>
      </div>
      <h1>Welcome to the Questionnaire</h1>
      <p>Answer the following questions.</p>
      <p>You need to fill all fields, you can edit your answers. You can share your answers after finishing.</p>
      <button className="btn btn-primary" onClick={onStart}>Start</button>
    </div>
  );
};

export default Intro;
