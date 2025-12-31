import Paste from "../models/Paste.js";

// CREATE PASTE
export const createPaste = async (req, res) => {
  try {
    const { title, content, language, expiration } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Content required" });
    }

    const pasteData = { title, content, language };

    if (expiration && Number(expiration) > 0) {
      pasteData.expiresAt = new Date(
        Date.now() + Number(expiration) * 60 * 1000
      );
    }

    const paste = await Paste.create(pasteData);
    res.status(201).json(paste);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE PASTE
export const getPaste = async (req, res) => {
  try {
    const paste = await Paste.findById(req.params.id);

    if (!paste) {
      return res.status(404).json({ message: "Paste not found" });
    }

    // ✅ Expired → block access
    if (paste.expiresAt && paste.expiresAt < new Date()) {
      return res.status(410).json({ message: "Paste expired" });
    }

    paste.views += 1;
    await paste.save();

    res.json(paste);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET RECENT PASTES
export const getRecentPastes = async (req, res) => {
  try {
    const now = new Date();

    const pastes = await Paste.find({
      $or: [
        { expiresAt: { $exists: false } },
        { expiresAt: { $gt: now } },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(pastes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
