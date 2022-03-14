const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const salt_rounds = parseInt(process.env.SALT_ROUNDS) || 10;
const {User} = require("../../models/userModel.js");
const crypto = require("crypto");

// const PASSWORD_LENGTH = 18;
// const LOWERCASE_ALPHABET = "abcdefghijklmnopqrtsuvwxyz";
// const UPPERCASE_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// const NUMBERS = "0123456789";
// const SYMBOLS = ",./<>?;'\":[]\\|}{=-_+`~!@#$%^&*()"; 
// const ALPHANUMERIC_CHARS = LOWERCASE_ALPHABET + UPPERCASE_ALPHABET + NUMBERS; 
// const ALL_CHARS = ALPHANUMERIC_CHARS + SYMBOLS; 

// function generateRandomPassword(length, alphabet){
//     var rb = crypto.randomBytes(length);
//     var rp = "";
//     for (var i=0;i<length;i++)
//         rb[i] = rb[i] % alphabet.length;
//         rp += alphabet[rb[i]];
//     }
//     return rp;
// }

const generateAccessToken = function generateAccessToken(data){
    const token = jwt.sign(data,process.env.JWT_SECRET_KEY, {expiresIn: process.env.TOKEN_LIFE});
    return token;
};

const register = function (req,res){
    User.findOne({email: req.body.email},(err,user)=>{
        if(err){
            res.status(500).send("Internal server error");
        }else if(user){
            res.status(400).send("Email already exists");
        }else{
            bcrypt.hash(req.body.password,salt_rounds,(err_hash,hashPassword)=>{
                if(err_hash){
                    res.status(500).send("Internal server error");
                }else{
                    const user = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: hashPassword,
                        role: req.body.role,
                    });

                    user.save(err_save =>{
                        if(err_save){
                            res.status(500).send("Internal server error");
                        }else{
                            res.end();
                        }
                    });
                }
            });
        }
    });
};

const login = function (req,res){
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email},(err,foundUser)=>{
        if(err){
            res.status(500).send("Internal server error");
        }else{
            if(foundUser) {
                bcrypt.compare(password,foundUser.password,(err_cmp, result)=>{
                    if(err_cmp){
                        res.status(500).send("Internal server error"); 
                    }else if(result){
                        const accessToken= generateAccessToken({email:email});
                        res.send({email: email,accessToken: accessToken});
                    }else{
                        res.status(401).send("Please provide valid password.");
                    }
                });
            }else{
                res.status(401).send("Please provide valid email or password.");
            }
        }
    });
};

const verify = function (req,res){
    res.send(req.currentEmail);
};

module.exports={
    register,
    login,
    verify
};