import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, Send, Trash2, Bot, User,
  FileText, ExternalLink, Download, PanelLeftOpen, PanelLeftClose,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAuth } from "../context/AuthContext";
import { getAnalysisById } from "../services/historyService";
import {
  getChatMessages,
  saveChatMessage,
  clearChatHistory,
} from "../services/chatHistoryService";
import { sendChatMessage } from "../services/chatService";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const QUICK_ASKS = [
  "Am I a good fit for this role?",
  "How can I improve my summary?",
  "Which keywords am I missing?",
  "Give me interview tips",
];

const GREETING =
  "👋 **Hi, I'm ResumeIQ AI** — your personal career coach.\n\n" +
  "I've already read your resume and analysis. Ask me anything about your resume, " +
  "role fit, what to improve, or how to prep for interviews.";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildAnalysisSummary(analysis) {
  const strengths = (analysis.strengths || []).slice(0, 2).join("; ");
  const weaknesses = (analysis.weaknesses || []).slice(0, 2).join("; ");
  return (
    `ATS Score: ${analysis.ats_score}/90. ` +
    `Match: ${analysis.match_percentage}%. ` +
    `Key strengths: ${strengths || "N/A"}. ` +
    `Key weaknesses: ${weaknesses || "N/A"}.`
  );
}

// ---------------------------------------------------------------------------
// Markdown renderer for assistant messages
// Uses react-markdown + remark-gfm so ### / ** / - render properly
// ---------------------------------------------------------------------------
const mdComponents = {
  // Keep headings modest — they live inside a small chat bubble
  h1: ({ children }) => (
    <p className="font-semibold text-gray-900 mb-1">{children}</p>
  ),
  h2: ({ children }) => (
    <p className="font-semibold text-gray-900 mb-1">{children}</p>
  ),
  h3: ({ children }) => (
    <p className="font-semibold text-gray-800 mb-0.5">{children}</p>
  ),
  p: ({ children }) => (
    <p className="leading-relaxed mb-1.5 last:mb-0">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="space-y-0.5 mb-1.5 last:mb-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="space-y-0.5 mb-1.5 last:mb-0 list-decimal list-inside">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="flex items-start gap-1.5 leading-relaxed">
      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ children }) => (
    <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-xs font-mono">
      {children}
    </code>
  ),
};

