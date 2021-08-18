import { check } from 'meteor/check';
import { messagesCollection } from '/imports/db/appCollections';
import { roomsCollection } from '../db/appCollections';
import { Accounts } from 'meteor/accounts-base'; 
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'send.message'(from, to, message){
    check(from, {
      user: String,
      firstname: String,
      lastname: String
    });

    check(to, {
      user: String,
      firstname: String,
      lastname: String
    });

    check(message, String)

    messagesCollection.insert({
      from,
      to,
      message,
      read : false,
      createdAt: new Date()
    }, (err, result) => {
      if(err){
        console.log(err)
      }
    })
  },

  'send.group_message'(roomId, from, message){
  
    check(message, String)

    messagesCollection.insert({
      from,
      roomId,
      message,
      read : false,
      createdAt: new Date()
    }, (err, result) => {
      if(err){
        console.log(err)
      }
    })
  }


  
})