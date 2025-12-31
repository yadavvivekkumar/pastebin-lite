import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Copy, Share2, Check } from "lucide-react";

import Header from "./Header";
import Footer from "./Footer";
import Button from "./Button";
import { API_BASE_URL } from "../config/api";

export default function ViewPaste() {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/pastes/${id}`)
      .then((res) => {
        if (res.status === 410) throw new Error("expired");
        if (!res.ok) throw new Error("notfound");
        return res.json();
      })
      .then(setPaste)
      .catch(() => setPaste(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  if (!paste)
    return (
      <p className="text-center mt-20 text-red-400">
        ❌ This paste has expired or no longer exists
      </p>
    );

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-white">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/" className="flex items-center gap-2 text-gray-400 mb-6">
            <ArrowLeft size={16} /> Back
          </Link>

          <h1 className="text-3xl font-bold">
            {paste.title || "Untitled Paste"}
          </h1>

          <pre className="mt-6 bg-gray-900 p-4 rounded-lg overflow-x-auto">
            <code>{paste.content}</code>
          </pre>

          {/* 🔗 ACTION BUTTONS */}
          <div className="flex gap-3 mt-4">
            <Button onClick={handleShare}>
              {copied ? <Check size={16} /> : <Share2 size={16} />}
              <span className="ml-2">
                {copied ? "Link Copied" : "Share Link"}
              </span>
            </Button>

            <Button
              onClick={() => navigator.clipboard.writeText(paste.content)}
            >
              <Copy size={16} />
              <span className="ml-2">Copy Content</span>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
