(function (Scratch) {
  'use strict';
  class DiscordWebhook {
    getInfo() {
      return {
        id: 'discordwebhook',
        name: 'Discord Webhook',
        blocks: [
          {
            opcode: 'sendWebhook',
            blockType: Scratch.BlockType.COMMAND,
            text: 'send [TEXT] to webhook [URL]',
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello from Scratch!' },
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: 'YOUR_WEBHOOK_URL' }
            }
          }
        ]
      };
    }
    sendWebhook(args) {
      fetch(args.URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: args.TEXT })
      });
    }
  }
  Scratch.extensions.register(new DiscordWebhook());
})(Scratch);
