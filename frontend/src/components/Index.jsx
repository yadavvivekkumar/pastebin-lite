import { Link } from "react-router-dom";
import { ArrowRight, Code2, Clock, Share2, Zap } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import Button from "./Button";

const features = [
  { icon: Zap, title: "Lightning Fast", description: "Create and share pastes in seconds." },
  { icon: Code2, title: "Syntax Highlighting", description: "Support for multiple languages." },
  { icon: Clock, title: "Auto Expiration", description: "Set custom expiration times." },
  { icon: Share2, title: "Easy Sharing", description: "Share links instantly." },
];

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-white">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-24 text-center">
          <Zap className="mx-auto mb-4 h-10 w-10 text-blue-500" />
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            Share Code <span className="text-blue-500">Instantly</span>
          </h1>
          <p className="mb-8 text-gray-400">
            The fastest way to share code snippets with your team.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/new">
              <Button>
                Create Paste <ArrowRight className="inline h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link to="/recent">
              <Button variant="outline">View Recent</Button>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-4 px-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-gray-800 p-6">
                <f.icon className="mb-4 h-6 w-6 text-blue-500" />
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400">{f.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
