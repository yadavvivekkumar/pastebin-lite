import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import { API_BASE_URL } from "../config/api";

export default function RecentPastes() {
  const [pastes, setPastes] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/pastes/recent`)
      .then((res) => res.json())
      .then((data) => setPastes(data));
  }, []);

  // 🔁 Live countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setPastes((p) => [...p]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getRemainingTime = (expiresAt) => {
    if (!expiresAt) return "Never";

    const diff = new Date(expiresAt) - new Date();
    if (diff <= 0) return "Expired";

    const m = Math.floor(diff / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    return m > 0 ? `Expires in ${m}m ${s}s` : `Expires in ${s}s`;
  };

  const isExpired = (expiresAt) =>
    expiresAt && new Date(expiresAt) < new Date();

  const handleShare = (id) => {
    navigator.clipboard.writeText(
      `${window.location.origin}/paste/${id}`
    );
    alert("Link copied to clipboard");
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-white">
      <Header />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/" className="flex items-center gap-2 text-gray-400 mb-6">
            <ArrowLeft size={16} /> Back
          </Link>

          <h1 className="text-3xl font-bold mb-6">Recent Pastes</h1>

          <ul className="space-y-4">
            {pastes.map((paste) => (
              <li
                key={paste._id}
                className="bg-gray-900 border border-gray-800 p-4 rounded-lg"
              >
                {/* Title */}
                {isExpired(paste.expiresAt) ? (
                  <span className="text-gray-500 font-semibold">
                    {paste.title || "Untitled Paste"} (Expired)
                  </span>
                ) : (
                  <Link
                    to={`/paste/${paste._id}`}
                    className="text-blue-400 font-semibold hover:underline"
                  >
                    {paste.title || "Untitled Paste"}
                  </Link>
                )}

                {/* Meta */}
                <div className="flex gap-4 text-sm text-gray-400 mt-2">
                  <span>{paste.language}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {getRemainingTime(paste.expiresAt)}
                  </span>
                </div>

                {/* 🔗 SHARE BUTTON */}
                {!isExpired(paste.expiresAt) && (
                  <button
                    onClick={() => handleShare(paste._id)}
                    className="text-sm text-blue-400 hover:underline mt-2"
                  >
                    Share
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}
