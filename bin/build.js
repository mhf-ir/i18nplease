const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');

const calendars = require('../lib/calendars')();
const worldPopulation = require('../lib/worldPopulation');
const direction = require('../lib/direction')();

nunjucks.configure(path.resolve(__dirname, '../templates'));

const html = nunjucks.render('index.jijna2', {
  title: 'Internationalization Please',
  direction,
  worldPopulation: new Intl.NumberFormat().format(worldPopulation),
  calendars,
});


fs.writeFileSync(path.resolve(__dirname, '../docs/index.html'), html);
