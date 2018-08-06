#!/usr/bin/env node

const program = require('commander');
const appid = require('appid');
const fs = require('fs');

program
  .version('0.0.1')
  .description('A VirtualBox manager to download and play Steam and later non-Steam games on Linux and MacOS');

program
  .command('steam')
  .alias('s')
  .description('Load a game through steam')
  .option('-i, --steamid <id>', 'Load a game by it\'s SteamID')
  .option('-g, --game <name>', "Load a game by it's Name")
  .action(options => {
    if (options.steamid) loadById(options.steamid);
    else if (options.game) loadByName(options.game);
  });

function loadById(id) {
  //  check if id is valid
  appid(parseInt(id)).then(game => {
    if (game) { // id is valid
      startGame(game);
    }
  });
}

function loadByName(name) {
  // check if game exists
  appid(name).then(game => {
    if (game) startGame(game);
  })
}

function startGame(game) {
  console.log(`Loading Steam game ${game.name}`);
}

program.parse(process.argv);
