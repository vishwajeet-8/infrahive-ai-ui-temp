import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sun,
  Moon,
  HelpCircle,
  Bot,
  RotateCcw,
  Send,
  Loader,
  // Link,
  ExternalLink,
  Home,
  LinkIcon,
  ArrowLeft,
  Plus,
  Link2,
} from "lucide-react";
import DraftChatEditor from "./components/DraftChatEditor";
import "../index.css";
import DocumentForm from "./components/DocumentForm";
import { VariableProvider } from "@/context/variableContext";

const DraftChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentResources, setCurrentResources] = useState([]);
  const [showSources, setShowSources] = useState(false);
  const [messageIdCounter, setMessageIdCounter] = useState(1);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessageId = messageIdCounter;
      setMessageIdCounter((prev) => prev + 1);

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: input.trim(),
          id: userMessageId,
        },
      ]);
      setLoading(true);
      setInput("");
      setShowSources(false);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}legal/draft/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_prompt: input.trim(),
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        const assistantMessageId = messageIdCounter + 1;
        setMessageIdCounter((prev) => prev + 1);

        const resources = [
          {
            title: "Generated Document",
            link: data.doc_link || "#",
          },
        ];

        const formattedResponse = {
          role: "assistant",
          content: {
            text: data.draft_response,
            resources: resources,
          },
          id: assistantMessageId,
        };

        setMessages((prev) => [...prev, formattedResponse]);
        setCurrentResources(resources);
      } catch (error) {
        console.error("Error:", error);
        const errorMessageId = messageIdCounter + 1;
        setMessageIdCounter((prev) => prev + 1);

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: {
              text: `Error: ${error.message}. Please try again.`,
              resources: [],
            },
            id: errorMessageId,
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleSources = () => {
    setShowSources(!showSources);
  };

  const isEmpty = messages.length === 0 && !loading;

  const renderAssistantContent = (content) => {
    if (!content?.text) return null;

    const processedText = content.text.replace(/\\n/g, "\n");
    const lines = processedText.split("\n");

    return (
      <div className={`space-y-6 "text-gray-900`}>
        <div className={`text-sm leading-relaxed "text-gray-700`}>
          {lines.map((line, index) => {
            if (!line.trim()) {
              return <div key={index} className="h-4" />;
            }

            const isTitle = line.toUpperCase() === line && line.length > 10;
            const isMainSection = /^\d+\.(?!\d)/.test(line.trim());
            const isSubSection = /^\d+\.\d+/.test(line.trim());
            const isParagraph = !isTitle && !isMainSection && !isSubSection;

            let className = "";
            if (isTitle) {
              className = "text-2xl font-bold my-6";
            } else if (isMainSection) {
              className = "text-xl font-bold mt-6 mb-3";
            } else if (isSubSection) {
              className = "text-lg font-semibold mt-4 mb-2";
            } else if (isParagraph) {
              className = "text-base leading-relaxed mt-2";
            }

            return (
              <div key={index} className={className}>
                <p>{line.trim()}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderSourceButton = (resources) => {
    if (!resources || resources.length === 0) return null;

    return (
      <button
        onClick={() => {
          setCurrentResources(resources);
          setShowSources(true);
        }}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition-colors border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700`}
      >
        <LinkIcon size={14} />
        View Document
      </button>
    );
  };

  const renderMessage = (message) => (
    <div key={message.id}>
      <div className="max-w-2xl mx-auto p-4">
        {message.role === "assistant" ? (
          <div className="flex gap-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 bg-[#BFECFF]
              `}
            >
              <Bot size={16} />
              <img src="https://infrahive-ai-search.vercel.app/Logo%20(Digest).png" />
            </div>
            <div className="flex-1">
              <div className="text-gray-900">
                {renderAssistantContent(message.content)}
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button
                  className={`p-1.5 rounded hover:bg-opacity-80 hover:bg-gray-100`}
                >
                  <RotateCcw size={16} />
                </button>
                {renderSourceButton(message.content.resources)}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-end gap-4">
            <div className="max-w-[85%]">
              <div className="bg-[#3FA2F6] text-white p-5 rounded-2xl">
                {message.content}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full">
      <div className="flex-1 flex-col relative overflow-x-hidden">

        {/* Draft Chat */}
        <VariableProvider>
          <div className="document flex max-h-screen overflow-y-auto scrollbar-hidden">
            <div className="document-editor basis-2/3 m-5">
              <div
                className="document-editor-head flex justify-between"
                style={{ marginLeft: "20px" }}
              >
                <div className="flex gap-8">
                  <Link to={"/"}>
                    <ArrowLeft />
                  </Link>
                  <h4>Untitled Document</h4>
                </div>
              </div>

              <div className="document-editor-body">
                <DraftChatEditor />
              </div>
            </div>

            <div className="document-fields basis-1/3">
              <DocumentForm />
            </div>
          </div>
        </VariableProvider>
      </div>
    </div>
  );
};

export default DraftChat;
