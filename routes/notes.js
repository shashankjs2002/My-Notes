const express = require('express');
const fetchUser = require('../middlewares/fetchUser');
const router = express.Router();
const Notes = require('../models/Notes')

const { body, validationResult } = require('express-validator');



// Route 1 : Fetch notes to corresponding user GET "/api/notes/fetch-all-notes" , Login required
router.get('/fetch-all-notes',fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({user: req.user.id}).sort([['updatedAt', -1]])
        res.json(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }
})

// Route 2 : Add a new note to corresponding user POST "/api/notes/add-note" , Login Required
router.post('/add-notes',fetchUser,
    [body('title', 'Title cannot be empty').exists(),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })],

    async (req, res) => {
        const {title, description, tag} = req.body;
        const errors = validationResult(req);
         // If errors return bad request and error message
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const note = new Notes({
                title, description, tag , user: req.user.id
            })
            const savedNote = await note.save()
            res.json(savedNote)
        } catch (error) {
            console.log(error.message)
            res.status(500).send("Internal server error")
        }   
    }
)

// Route 3 : Update an existing note to corresponding user PUT "/api/notes/update-note" , Login Required

router.put('/update-note/:id', fetchUser, async (req, res)=>{
    const {title, description, tag} = req.body;
    const newNote  = {}
    // console.log(req.params.id)

    try {
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};


        // Find Note to be updated and update it

        // note not exist
        let note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).json({error: "Not Found"})
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).json({error:"Unauthorized user"})
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note});
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error: "Internal server error"})
    }

})


// Route 3 : Delete an existing note to corresponding user DELETE "/api/notes/delete-note" , Login Required

router.delete('/delete-note/:id', fetchUser, async (req, res)=>{

    // console.log(req.params.id)

    try {
        // Find Note to be delete and delete it

        // note not exist
        let note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).send("Not Found")
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Unauthorized user")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({message : "Deleted Successfully",note});
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }

    
})


module.exports = router