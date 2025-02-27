

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Box } from "@mui/material";
import ChatPanel from "../../components/chat-panel";
import Sidebar from "../../components/chat-sidebar";
import { useAuth } from "../../context/AuthContext";
import CodeBlock from "../../components/code-block";
import EmptyScreen from "../../components/empty-screen"
import Header from "../../layout/header"
import { toast } from "react-toastify";
import posthog from "../../lib/posthog";

import PrivateRoute from '../../layout/PrivateRoute';
function Chat({ id, className, session, missingKeys }) {
  const { state, fetchHistory } = useAuth();

  const [input, setInput] = useState("");
  const [responseStream, setResponseStream] = useState([]);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [shouldStop, setShouldStop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const chatHistory = state.user?.userHistory || [];
  const animationRef = useRef(null);


  useEffect(() => {
    posthog.capture('$pageview');
  }, []);
  




  useEffect(() => {
    if (selectedChat !== null) {
      const selectedChatData = chatHistory[selectedChat];
      if (selectedChatData) {
        setResponseStream([selectedChatData.response_txt || ""]);
      }
    }
  }, [selectedChat, chatHistory]);

  useEffect(() => {
    setIsLoading(chatHistory.length === 0);
  }, [chatHistory]);

  const fetchResponse = async (sanitizedInput) => {
    try {
      setSendingMessage(true);
      setShouldStop(false);

        // Track message sending
        posthog.capture('message_sent', {
          user: state?.user?.email,
          message: sanitizedInput,
        });

      const apiUrl = `https://junaid121e2e-001-site1.ctempurl.com/api/ResponseGeneration/TextResponseGenerator`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "string",
          response_txt: "string",
          request_txt: sanitizedInput,
          email: state?.user?.email,
          base64Image: "string",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();

      let streamData = "";
      const words = [];
      let currentIndex = 0;

      const renderWords = (timestamp) => {
        if (shouldStop) {
          setSendingMessage(false);
          cancelAnimationFrame(animationRef.current);
          return;
        }

        if (currentIndex < words.length) {
          setResponseStream((prevStream) => [
            ...prevStream,
            words[currentIndex] + " ",
          ]);
          currentIndex++;
        } else {
          setSendingMessage(false);
          cancelAnimationFrame(animationRef.current);
          return;
        }

        animationRef.current = requestAnimationFrame(renderWords);
      };

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        streamData += value;
        words.push(...value.split(" "));
        
      }

      animationRef.current = requestAnimationFrame(renderWords);

      await fetchHistory();

       // Track chat history loading
       posthog.capture('chat_history_loaded', {
        user: state?.user?.email,
        historyLength: chatHistory.length,
      });

      const newChatIndex = chatHistory.length;
      setSelectedChat(newChatIndex);
      handleSelectChat(newChatIndex);
    } catch (error) {
      console.error("Error fetching response:", error);
      setSendingMessage(false);
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleStop = () => {
    setShouldStop(true);
  };

  const handleSend = async () => {
   
    const sanitizedInput = input.trim();
    if(input !== ""){
      setResponseStream([]);
    await fetchResponse(sanitizedInput);
    setInput("");
    }
    else {
      toast.error("Please enter a valid input.", { toastId: "error-toast-app" });

    }
    
  };

  const handleSelectChat = (index) => {
    setSelectedChat(index);

    // Track chat selection
    posthog.capture('chat_selected', {
      user: state?.user?.email,
      chatIndex: index,
    });
  };

  return (
    
    <>
    <Header/>
    <div
    style={{
      height: 'calc(100vh - 60px)',
    }}
    className=" w-full flex justify-between overflow-hidden">
  <Sidebar
    chatHistory={chatHistory}
    onSelectChat={handleSelectChat}
    selectedChatIndex={selectedChat}
    isLoading={isLoading}
  />

  <Box
    sx={{
      flexGrow: 1,
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      height: 'calc(100vh - 60px)',
      overflowY: 'scroll', 
      overflowX:"hidden"
    }}
  >
    {responseStream.length > 0 ? (
     <div className="no-scrollbar">
     <CodeBlock code={responseStream.join('')} />
    </div>
   
    ) : (
      <EmptyScreen />
    )}

    <ChatPanel
      id={id}
      input={input}
      setInput={setInput}
      handleSend={handleSend}
      sendingMessage={sendingMessage}
      handleStopStreaming={() => setSendingMessage(false)}
      streaming={sendingMessage}
    />
  </Box>
</div>
    </>





  );
}



// export default PrivateRoute(Chat);
export default Chat;

