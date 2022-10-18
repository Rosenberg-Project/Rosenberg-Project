const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const accessmodel = require("./models/access-accounts");
const bcrypt = require("bcryptjs");

const jwt = require('jsonwebtoken');
const JWT_SECTRET = "hdaorb34i5br2pje23rb1sjkmHO22LOIJ";

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://mascasteel:Obnyf0OR9wfPxpdc@cluster1.ayf8d5x.mongodb.net/actions?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log("connection start")).catch((error) => console.log(error.message));

// add user
app.post("/insert", async (req, res) => {
    const { userid, password, designation } = req.body.insert;
    const encryptPassword = await bcrypt.hash(password, 10);

    try {
        const preuser = await accessmodel.findOne({ user_ID: userid });
        console.log(preuser);

        if (preuser) {
            res.send("User is already present");
        } else {
            const actions = new accessmodel({ user_ID: userid, password_ID: encryptPassword, designation_ID: designation });
            await actions.save();
            res.send("New user added");
            console.log(actions);
        }
    } catch (err) {
        console.log(err);
    };
});

//sign in verification/authentication
app.get("/singinauthentication", async (req, res) => {
    const { username, password } = req.body.response
    console.log(username, password);
    try {
        const preverification = await accessmodel.findOne({ user_ID: username });
        console.log(preverification);

        if (!preverification) {
            res.send("User is not present in DB");
        } else {
            await bcrypt.compare(password_ID, preverification.password);
            const token = jwt.sign({}, JWT_SECTRET);
            res.send("Verifiaction successfully");
        }

    } catch (err) {
        res.send("Error");
    }
});

//user login info
app.post("/", async (req, res) => {
    const token = req.body;
    try {
        const authlogin = jwt.verify(token, JWT_SECTRET);
        const authget = authlogin.userid;
        authlogin.findOne({ userid: authget });
        res.send("token success");
    } catch (err) {
        res.send("Error2");
    }
});

//get user data to display in table
app.get("/retrieve", async (req, res) => {
    accessmodel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    });
});

// delete user on ttable button
app.delete("/delete/:id", async (req, res) => {
    const iduser = req.params.ida
    console.log(iduser)

    try {
        const deleteuser = await accessmodel.findByIdAndDelete({ _id: iduser });
        console.log(deleteuser);
        res.send("User deleted successfully");
    } catch (err) {
        res.send("Error");
    };
});

// edit user on table button
app.put("/update", async (req, res) => {
    const { id } = req.body.id
    const { userid, password, designation } = req.body.newaccounts
    console.log(id)
    try {
        const edituser = await accessmodel.findByIdAndUpdate({ _id: id }, { user_ID: userid, password_ID: password, designation_ID: designation });
        console.log(edituser);
        res.send("User update successfully");
    } catch (err) {
        res.send("Error");
    }
});

app.listen(3001, () => {
    console.log("server running on port 3001");
}); 