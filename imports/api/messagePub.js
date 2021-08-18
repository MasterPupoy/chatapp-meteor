import { Meteor } from 'meteor/meteor';
import { messagesCollection} from '/imports/db/appCollections';
import { roomsCollection } from '/imports/db/appCollections';

Meteor.publish('messages', function getMessages(){ 
  return messagesCollection.find({    
    'from.user': Meteor.userId()
  })
});

Meteor.publish('received', function getReceived(){
  return messagesCollection.find({
    'to.user': Meteor.userId()
  })
})

Meteor.publish('group_messages', function getGroupMessage(room){
  return messagesCollection.find({
    'roomId' : room._id
  })
})
