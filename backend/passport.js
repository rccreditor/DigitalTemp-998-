const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const User = require("./models/User"); // Adjust path if needed

passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: "/api/auth/linkedin/callback",
    scope: ['email', 'profile', 'openid'],
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ linkedinId: profile.id });

        if (!user) {
            user = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                linkedinId: profile.id,
                avatar: profile.photos[0]?.value,
            });
        }

        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
});
