const express = require('express');
const bodyParser=require('body-parser');
const{User}=require('./models');
const PORT= process.env.PORT || 3000
const app=express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send({message:'Server on'})
})

app.post('/api/v1/create/user',(req,res)=>{
    console.log(req.body);
    const{nombre,apellido,email,genre,fotoPerfil,birthdate}=req.body
    const newUser= User({
        nombre,apellido,email,genre,fotoPerfil,birthdate
    })
    console.log(newUser)
    newUser.save((err,user)=>{
        console.log(err)
        err
        ? res.status(400).send(err)
        : res.status(201).send(user)
    })
})

app.get('/api/v1/user',(req,res)=>{
    User.find({is_active:true}).exec()
    .then((users)=>{
        res.send(users)
    })
    .catch((err)=>{
        res.status(409).send(err)
    })
})

app.get('/api/v1/user/:uid',(req,res)=>{

    User.find(req.params.uid).exec()
    .then((user)=>{
        res.send(user)
    })
    .catch((err)=>{
        res.status(409).send(err)
    })
})

app.post('/api/v1/create-post/user/:idUser',(req,res)=>{
    const{idUser}=req.params
    User.findByIdAndUpdate(idUser,
        {$push:{publicacion:[req.body]}},
        {new:true}).exec()
        .then((newUser)=>{
            res.status(201).send(newUser);
        })
        .catch((err)=>{
            res.status(409).send(err);
        })
})

app.post('/api/v1/create-comment/user/:idUser/post/:idPost',(req,res)=>{
    const{idPost}=req.params
    const{idUser}=req.params
    User.findByIdAndUpdate({'_id':idUser,'publicacion._id':idPost},
        {$push:{"publicacion.$[].comment":[req.body]}},
        {new:true}).exec()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            res.status(400).send(err)
        })
})


app.listen(PORT,()=>{
    console.log(`Serve on port ${PORT}`);
})