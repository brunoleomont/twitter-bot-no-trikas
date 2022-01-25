const got = require('got');
const crypto = require('crypto');
const OAuth = require('oauth-1.0a');
require('dotenv').config()

// The code below sets the consumer key, consumer secret, access token, access token secret and bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export commands below from the terminal:
// export CONSUMER_KEY='YOUR-KEY'
// export CONSUMER_SECRET='YOUR-SECRET'
const consumer_key = process.env.BOT_CONSUMER_KEY;
const consumer_secret = process.env.BOT_CONSUMER_SECRET;
const access_token = process.env.BOT_ACCESS_TOKEN;
const access_token_secret = process.env.BOT_ACCESS_TOKEN_SECRET;
const bearer_token = process.env.BOT_BEARER_TOKEN;


// Be sure to add replace the text of the with the text you wish to Tweet.
// You can also add parameters to post polls, quote Tweets, Tweet with reply settings, and Tweet to Super Followers in addition to other features.
const data = {
  "text": "Hello World!"
};

const endpointURL = `https://api.twitter.com/2/tweets`;

// this example uses access token OAuth to authorize the user
const oauth = OAuth({
  consumer: {
    key: consumer_key,
    secret: consumer_secret,
    bearer_token: bearer_token
  },
  signature_method: 'HMAC-SHA1',
  hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
});

async function getRequest() {

  const token = {
    key: access_token,
    secret: access_token_secret
  };

  const authHeader = oauth.toHeader(oauth.authorize({
    url: endpointURL,
    method: 'POST'
  }, token));

  const req = await got.post(endpointURL, {
    json: data,
    responseType: 'json',
    headers: {
      Authorization: authHeader["Authorization"],
      'user-agent': "v2CreateTweetJS",
      'content-type': "application/json",
      'accept': "application/json"
    }
  });
  if (req.body) {
    return req.body;
  } else {
    throw new Error('Unsuccessful request');
  }
}


(async () => {
  try {
    // Make the request
    const response = await getRequest();
    console.dir(response, {
      depth: null
    });
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
  process.exit();
})();
