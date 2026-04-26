const express=require("express");
const mongoose=require("mongoose");

const app=express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/testdb");

const UserSchema=new mongoose.Schema({
    name:String,
    email:String
});

const User=mongoose.model("User",UserSchema);

//create
app.post("/addUser",async (req,res)=>{
    const user=new User(req.body);
    await user.save();
    res.send("user added");
});

//read
app.get("/getUser",async (req,res)=>{
    const users=await User.find();
    res.json(users);
});


//update
app.post("/updateUser/:id",async (req,res)=>{
    await User.findByIdAndUpdate(req.params.id,req.body);
    res.send("user updated");
});

//delte
app.delete("/deleteUser/:id",async (req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    res.send("user deleted");
});

app.listen(3000,()=>console.log("Setver is riuing on port 30000"));
