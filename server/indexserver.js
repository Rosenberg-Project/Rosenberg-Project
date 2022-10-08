const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const accessmodel = require("./models/access-accounts");

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://mascasteel:Obnyf0OR9wfPxpdc@cluster1.ayf8d5x.mongodb.net/actions?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("connection start")).catch((error) => console.log(error.message))

app.post("/insert", async (req, res) =>{
    const {userid,password,designation} = req.body.insertidpassword
    try {
        const preuser = await accessmodel.findOne({user_ID: userid});
        console.log(preuser);

        if(preuser){
            res.send("User is already present");
        }else{
            const actions = new accessmodel({ user_ID: userid, password_ID: password ,designation_ID: designation});
            await actions.save();
            res.send("New user added");
            console.log(actions);
        }
    }catch(err) {
        console.log(err);
    };
});

app.get("/retrieve", async (req, res) =>{
     accessmodel.find({}, (err,result) =>{
        if (err) {
            res.send(err)
        }
        res.send(result);
     });
});

app.listen(3001, () => {
    console.log("server running on port 3001");
});