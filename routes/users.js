const router = require('express').Router();
// Bring in the User registration function
const {userRegister, userLogin, userAuth, serializeUser, checkRole} = require('../utils/Auth');


// Employee Registration Route
router.post("/register-employee", async (req,res) =>{
    await userRegister(req.body, "employee",res);
});

// Admin Registration Route
router.post("/register-admin", async (req,res) =>{
    await userRegister(req.body, "admin",res);
});


// Manager Registration Route
router.post("/register-manager", async (req,res) =>{
    await userRegister(req.body, "manager",res);
});


// Employee Login Route
router.post("/login-employee", async (req,res) =>{
    await userLogin(req.body, "employee",res);
});


// Admin Login Route
router.post("/login-admin", async (req,res) =>{
    await userLogin(req.body, "admin",res);
});


// Manager Login Route
router.post("/login-manager", async (req,res) =>{
    await userLogin(req.body, "manager",res);
});

// Users common profile route
router.get("/profile", userAuth, async(req,res) => {
    //console.log(req.user);
    //return res.json(req.user);
    return res.json(serializeUser(req.user))
});

// Employee Protected Route
router.get("/employee-protected",userAuth, checkRole(['employee']), async (req,res) =>{
    return res.json("Hello employee")
});

// Admin Protected Route
router.get("/admin-protected",userAuth, checkRole(['admin']), async (req,res) =>{
    return res.json("Hello admin")
});

// Manager Protected Route
router.get("/manager-protected", userAuth, checkRole(['manager']), async (req,res) =>{
    return res.json("Hello manager")
});

// Manager Protected Route
router.get("/admin-manager-protected", userAuth, checkRole(['manager','admin']), async (req,res) =>{
    return res.json("Super admin and Admin")
});

module.exports = router;