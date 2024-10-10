import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Phone, LogOut, Send } from 'lucide-react';
import BackButton from './BackButton';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  buttons?: { name: string; request: any }[];
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    launchBot();
  }, []);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const launchBot = async () => {
    const apiKey = 'VF.DM.6705143e634c6b114850b9e0';
    const versionID = '66fe734ad6989d0b2de89cff';
    const userID = 'unique-user-id';

    const response = await fetch(`https://general-runtime.voiceflow.com/state/${versionID}/user/${userID}/interact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiKey
      },
      body: JSON.stringify({
        request: {
          type: 'launch'
        }
      })
    });

    const data = await response.json();
    console.log(data);

    data.forEach((message: any) => {
      if (message.payload.message || message.payload.buttons) {
        setMessages(prev => [...prev, {
          text: message.payload.message || "Please choose an option:",
          sender: 'bot',
          buttons: message.payload.buttons
        }]);
      }
    });
  };

  const sendMessage = async (text?: string, buttonRequest?: any) => {
    const messageToSend = text || inputMessage.trim();
    if (!messageToSend && !buttonRequest) return;

    const apiKey = 'VF.DM.6705143e634c6b114850b9e0';
    const versionID = '66fe734ad6989d0b2de89cff';
    const userID = 'unique-user-id';

    setMessages(prev => [...prev, { text: messageToSend, sender: 'user' }]);
    setInputMessage('');

    const response = await fetch(`https://general-runtime.voiceflow.com/state/${versionID}/user/${userID}/interact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiKey
      },
      body: JSON.stringify({
        request: buttonRequest || { type: 'text', payload: messageToSend }
      })
    });

    const data = await response.json();
    console.log(data);

    data.forEach((message: any) => {
      if (message.payload.message || message.payload.buttons) {
        setMessages(prev => [...prev, {
          text: message.payload.message || "Please choose an option:",
          sender: 'bot',
          buttons: message.payload.buttons
        }]);
      }
    });
  };

  return (
    <div className="min-h-screen bg-purple-100 flex flex-col">
      <BackButton />
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-2xl font-semibold text-purple-900">Hope AI Chat</div>
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="text-purple-600 hover:text-purple-800">
            <User size={24} />
          </Link>
          <a href="tel:+442012345678" className="text-green-600 hover:text-green-800">
            <Phone size={24} />
          </a>
          <Link to="/login" className="text-red-600 hover:text-red-800">
            <LogOut size={24} />
          </Link>
        </div>
      </header>

      <div className="flex-1 overflow-hidden flex flex-col md:flex-row p-4">
        <div className="md:hidden mb-4 bg-white rounded-lg shadow-md p-4">
          <div className="mb-4">
            <img src="https://github.com/Asistu/hope-ai-assets/blob/main/Hope.jpg?raw=true" alt="Hope AI Logo" className="w-1/2 mx-auto mb-4" />
          </div>
          <div className="text-sm text-center">
            👋🏼 Hi I'm Hope AI. You've taken a really important step in coming to talk to me:
            <ul className="list-disc list-inside mt-2 text-left">
              <li>Free addiction support and information</li>
              <li>Available 24/7</li>
              <li>Knowledgeable in all common forms of addiction.</li>
              <li>Specialist at helping people seek the right rehabilitation options.</li>
            </ul>
          </div>
        </div>

        <div className="flex-grow md:grid md:grid-cols-7 md:gap-4 h-full">
          <div className="col-span-5 bg-white rounded-lg shadow-md flex flex-col">
            <div ref={chatboxRef} className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {message.text}
                    {message.buttons && (
                      <div className="mt-2 space-y-2">
                        {message.buttons.map((button, buttonIndex) => (
                          <button
                            key={buttonIndex}
                            onClick={() => sendMessage(button.name, button.request)}
                            className="bg-purple-500 text-white px-3 py-1 rounded-md text-sm hover:bg-purple-600 transition duration-300"
                          >
                            {button.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <div className="flex">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="Type a message..."
                />
                <button
                  onClick={() => sendMessage()}
                  className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700 transition duration-300 flex items-center"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="hidden md:block col-span-2 bg-white rounded-lg shadow-md p-4">
            <div className="mb-4">
              <img src="https://github.com/Asistu/hope-ai-assets/blob/main/Hope.jpg?raw=true" alt="Hope AI Logo" className="w-full mb-4" />
            </div>
            <div className="text-sm">
              👋🏼 Hi I'm Hope AI. You've taken a really important step in coming to talk to me:
              <ul className="list-disc list-inside mt-2">
                <li>Free addiction support and information</li>
                <li>Available 24/7</li>
                <li>Knowledgeable in all common forms of addiction.</li>
                <li>Specialist at helping people seek the right rehabilitation options.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-purple-900 text-white p-4 text-center text-sm">
        DISCLAIMER: Hope AI provides general information and suggests therapy options or referrals but is not a substitute for professional medical advice, diagnosis, or treatment. Addiction can pose significant mental and physical health risks, and users should seek guidance from qualified healthcare providers. For emergencies, please contact a healthcare professional immediately.
      </div>
    </div>
  );
};

export default ChatPage;