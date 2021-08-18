import { Mongo } from 'meteor/mongo';

export const usersCollection = new Mongo.Collection('user');
export const messagesCollection = new Mongo.Collection('messages');
export const roomsCollection = new Mongo.Collection('rooms');

/*

userId : _id
firstname : 
lastname :
password :
admin : boolean

messageId : _id
from : {
  user : userId,
  firstname : firstname,
  lastname: lastname
}
to: {
  user: userId
}
message : 
roomId : roomId

roomId : _id
participants: [
 {
    user : userId,
    firstname : ,
    lastname: 
 } 
]
ban : [
  {
    user : userId,
    firstname : ,
    lastname: 
 } 
],
master: userid
password : 
deleted : boolean


*/