import React, { useState, useEffect, useRef } from 'react';
import { AirVent, Send } from "lucide-react";
import axios from 'axios'
import Loading from './component/Loading';


const ChatPreview = () => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  const submitDataFromUser = async () => {
    if (!userInput.trim()) return;
    setMsg([...msg, { from: "user", content: userInput }]);
    setLoading(true);
    console.log(loading)
    try{
      const res = await axios.post(import.meta.env.VITE_SECRET, {
        message : userInput
      })
      const response = res.data;
      setMsg((prev)=> [...prev , {from :"ai", content:response}]);
    }
    catch(e){
      console.log(`error occure ${e}`)
    }
    setLoading(false);
    setUserInput("");
  };

  const submitDataFromAI = () => {
    if (!userInput.trim()) return;
    setMsg([...msg, { from: "ai", content: userInput }]);
    setUserInput("");
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col justify-center items-center">
      <div className="w-[50%] flex flex-col gap-4 p-4 rounded-2xl shadow-2xl bg-white/30 backdrop-blur-sm">
        <div className="h-[80vh] overflow-y-auto rounded-xl bg-white/50 p-6">
          <div className="flex flex-col space-y-4">
            {msg.map((e, index) => (
              <div
                key={index}
                className={`flex ${e.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] break-words rounded-2xl px-4 py-3 ${
                    e.from === "user"
                      ? "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-white rounded-tl-none shadow-md"
                  }`}
                >
                  <p className={`text-lg ${e.from === "user" ? "text-white" : "text-gray-800"}`}>
                    {e.content}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <p>{loading && <Loading loading={loading}/>}</p>
        </div>
          
        <div className="flex justify-center items-center gap-3 p-4 bg-gray-300 rounded-xl backdrop-blur-sm">
          <input
            type="text"
            value={userInput}
            onKeyDown={(e)=>{
              if(e.key == "Enter") submitDataFromUser()
            }}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your query here..."
            className="flex-1 px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white"
          />
          
          <button
            className="px-6 stretch w-24 flex justify-center items-center py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
            onClick={submitDataFromUser}
          >
            <Send size={24} />
          </button>
          {/* <button
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
            onClick={submitDataFromAI}
          >
            AI
          </button> */}
        </div>
      </div>
    </div>
  );

};

export default ChatPreview;
