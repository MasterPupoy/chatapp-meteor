import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { usersCollection, messagesCollection, roomsCollection } from '/imports/db/appCollections';
import '/imports/api/usersMethod';
import '/imports/api/messageMethod';
import '/imports/api/roomsMethod';
import '/imports/api/messagePub';
import '/imports/api/usersPub';
import '/imports/api/roomsPub';

Meteor.startup(() => {



});
