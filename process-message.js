const Dialogflow = require('dialogflow');
const Pusher = require('pusher');
//const getWeatherInfo = require('./weather');


const projectId = 'xxxx';
const sessionId = 'xxxxx';
const languageCode = 'xxxxx';

const config = {
  credentials: {
    private_key: 'xxxx',
    client_email: 'xxxxx',
  },
};

const pusher = new Pusher({
  appId: 'xxxx',
  key: 'xxxx',
  secret: 'xxxx',
  cluster: 'xxxx',
  encrypted: true,
});

const sessionClient = new Dialogflow.SessionsClient(config);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const processMessage = message => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode,
      },
    },
  };

  sessionClient
    .detectIntent(request)
    .then(responses => {
      const result = responses[0].queryResult;
      return pusher.trigger('bot', 'bot-response', {
        message: result.fulfillmentText,
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
};

module.exports = processMessage;
