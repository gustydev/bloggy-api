require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const postRouter = require('./routes/post')
const commentRouter = require('./routes/comment')
const userRouter = require('./routes/user');

app.get('/', function (req, res) {
    res.send('Hi there from the index')
})

app.use('/post', postRouter)
app.use('/comment', commentRouter)
app.use('/user', userRouter)

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
//   });
  
// app.use(function(err, req, res, next) {
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//     res.status(err.status || 500);
// });

app.listen(process.env.PORT, () => {console.log(`App listening on port ${process.env.PORT}`)})