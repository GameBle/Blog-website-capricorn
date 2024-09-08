const asyncHandler = require('express-async-handler');
const Blog = require('../model/blogSchema');


const fetchBlog = asyncHandler(async(req,res)=>{
    const{userId} = req.body;
    var blogs
    if(!userId){
        blogs = await Blog.find();
    }
    else{
        blogs = await Blog.find({created:userId});
    }
    if(blogs){
        res.status(201).json(blogs.reverse());
    }
    else{
        throw new Error ('error')
    }
})

const acceptBlog = asyncHandler(async(req,res)=>{
    const {blogId} = req.body;

     if(!blogId){
        throw new Error("No blogid found");
     }

     const blog = await Blog.findOneAndUpdate({_id:blogId},{status:'approved'},{upsert:true});
     console.log(blog)

    if(blog){
        res.status(201).json(blog);
    }
    else{
        throw new Error ('error')
    }

})

const rejectBlog = asyncHandler(async(req,res)=>{
    const {blogId} = req.body;

     if(!blogId){
        throw new Error("No blogid found");
     }

     const blog = await Blog.findOneAndUpdate({_id:blogId},{status:'rejected'},{upsert:true});

    console.log("blog is",blog);

    if(blog){
        res.status(201).json(blog);
    }
    else{
        throw new Error ('error')
    }

})

const createBlog = asyncHandler(async(req,res)=>{
    const {heading,content,caption,created,img} = req.body;
    const tags = [{
        tagName:'Tag1'
    }]
    console.log(img)
    const blog = await Blog.create({
        heading,
        content,
        caption,
        created,
        tags,
        img,
    })
    if(blog){
        res.status(201).json(blog);
    }
    else{
        throw new Error ('error');
    }
})
const fetchUserBlogs = asyncHandler(async(req,res)=>{
    const{userId} = req.body;
    if(!userId){
        res.status(400);
    }  
    const blogs = await Blog.find({created:userId})
    if(blogs){
        res.status(201).json(blogs.reverse())
    } 
    else{
        throw new Error ('error');
    }
})
const fetchABlog = asyncHandler(async(req,res)=>{
    const {blogId} = req.body;
    if(blogId==='xplore'){
        return;
    }
    if(!blogId){
        res.status(404);
    }
    const blog = await Blog.findOne({_id:blogId});
    if(blog){
        res.status(201).json(blog)
    }
    else{
        throw new Error ('error')
    }
})
const likeBlog = asyncHandler(async(req,res)=>{
    const {email,blogId} = req.body;
    const blog = await Blog.findOne({_id:blogId});
    if(blog){
        if(blog.likes.find((item)=>{return item.user==email})){
            const arr  = blog.likes.filter((item)=>{return item.user != email});
            // console.log(arr);
            const newBlog = await Blog.findOneAndUpdate({_id:blogId},{likes:arr});
            if(newBlog){
                res.status(201).json(newBlog);
            }
            else{
                res.status(500);
            }
        }
        else{
            const arr = [...blog.likes];
            arr.push({
                user:email,
            });
            // console.log(arr);
            const likedBlog = await Blog.findOneAndUpdate({_id:blogId},{likes:arr});
            if(likedBlog){

                res.status(201).json(likedBlog)
            }
            else{
                res.status(500);
            }
        }
    }

})
module.exports = {fetchBlog,createBlog,fetchUserBlogs,fetchABlog,likeBlog,acceptBlog,rejectBlog}