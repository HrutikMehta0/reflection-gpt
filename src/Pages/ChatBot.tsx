import { useEffect, useState } from 'react';
import React from 'react';
import './ChatBot.css';

const functionUrl = "https://giyto3ptpjzye4joxq7yfhkkfq0vhgtp.lambda-url.us-east-1.on.aws/";

type Message = {
    text: string,
    sender: 'ai' | 'user'
};

function ChatBot() {
    const [input, setInput] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([
        {text: 'Welcome to the Reflection Helper!', sender: 'ai'},
        {text: "You can respond to this question and continue the conversation with your Professor. Let's start the conversation!", sender: 'ai'}
    ]);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const newMessage: React.FormEventHandler = async (e) => {
        e.preventDefault();
        setInput('');
        const userMessage: Message = {text: input, sender: 'user'};
        const newMessages: Message[] = [...messages, userMessage];
        setMessages(newMessages);
        const response = await fetch(functionUrl, {
            method: 'POST',
            body: JSON.stringify({messages: newMessages}),
        });
        setMessages([...newMessages, {sender: 'ai', text: await response.text()}]);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.style.setProperty('--background-color', '#242424');
            root.style.setProperty('--text-color', '#fff');
            root.style.setProperty('--input-background-color', '#333');
            root.style.setProperty('--input-text-color', '#fff');
        } else {
            root.style.setProperty('--background-color', '#fff');
            root.style.setProperty('--text-color', '#000');
            root.style.setProperty('--input-background-color', '#fff');
            root.style.setProperty('--input-text-color', '#000');
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
            <div>
                {messages.map((m, index) => <p key={index} className={`message ${m.sender}`}>{m.text}</p>)}
            </div>
            <form className='input-form' onSubmit={newMessage}>
                <input type="text" placeholder="Enter your reflection here" value={input} onChange={e => setInput(e.currentTarget.value)} />
                <input type="submit" value="Send" />
            </form>
        </main>
    );
}

export default ChatBot;