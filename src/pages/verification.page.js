import React, { useState, useRef } from 'react';
import { verifyCode } from '../services/service';
import './verification.css'; // Import CSS file for styling

const VerificationPage = () => {
  const [verificationCode, setVerificationCode] = useState(Array(6).fill(''));
  const [verificationResult, setVerificationResult] = useState(null);
  const inputRefs = useRef([]);

  const handleChange = (index, event) => {
    const { value } = event.target;
    setVerificationCode(prevCode => {
      const newCode = [...prevCode];
      newCode[index] = value;
      return newCode;
    });

    // Move focus to the next input if available
    if (value && index < verificationCode.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && index > 0 && !verificationCode[index]) {
      // If backspace is pressed and the current input is empty, remove the previous digit
      setVerificationCode(prevCode => {
        const newCode = [...prevCode];
        newCode[index - 1] = '';
        return newCode;
      });

      // Move focus to the previous input
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = event => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData('text');
    const pasteCharacters = pasteData.split('').slice(0, 6);
    setVerificationCode(pasteCharacters);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const code = verificationCode.join('');
      const result = await verifyCode(code);
      setVerificationResult(result);
    } catch (error) {
      console.error('Error:', error);
      setVerificationResult({ success: false, error });
    }
  };

  return (
    <div className="verification-container">
    <h2>Verification Code</h2>
    <form className="verification-form" onPaste={handlePaste} onSubmit={handleSubmit}>
      <div className="input-container">
        {verificationCode.map((digit, index) => (
          <input
            key={index}
            ref={el => (inputRefs.current[index] = el)}
            type="text"
            maxLength="1"
            value={digit}
            onChange={e => handleChange(index, e)}
            onKeyDown={e => handleKeyDown(index, e)}
          />
        ))}
      </div>
      <button type="submit">Verify</button>
    </form>
    {verificationResult && (
      <p className={verificationResult.success ? 'success-message' : 'error-message'}>
        {verificationResult.success ? 'Verification successful' : `Verification error: ${verificationResult.error}`}
      </p>
    )}
  </div>
);
};


export default VerificationPage;
