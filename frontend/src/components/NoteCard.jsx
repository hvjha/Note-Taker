import { Pencil, Trash2 } from "lucide-react";

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow space-y-2">
      <h3 className="font-semibold text-lg">{note.title}</h3>
      <p className="text-gray-600 text-sm">{note.description}</p>

      <div className="flex justify-between items-center pt-2">
        <span className="text-xs text-gray-400">
          {new Date(note.createdAt).toLocaleDateString()}
        </span>

        <div className="flex gap-3">
          <button onClick={() => onEdit(note)}>
            <Pencil className="w-4 h-4 text-green-600" />
          </button>
          <button onClick={() => onDelete(note._id)}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
