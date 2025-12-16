import express from 'express'
import { createNote} from '../controller/noteController/createNotes.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { deleteNote } from '../controller/noteController/deleteNote.js';
import { updateNote } from '../controller/noteController/updateNote.js';
import { getNoteById } from '../controller/noteController/getSingleNote.js';
import { getMyNotes } from '../controller/noteController/getMyNotes.js';



const noteRoute = express.Router()
noteRoute.post("/create", isAuthenticated, createNote);
noteRoute.get("/my-notes", isAuthenticated, getMyNotes);
noteRoute.get("/:id", isAuthenticated, getNoteById);
noteRoute.put("/:id", isAuthenticated, updateNote);
noteRoute.delete("/:id", isAuthenticated, deleteNote);
export default noteRoute