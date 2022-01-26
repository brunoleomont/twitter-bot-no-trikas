const Twit = require('twit')
// Constante que guarda as funções da lib do Twitter
require('dotenv').config()

// Configuração das variáveis de ambiente
const Bot = new Twit({
    consumer_key: process.env.BOT_CONSUMER_KEY,
    consumer_secret: process.env.BOT_CONSUMER_SECRET,
    access_token: process.env.BOT_ACCESS_TOKEN,
    access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000
});

function BotInit() {
    var query = {
        //Aqui vai o que você quer buscar
        q: "trikas",
        result_type: "recent"
    }
    // Este método busca os tweets mais recentes baseado na sua query
    Bot.get('search/tweets', query, BotGotLatestTweet);
    function BotGotLatestTweet(error, data, response) {
        if (error) {
            console.log('Bot could not find latest tweet, : ' + error);
        } else if (data.statuses.length > 0){
            data.statuses.forEach(element => {
                const params = {
                    status: '@'+element.user.screen_name + ' É TRICOLOR DO MORUMBI!!!!',
                    in_reply_to_status_id: element.id_str,
                    auto_populate_reply_metadata: true
                }
                // Neste método será respondido o tweet localizado
                Bot.post('statuses/update', params, BotRetweeted);
                function BotRetweeted(error, response) {
                    if (error) {
                        console.log('Bot could not reply, : ' + error);
                    } else {
                        console.log('Bot reply : ' + params.in_reply_to_status_id);
                    }
                }
            });
            // Neste método será retweetado o tweet localizado
            // Bot.post('statuses/retweet/:id', id, BotRetweeted);
            // function BotRetweeted(error, response) {
            //     if (error) {
            //         console.log('Bot could not reply, : ' + error);
            //     } else {
            //         console.log('Bot reply : ' + id.id);
            //     }
            // }
        }
    }
}
setInterval(BotInit, 30*60*1000);

BotInit();
