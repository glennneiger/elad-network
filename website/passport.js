var localStrategy = require('passport-local').Strategy
var User = require('./models/user')
var bcrypt = require('bcrypt-nodejs')

function comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = function (passport) {
    passport.serializeUser(function(user, done) {
        done(null, user)
    })

    passport.deserializeUser(function(user, done) {
        done(null, user)
    })

    passport.use(new localStrategy(function(username, password, done) {
        User.findOne({
            username: username
        }, function(error, doc) {
            if(error) {
                console.log('There was an error retrieving user from database')
                done(error)
            } else {
                if(doc) {
                    // user found
                    if(comparePassword(password, doc.password)) {
                        console.log('Password is valid! Login successful')
                        done(null, {
                            username: doc.username,
                            password: doc.password
                        })
                    } else {
                        console.log('Password + ' + password + ' is not valid')
                        done(null, false)
                    }
                } else {
                    console.log('Document not present in database')
                    done(null, false)
                }
            }
        })
    }))
}