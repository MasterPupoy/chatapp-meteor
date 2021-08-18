import { check } from 'meteor/check';
import { messagesCollection } from '/imports/db/appCollections';
import { roomsCollection } from '../db/appCollections';
import { Accounts } from 'meteor/accounts-base'; 
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'create.room'(name, members){

    check(name, String);
    check(members, Array);

    roomsCollection.insert({
      master : Meteor.userId(),
      room_name: name,
      participants : members
      ,
      deleted : false,
      createdAt: new Date()
    }, (err, result) => {
      if(err){
        console.log(err)
      }
    })
  },

  'add.participant'(participants, roomId){
    
    roomsCollection.update({ _id : roomId }, {
      $push : {
        participants : {
          $each : [ 
            participants
          ]
        }
      }
    })
  },

  'kick.participant'(participant, roomId){
    console.log(participant, roomId)
    roomsCollection.update({ _id : roomId }, {
      $pull : {
        participants: {
          _id : participant._id
        }
      }
    })
  },

  'delete.room'(roomId){
    console.log(roomId)
    roomsCollection.update({ _id : roomId }, {
      $set : {
        deleted : true
      }
    })
  },
  
})

console.log(Meteor.methods)