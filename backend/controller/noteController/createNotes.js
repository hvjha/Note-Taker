import Note from "../../models/noteModel.js";


/**
 * CREATE NOTE
 */
export const createNote = async (req, res) => {
  try {
    const { title, description, image, video } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const note = await Note.create({
      user: req.userId,
      title,
      description,
      image,
      video,
    });

    return res.status(201).json({
      success: true,
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET ALL NOTES (ONLY LOGGED-IN USER)
 * Search by title & filter by date
 */



/**
 * GET SINGLE NOTE
 */

/**
 * UPDATE NOTE
 */


/**
 * DELETE NOTE
 */