function AssistantContent({ content }) {
  return (
    <div className="text-sm text-gray-800">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={mdComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Typing indicator
// ---------------------------------------------------------------------------
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5 px-4 py-2">
      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
        <Bot size={12} className="text-blue-600" />
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-2.5 shadow-sm flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Message bubble — shows avatar only on first of consecutive assistant msgs
// ---------------------------------------------------------------------------
function MessageBubble({ role, content, showAvatar }) {
  if (role === "user") {
    return (
      <div className="flex items-end justify-end gap-2 px-4">
        <div className="max-w-[72%] bg-blue-600 text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-md shadow-sm leading-relaxed">
          {content}
        </div>
        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
          <User size={11} className="text-gray-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-2.5 px-4">
      {showAvatar ? (
        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
          <Bot size={12} className="text-blue-600" />
        </div>
      ) : (
        <div className="w-6 shrink-0" /> /* spacer to keep alignment */
      )}
      <div className="max-w-[75%] bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-2.5 shadow-sm">
        <AssistantContent content={content} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Resume drawer panel
// ---------------------------------------------------------------------------
function ResumePanel({ fileUrl, fileName, onClose }) {
  const handleDownload = () => {
    if (!fileUrl) return;
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = fileName || "resume.pdf";
    a.target = "_blank";
    a.click();
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Panel header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-md bg-red-50 flex items-center justify-center shrink-0">
            <FileText size={12} className="text-red-500" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-gray-700 truncate max-w-[150px]">
              {fileName || "Resume.pdf"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {fileUrl && (
            <>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-blue-600 px-2 py-1 rounded-md hover:bg-gray-100 transition"
              >
                <ExternalLink size={11} />
                Open
              </a>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-gray-800 px-2 py-1 rounded-md hover:bg-gray-100 transition"
              >
                <Download size={11} />
                Download
              </button>
            </>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
            title="Close preview"
          >
            <PanelLeftClose size={14} />
          </button>
        </div>
      </div>

      {/* PDF iframe */}
      <div className="flex-1 overflow-hidden bg-gray-50">
        {fileUrl ? (
          <iframe
            src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=1`}
            title="Resume PDF"
            className="w-full h-full border-0"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-center px-6">
            <FileText size={20} className="text-gray-300" />
            <p className="text-xs text-gray-400">Preview not available.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Chat page
// ---------------------------------------------------------------------------
function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [analysisSummary, setAnalysisSummary] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  // Resume drawer — collapsed by default
  const [drawerOpen, setDrawerOpen] = useState(false);

  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!id || !user) return;
    loadPage();
  }, [id, user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const loadPage = async () => {
    setPageLoading(true);
    const [analysisResult, chatResult] = await Promise.all([
      getAnalysisById(id),
      getChatMessages(id),
    ]);

    if (analysisResult.error) {
      console.error(analysisResult.error);
      setPageError("Could not load the analysis.");
      setPageLoading(false);
      return;
    }

    const data = analysisResult.data;
    setResumeText(data.resume_text || "");
    setJobDescription(data.job_description || "");
    setAnalysisSummary(buildAnalysisSummary(data.analysis));
    setFileName(data.resumes?.file_name || "Resume.pdf");
    setFileUrl(data.resumes?.file_url || "");

    if (!chatResult.error && chatResult.data) {
      setMessages(chatResult.data.map((m) => ({ role: m.role, content: m.content })));
    }

    setPageLoading(false);
  };

  const handleSend = async (overrideText) => {
    const text = (overrideText ?? input).trim();
    if (!text || sending) return;

    setSendError("");
    setInput("");

    const optimisticMessages = [...messages, { role: "user", content: text }];
    setMessages(optimisticMessages);
    setSending(true);

    try {
      await saveChatMessage({ analysisId: id, userId: user.id, role: "user", content: text });

      const reply = await sendChatMessage({
        resumeText,
        jobDescription,
        analysisSummary,
        conversationHistory: messages,
        userMessage: text,
      });

      await saveChatMessage({ analysisId: id, userId: user.id, role: "assistant", content: reply });
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
      setSendError(err.friendlyMessage || err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
      textareaRef.current?.focus();
    }
  };

  const handleClear = async () => {
    if (!window.confirm("Clear all chat messages for this analysis?")) return;
    const { error } = await clearChatHistory(id);
    if (error) { console.error(error); return; }
    setMessages([]);
    setSendError("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Guards ─────────────────────────────────────────────────────────────
  if (pageLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
          <p className="text-gray-400 text-sm">Loading chat…</p>
        </div>
      </div>
    );
  }

  if (pageError) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <p className="text-red-500 text-sm">{pageError}</p>
      </div>
    );
  }

  const isEmpty = messages.length === 0;

  // Determine avatar visibility: show for first message of each assistant run
  const withAvatar = messages.map((msg, i) =>
    msg.role === "assistant" && (i === 0 || messages[i - 1].role !== "assistant")
  );

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 shrink-0 z-20">
        <div className="flex items-center justify-between px-4 h-12">

          {/* Left: back + title */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/result/${id}`)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
              aria-label="Back to result"
            >
              <ArrowLeft size={16} />
            </button>
            <span className="text-sm font-semibold text-gray-800">
              Chat about your resume
            </span>
          </div>

          {/* Right: view resume toggle + clear */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setDrawerOpen((v) => !v)}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 hover:bg-gray-100 px-2.5 py-1.5 rounded-lg transition"
            >
              {drawerOpen
                ? <PanelLeftClose size={14} />
                : <PanelLeftOpen size={14} />}
              {drawerOpen ? "Hide resume" : "View resume"}
            </button>

            <div className="w-px h-4 bg-gray-200 mx-1" />

            <button
              onClick={handleClear}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition"
            >
              <Trash2 size={13} />
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* ── Body: drawer + chat ─────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0">

        {/* Resume drawer — slides in from the left */}
        {drawerOpen && (
          <div className="hidden lg:flex flex-col w-[400px] shrink-0 border-r border-gray-200">
            <ResumePanel
              fileUrl={fileUrl}
              fileName={fileName}
              onClose={() => setDrawerOpen(false)}
            />
          </div>
        )}

        {/* Chat column */}
        <div className="flex flex-col flex-1 min-w-0 bg-gray-50">

          {/* ── Message list ────────────────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto py-5 space-y-3">

            {/* Greeting — always first, before any messages */}
            <div className="flex items-end gap-2.5 px-4">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Bot size={12} className="text-blue-600" />
              </div>
              <div className="max-w-[75%] bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-2.5 shadow-sm">
                <AssistantContent content={GREETING} />
              </div>
            </div>

            {messages.map((msg, i) => (
              <MessageBubble
                key={i}
                role={msg.role}
                content={msg.content}
                showAvatar={withAvatar[i]}
              />
            ))}

            {sending && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* ── Quick-ask chips (only when no messages yet) ─────────────── */}
          {isEmpty && (
            <div className="px-4 pb-3 flex flex-wrap gap-2 justify-center">
              {QUICK_ASKS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  disabled={sending}
                  className="text-xs bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 rounded-full px-3.5 py-1.5 transition shadow-sm disabled:opacity-40"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* ── Input bar ───────────────────────────────────────────────── */}
          <div className="bg-white border-t border-gray-200 px-4 py-3 shrink-0">
            {sendError && (
              <p className="text-xs text-red-500 mb-2 pl-1">{sendError}</p>
            )}
            <div className="flex items-end gap-2">
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={sending}
                placeholder="Ask anything about your resume…"
                className="flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition max-h-28 overflow-y-auto"
                style={{ lineHeight: "1.5" }}
              />
              <button
                onClick={() => handleSend()}
                disabled={sending || !input.trim()}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm shrink-0"
                aria-label="Send"
              >
                <Send size={14} />
              </button>
            </div>
            <p className="text-[10px] text-gray-300 text-center mt-1.5">
              Enter to send · Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
