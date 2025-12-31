import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "./Button";

export default function Header() {
  return (
    <header className="border-b border-gray-800 p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">CodeShare</h2>

        <div className="flex gap-4">
          <Link to="/new">
            <Button>
              Create Paste <ArrowRight className="inline h-4 w-4 ml-2" />
            </Button>
          </Link>

          <Link to="/recent">
            <Button variant="outline">View Recent</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
