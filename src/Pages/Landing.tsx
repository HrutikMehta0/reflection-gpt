import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleStartClick = () => {
    navigate('/chatbot');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty('--background-color', '#242424');
      root.style.setProperty('--text-color', '#fff');
      root.style.setProperty('--link-color', '#9a9aff');
      root.style.setProperty('--link-hover-color', '#b3b3ff');
    } else {
      root.style.setProperty('--background-color', '#fff');
      root.style.setProperty('--text-color', '#000');
      root.style.setProperty('--link-color', '#646cff');
      root.style.setProperty('--link-hover-color', '#535bf2');
    }
  }, [isDarkMode]);

  return (
    <main>
      <header>
        <h1>Reflection Helper</h1>
        <button onClick={toggleTheme}>
          Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
      </header>
      <section>
        <h2>What is Reflection Helper?</h2>
        <p>Reflection Helper is a tool that helps you write reflections. It uses the GPT-3 model to generate text based on your prompts.</p>
        <h2>How to use Reflection Helper</h2>
        <p>Simply type in a prompt, and Reflection Helper will generate text based on your prompt.</p>
        <h2>Rules</h2>
        <p>1. Don't try to abuse the system</p>
        <h2>Get started</h2>
        <button onClick={handleStartClick}>Start</button>
      </section>
    </main>
  );
}

export default LandingPage;