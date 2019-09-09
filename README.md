@oauth-everything/passport-picarto
=====================================

A [Passport](http://passportjs.org/) strategy for authenticating with
[Picarto](https://www.picarto.tv/) using OAuth 2.0 and the Picarto API.

This module lets you authenticate using Picarto in your Node.js applications.
By plugging into Passport, Picarto authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](https://www.senchalabs.org/connect/)-style middleware, including
[Express](https://expressjs.com/).

## Install

```bash
$ npm install @oauth-everything/passport-picarto
```
#### Configure Strategy

The Picarto authentication strategy authenticates users using a Picarto
account and OAuth 2.0 tokens.  The app ID and secret obtained when creating an
application are supplied as options when creating the strategy.  The strategy
also requires a `verify` callback, which receives the access token and optional
refresh token, as well as `profile` which contains the authenticated user's
Picarto profile.  The `verify` callback must call `cb` providing a user to
complete authentication.

```ts
passport.use(new Strategy(
    {
        clientID: PICARTO_APP_ID,
        clientSecret: PICARTO_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/picarto/callback"
    },
    (accessToken: string, refreshToken: string, profile: Profile, cb: VerifyCallback<User>) => {

        User.findOrCreate({ picartoId: profile.id }, (err: Error, user: User) => {
            return cb(err, user);
        });
    }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'picarto'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```javascript
app.get('/auth/picarto',
  passport.authenticate('picarto'));

app.get('/auth/picarto/callback',
  passport.authenticate('picarto', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```

## License

[The MPL v2 License](https://opensource.org/licenses/MPL-2.0)
