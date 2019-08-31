const { PubSub, withFilter   } = require('apollo-server');
const pubsub = new PubSub();
let books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

let MESSAGES = [
  {
    messageId: 1,
    senderId: 1,
    receiverId: 2,
    content: "Sample Message # 1"
  },
  {
    messageId: 2,
    senderId: 1,
    receiverId: 2,
    content: "Sample Message # 2"
  },
  {
    messageId: 3,
    senderId: 1,
    receiverId: 2,
    content: "Sample Message # 3"
  }
];
const resolvers = {
  Query: {
    books: () => books,
    messages: () => MESSAGES,
    message: (_, args, context) => {
      console.log("args is : ", args)
      return MESSAGES.filter(msg => msg.messageId == args.id)[0]
    }
  },
  Mutation: {
    addMessage: (_, args, context) => {
      let newMessage = {
        messageId: Math.floor(Math.random()*100),
        receiverId: args.receiver,
        senderId: args.sender,
        content: args.content
      }
      MESSAGES.push(newMessage)
      pubsub.publish("MESSAGE_ADDED", { messageAdded: newMessage});
      return newMessage
    }
  },
  Subscription: {
    messageAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(["MESSAGE_ADDED"]),
        (payload, variables) => payload.messageAdded.receiverId == variables.receiver
      ) 
    }
  }
};

module.exports = resolvers;
