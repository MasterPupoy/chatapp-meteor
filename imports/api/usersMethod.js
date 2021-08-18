import { check } from 'meteor/check';
import { usersCollection } from '/imports/db/appCollections';
import { Accounts } from 'meteor/accounts-base'; 
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'users.register'(user){
    check(user, {
      username: String,
      firstname: String, 
      lastname: String,
      password: String,
    });

    Accounts.createUser({
      username: user.username.toLowerCase(),
      profile: {
        firstname: user.firstname,
        lastname: user.lastname,
        online: false
      },
      password: user.password
    })
  },

  'users.login'(userId){
    check(userId, String)

    console.log(userId)
    Meteor.users.update({ _id:userId}, 
      {
        $set: {
          'profile.online': true
        }
      }
    )
  },

  'users.logout'(userId){
    check(userId, String)

    console.log(userId)
    Meteor.users.update({ _id:userId}, 
      {
        $set: {
          'profile.online': false
        }
      }
    )
  }

})