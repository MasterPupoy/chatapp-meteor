import { Meteor } from 'meteor/meteor';
import { roomsCollection } from '../db/appCollections';

Meteor.publish('rooms', function getRooms(){
  return roomsCollection.find({ deleted : false })
})

