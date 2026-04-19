(function(Scratch) {
  'use strict';

  class DiscordWebhook {
    getInfo() {
      return {
        id: 'discordWebhook',
        name: 'Discord Webhook',
        blocks: [
          {
            opcode: 'sendWebhook',
            blockType: Scratch.BlockType.COMMAND,
            text: 'send [MESSAGE] to webhook [URL]',
            arguments: {
              MESSAGE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'poopoo test'
              },
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://discord.com/api/webhooks/...'
              }
            }
          }
        ]
      };
    }

    sendWebhook(args) {
      const message = args.MESSAGE;
      const url = args.URL;

      // This part handles all the formatting for you
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: message
        })
      }).catch(err => {
        console.error('Webhook failed:', err);
      });
    }
  }

  Scratch.extensions.register(new DiscordWebhook());
})(Scratch);
