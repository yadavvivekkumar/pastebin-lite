import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./components";
import NewPaste from "./components/NewPaste";
import ViewPaste from "./components/ViewPaste";
import RecentPastes from "./components/RecentPastes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/new" element={<NewPaste />} />
        <Route path="/paste/:id"  element={<ViewPaste />} />
        <Route path="/recent" element={<RecentPastes />} />
      </Routes>
    </BrowserRouter>
  );
}