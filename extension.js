class DiscordWebhook {
  getInfo() {
    return {
      id: 'discordWebhook',
      name: 'Discord Webhook',
      // Discord Blurple Color
      color1: '#5865F2', 
      blocks: [
        {
          opcode: 'sendWebhook',
          blockType: Scratch.BlockType.COMMAND,
          text: 'send [MESSAGE] to webhook [URL]',
          arguments: {
            MESSAGE: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'poopoo test',
            },
            URL: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://discord.com/api/webhooks/...',
            },
          },
        },
      ],
    };
  }

  /**
   * Implementation of the sendWebhook block.
   * @param {object} args - The arguments passed from the block.
   */
  sendWebhook(args) {
    const message = String(args.MESSAGE);
    const url = String(args.URL);

    // Basic check to ensure it's a valid Discord link
    if (!url.startsWith('https://discord.com/api/webhooks/')) {
      console.error('Invalid Discord Webhook URL provided.');
      return;
    }

    // This handles the POST request correctly so you don't get 400 errors
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: message,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.error('Webhook failed with status:', response.status);
        }
      })
      .catch((err) => {
        console.error('Network error while sending webhook:', err);
      });
  }
}

// Register the extension to Gandi/Scratch
Scratch.extensions.register(new DiscordWebhook());
