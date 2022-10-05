const express = require("express");
const userModel = require("./model");
const app = express();
var router = express.Router()


router.post("/", async (request, response) => {
    const user = new userModel(request.body);
    try {
        await user.save();
        response.send(user);
    } catch (error) {
        response.status(500).send(error);
    }
});


router.delete('/delete/:id', (req, res, next) => {
    userModel.deleteOne({ _id: req.params.id }).then(
        () => {
            res.status(200).json({
                message: 'Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});
router.get("/", (req, res) => {
     userModel.find({},(error, userlist)=>{
        if(error){
            res.send(error)
        }else{
            res.send(userlist)
        }
     });  
});
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const users = userModel.findById(id, (error, docs) => {
        if (error) {
            res.send({ "message": 'No record found' })
        } else {
            res.send(docs)
        }
    });
})

router.put("/update/:id", (req, res) => {
    const id = req.params.id;
    const person = userModel.update({ _id: id }, req.body, (error, docs) => {
        if (error) {
            res.send(error);
        } else {
            res.send(docs);
        }
    })
})

//export the rote to use in a app.js
module.exports = router;