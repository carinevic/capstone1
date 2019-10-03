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
  exports.viewSingle = async function(req,res){
    try{
        let post = await  Post.findSingleById(req.params.id, req.visitorId)
        res.render('single-post-screen', {post: post})

    }catch{
        res.render('404')

    }
  }
  exports.viewEditScreen = async function(req,res){
      try{
        let post =  await Post.findSingleById(req.params.id)
       if(post.authorId == req.visitorId){
           res.render("edit-post", {post: post})
       }else{
           req.flash("errors", "you do not have permission to perform that task")
           req.session.save(()=>res.redirect("/"))
       }
        }catch{
            res.render("404")
     }

    }
    exports.edit = function (req, res){
        let post = new Post(req.body, req.visitorId, req.params.id)
        post.update().then((status)=>{
//the post was successfullu updated in the data base
//or user did have permission but there was validation errors
       if(status == "success"){
//post was updated in the db
        req.flash("success", "post successfully updated.")
         req.session.save(function(){
         res.redirect(`/post/${req.params.id}/edit`)
           })
       }else{
           post.errors.forEach(function(error){
               req.flash("error", error)
           })
           req.session.save(function(){
               res.redirect(`/post/${req.params.id}/edit`)
           })
       }

        }).catch(() =>{
            req.flash("errors", "you do not have permission to perform that action.")
            req.session.save(function(){
                res.redirect("/")
            })

        })
    }