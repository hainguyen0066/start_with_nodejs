const express = require('express');
const router = express.Router();

// load model
const Post = require('../models/Post');

// hien thi tat ca bai biet
router.get('/', async (req, res) => {
    const posts = await Post.find().lean().sort({ date: -1});

    res.render('posts/index', {posts});
})


// hien thi form add
router.get('/add', (req, res) => {
    res.render('posts/add')
})
// them bai viet
router.post('/', async(req, res) => {
    const {title, text} = req.body;
    errors = [];

    if(!title) errors.push({ msg: 'title require'});
    if(!text) errors.push({ msg: 'text require'});
    if (errors.length > 0) {
        res.render('posts/add', {errors, title, text})
    } else {
        const newPostData = {
            title,
            text
        }

        const newPost = new Post(newPostData);
        await newPost.save();

        res.redirect('/posts')
    }
})

// Hien thi form de nguoi dung thay doi bai viet
router.get('/edit/:id', async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id }).lean()
    res.render('posts/edit', { post })
})

// cap nhat thay doi co so du lieu

router.put('/:id', async(req, res) => {
    const {title, text} = req.body;
    await Post.findByIdAndUpdate({_id: req.params.id }, {title, text});
    res.redirect('/posts');
})

router.delete('/:id', async(req, res) => {
    await Post.findOneAndRemove({_id: req.params.id });
    res.redirect('/posts');
})

module.exports = router;