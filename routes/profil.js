const {Router} = require("express");
const router = Router();
const auth = require("../middleware/auth");
const User = require("../models/user")

router.get("/",auth, async(req, res) => {
    res.render("Profile",{
        title:"Profile",
        isProfile:true,
        user: req.user.toObject(),
    })  
});

router.post("/", auth, async(req, res)=>{
    try{
        const user = await User.findById(req.user._id);
        const toChange = {
            name:req.body.name,
            lastname: req.body.lastname,
            city:req.body.city,
            state:req.body.state,
            zip:req.body.zip,
            Telnumber:req.body.Telnumber,
            bio:req.body.bio
        }
        console.log(req.files);
        if(req.files){
            toChange.avatarUrl = req.files.avatar[0].path
        }
        Object.assign(user, toChange)
        await user.save()
        res.redirect("/Profile")
    }catch(e){
        console.log(e);
    }
})


module.exports = router