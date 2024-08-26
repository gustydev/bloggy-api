require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('passport');
const createError = require('http-errors');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
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

app.use('/api/v1/posts', postRouter)
app.use('/api/v1/comments', commentRouter)
app.use('/api/v1/user', userRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
  
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
      error: {
          message,
          statusCode,
          stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
      }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`App listening on port ${port}`)})
