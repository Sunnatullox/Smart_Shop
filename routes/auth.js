const {Router} = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
const {registerValidator} = require("../utils/validators");
const router = Router();

router.get("/login", async(req, res) => {
    res.render("auth/login",{
        title:"Registers",
        isLogin:true,
        RegisterError: req.flash("RegisterError"),
        LoginError:req.flash("LoginError")
    });
});

router.get("/logout", async(req,res) => {
    req.session.destroy(() =>{
        res.redirect("/auth/login#login-in")
    })
})

router.post("/login", async(req,res) =>{
    try{
        const {email, password} = req.body;
        const candidate = await User.findOne({ email});

        if(candidate){
            const userPass = bcrypt.compareSync(password, candidate.password);
            if(userPass){
                req.session.user = candidate;
                req.session.isAuthenticated= true;
                req.session.save((err) => {
                    if(err) throw err
                    res.redirect("/")
                });
            }else{
                req.flash("LoginError", "Password wrong")
                res.redirect("/auth/login#login-in")
            }
        }else{
            req.flash("LoginError", "Password wrong")
            res.redirect("/auth/login#login-in")
        }
    }catch(e){
        req.flash("LoginError", "This username does not fount" )
        console.log(e);
    }
   
})

router.post("/register",registerValidator, async(req, res)=>{
    try{
        const {email, password, name} = req.body;

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            req.flash("RegisterError", errors.array()[0].msg);
            return res.status(422).redirect("/auth/login#login-up")
        }
        const hashPass = await bcrypt.hash(password,10)
        const user = new User({
            email,
            name,
            password:hashPass,
            cart:{items:[]}
        });
        await user.save();
        res.redirect("/auth/login#login-in")
        

    }catch(e){
        console.log(e);
    }
})

module.exports = router