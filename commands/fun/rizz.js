const { log } = require('../../utils/logger.js')

module.exports = {
  name: 'rizz',
  aliases: ['pickup', 'flirt'],
  execute(message, args) {
    message.delete();

    const mentionedUser = message.mentions.users.first();
    const userToSendLine = mentionedUser || message.author;

    const pickupLines = [
      "Are you a magician? Because whenever I look at you, everyone else disappears.",
      "Do you have a name, or can I call you mine?",
      "If beauty were time, you’d be an eternity.",
      "Are you a parking ticket? Because you’ve got FINE written all over you.",
      "I must be a snowflake, because I've fallen for you.",
      "Do you have a Band-Aid? Because I just scraped my knee falling for you.",
      "Are you French? Because Eiffel for you.",
      "Is your dad a boxer? Because you’re a knockout!",
      "Are you a beaver? Because daaaaam!",
      "Do you have a map? Because I just got lost in your eyes.",
      "If you were a triangle, you’d be acute one.",
      "Do you believe in love at first sight, or should I walk by again?",
      "Do you have an eraser? Because I can’t get you out of my mind.",
      "Are you a campfire? Because you’re hot and I want s’more.",
      "If beauty were time, you’d be an eternity.",
      "Are you Wi-Fi? Because I feel a connection.",
      "If I could rearrange the alphabet, I’d put U and I together.",
      "Are you Netflix? Because I could watch you for hours.",
      "Can you lend me a kiss? I promise I’ll give it back.",
      "If you were a library book, I’d check you out.",
      "Is it hot in here, or is it just you?",
      "You must be a bank loan, because you have my interest.",
      "Are you a keyboard? Because you're just my type.",
      "If looks could kill, you'd be a weapon of mass destruction.",
      "Are you Google? Because you have everything I’ve been searching for.",
      "Are you a thief? Because you stole my heart.",
      "Are you the ocean? Because I’m lost at sea.",
      "Are you a light bulb? Because you brighten up my day.",
      "If you were a vegetable, you’d be a cute-cumber.",
      "If you were a fruit, you’d be a fineapple.",
      "Do you have a sunburn, or are you always this hot?",
      "If you were a cat, you’d purr-fect.",
      "Are you a parking ticket? Because you’ve got fine written all over you.",
      "Do you have a pencil? Because I want to erase your past and write our future.",
      "Are you an angel? Because heaven is missing one.",
      "Are you a dictionary? Because you add meaning to my life.",
      "If beauty were a crime, you’d be serving a life sentence.",
      "Are you an alien? Because you just abducted my heart.",
      "Are you a parking ticket? Because you’ve got FINE written all over you.",
      "If you were a library book, I’d check you out.",
      "Is it okay if I follow you home? Because my parents always told me to follow my dreams.",
      "Are you a time traveler? Because I see you in my future.",
      "Do you believe in love at first sight, or should I walk by again?",
      "Is your dad an artist? Because you’re a masterpiece.",
      "Are you a volcano? Because I lava you.",
      "Are you a banana? Because I find you a-peel-ing.",
      "If you were a dessert, you'd be extra sweet.",
      "Are you my phone charger? Because without you, I die.",
      "Do you believe in fate? Because I think we’re meant to be.",
      "Are you a math problem? Because you’re making me feel complex.",
      "Are you made of copper and tellurium? Because you’re Cu-Te.",
      "Are you a snowstorm? Because you’ve left me breathless.",
      "Are you the sun? Because you brighten my world.",
      "Are you a piece of art? Because I could stare at you all day.",
      "Are you a firework? Because you light up my life.",
      "Do you have GPS? Because I’m lost without you.",
      "Are you a diamond? Because you’re priceless.",
      "Are you an elevator? Because you take me to new heights.",
      "Are you a candy bar? Because you’re sweet inside and out.",
      "If you were a puzzle, you'd be the missing piece.",
      "Are you a star? Because you light up my night.",
      "Are you a chef? Because you’re making my heart melt.",
      "Are you a galaxy? Because my world revolves around you.",
      "Are you a forest? Because I'm lost in your eyes.",
      "Are you a rainbow? Because you brighten up my rainy days.",
      "Are you a flower? Because you make my heart bloom.",
      "Are you a sunset? Because you're beautiful and captivating.",
      "Are you a dream? Because you’re too good to be true.",
      "Are you a shooting star? Because I wished for you.",
      "Are you a compass? Because I'd be lost without you.",
      "Are you a poem? Because you’re deep and meaningful.",
      "Are you a star? Because you’re lighting up my life.",
      "Are you a wave? Because you swept me off my feet."
    ];

    const randomLine = pickupLines[Math.floor(Math.random() * pickupLines.length)];
    message.channel.send(`✨ **Rizz Line for ${userToSendLine.username}:** ${randomLine}`);
    log(`Rizz Command has been executed and Result is: ${randomLine}`);
  }
};
