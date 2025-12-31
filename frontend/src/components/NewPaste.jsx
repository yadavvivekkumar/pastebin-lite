import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FileCode, Clock, Send, ArrowLeft } from "lucide-react";

import Header from "./Header";
import Footer from "./Footer";
import Button from "./Button";
import { API_BASE_URL } from "../config/api";

export default function NewPaste() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("plaintext");
  const [expiration, setExpiration] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("Please enter some content");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE_URL}/pastes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          language,
          expiration,
        }),
      });

      if (!res.ok) throw new Error("Failed to create paste");

      const data = await res.json();
      const pasteId = data._id || data.id;

      navigate(`/paste/${pasteId}`);
    } catch (err) {
      console.error(err);
      alert("Error creating paste");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-white">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-6">

          {/* 🔙 Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <h1 className="text-3xl font-bold mb-2">Create New Paste</h1>
          <p className="text-gray-400 mb-8">
            Share code snippets with optional expiration
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-2"
              placeholder="Title (optional)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <select
              className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-2"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="plaintext">Plain Text</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="html">HTML</option>
            </select>

            <select
              className="w-full rounded-lg bg-gray-900 border border-gray-800 px-4 py-2"
              onChange={(e) =>
                setExpiration(e.target.value ? Number(e.target.value) : null)
              }
            >
              <option value="">Never</option>
              <option value="10">10 Minutes</option>
              <option value="60">1 Hour</option>
              <option value="1440">1 Day</option>
            </select>

            <textarea
              className="w-full h-60 rounded-lg bg-gray-900 border border-gray-800 px-4 py-2 font-mono"
              placeholder="Paste your code here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="flex justify-end">
              <Button disabled={isSubmitting}>
                {isSubmitting ? (
                  "Creating..."
                ) : (
                  <>
                    <Send className="inline mr-2 h-4 w-4" />
                    Create Paste
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
