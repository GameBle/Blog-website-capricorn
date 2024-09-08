const express = require('express');
const { createBlog, fetchBlog, fetchUserBlogs, fetchABlog, likeBlog,acceptBlog,rejectBlog } = require('../controllers/blogControllers');

const router = express.Router();

router.get('/fetch',fetchBlog);
router.post('/accept',acceptBlog);
router.post('/reject',rejectBlog);
router.post('/create',createBlog);
router.post('/fetchUser',fetchUserBlogs);
router.post('/fetchablog',fetchABlog);
router.post('/like',likeBlog);

module.exports = router;