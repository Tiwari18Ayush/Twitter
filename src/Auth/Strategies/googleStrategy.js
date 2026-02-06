const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../../models/User');
const jwt = require('../../utils/common/JWT');

//Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            email,
            googleId: profile.id,
            username: profile.displayName
          });
        }

        const token = jwt.generateToken({ id: user._id });
        
        // Pass the token (or user object) to the next phase
        return done(null, { user, token });

      } catch (error) {
        // This is crucial: Passing the error to 'done' 
        // allows Passport to handle the failure.
        return done(error, null);
      }
    }
  )
);
module.exports = passport;