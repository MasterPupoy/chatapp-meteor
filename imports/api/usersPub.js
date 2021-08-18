import { Meteor } from 'meteor/meteor';

Meteor.publish('users', function sendUsers(){
  return Meteor.users.find({});
})