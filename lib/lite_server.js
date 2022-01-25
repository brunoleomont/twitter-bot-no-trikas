const TwitterLite = require('twitter-lite')

// an authenticated client for the bot user
const user = new TwitterLite({
  subdomain: "api",
  version: "2",
  access_token_key: process.env.BOT_ACCESS_TOKEN,
  access_token_secret: process.env.BOT_ACCESS_SECRET,
  consumer_key: process.env.BOT_CONSUMER_KEY,
  consumer_secret: process.env.BOT_CONSUMER_SECRET,
  bearer_token: process.env.BOT_BEARER_TOKEN
})

async function main() {
  user
  .getRequestToken("https://api.twitter.com/oauth/access_token")
  .then(res =>
    console.log({
      reqTkn: res.oauth_token,
      reqTknSecret: res.oauth_token_secret
    })
  )
  .catch(console.error);

  user
    .get("account/verify_credentials")
    .then(results => {
      console.log("results", results);
    })
    .catch(console.error);
}
main()