import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} from "@/api/notesApi";

import NoteCard from "@/components/NoteCard";
import NoteModal from "@/components/NoteModal";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const loadNotes = async () => {
    const res = await fetchNotes({ search, date });
    setNotes(res.data.notes);
  };

  useEffect(() => {
    loadNotes();
  }, [search, date]);

  const handleSave = async (data) => {
    try {
      if (editingNote) {
        await updateNote(editingNote._id, data);
        toast.success("Note updated");
      } else {
        await createNote(data);
        toast.success("Note created");
      }
      setModalOpen(false);
      setEditingNote(null);
      loadNotes();
    } catch {
      toast.error("Action failed");
    }
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    toast.success("Note deleted");
    loadNotes();
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-700">My Notes</h1>
          <Button
            onClick={() => setModalOpen(true)}
            className="bg-green-600 hover:bg-green-500"
          >
            + Create Note
          </Button>
        </div>

        <div className="flex gap-4">
          <Input
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={(n) => {
                setEditingNote(n);
                setModalOpen(true);
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      <NoteModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingNote(null);
        }}
        onSave={handleSave}
        initialData={editingNote}
      />
    </div>
  );
};

export default Notes;
