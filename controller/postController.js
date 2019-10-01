const Post = require('../models/Post')

exports.viewCreateScreen = function(req,res){
    res.render('create-post',{username: req.session.user.username, avatar: req.session.user.avatar})
}

exports.create = function(req,res){
    let post = new Post(req.body, req.session.user._id)
    post.create().then(function(){
        res.send("new post created")

    }).catch(function(errors){
        res.send(errors)

    })

}