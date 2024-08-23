require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const prisma = require('./prisma/client');
const postRouter = require('./routes/post')
const commentRouter = require('./routes/comment')
const userRouter = require('./routes/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
};

passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        const user = await prisma.user.findUnique({where: {id: payload.id}})
        if (user) {
            return done(null, true)
        }
      } catch (error) {
        return done(error);
      }
    })
);

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