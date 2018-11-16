const _ = require('lodash');

const localeCode = require('locale-code');
const territoryInfo = require('cldr-core/supplemental/territoryInfo.json').supplemental.territoryInfo;
const availableLocales = require('cldr-core/availableLocales.json').availableLocales.modern;
const defaultContent = require('cldr-core/defaultContent.json').defaultContent;

const worldPopulation = require('./worldPopulation.js');

const out = () => {

  const rtlLanguages = new Set([
    'ae',	/* Avestan */
    'ar',   /* 'العربية', Arabic */
    'arc',  /* Aramaic */
    'bcc',  /* 'بلوچی مکرانی', Southern Balochi */
    'bqi',  /* 'بختياري', Bakthiari */
    'ckb',  /* 'Soranî / کوردی', Sorani */
    'dv',   /* Dhivehi */
    'fa',   /* 'فارسی', Persian */
    'glk',  /* 'گیلکی', Gilaki */
    'he',   /* 'עברית', Hebrew */
    'ku',   /* 'Kurdî / كوردی', Kurdish */
    'mzn',  /* 'مازِرونی', Mazanderani */
    'nqo',  /* N'Ko */
    'pnb',  /* 'پنجابی', Western Punjabi */
    'ps',   /* 'پښتو', Pashto, */
    'sd',   /* 'سنڌي', Sindhi */
    'ug',   /* 'Uyghurche / ئۇيغۇرچە', Uyghur */
    'ur',   /* 'اردو', Urdu */
    'yi',    /* 'ייִדיש', Yiddish */
  ]);

  const result = {
    total: 0,
    totalFormat: 0,
    totalPercent: 0,
    list: {},
  };

  const allLocales = defaultContent.concat(availableLocales);
  allLocales.forEach((locale) => {
    if (localeCode.validate(locale)) {
      const lang = localeCode.getLanguageCode(locale);
      if (rtlLanguages.has(lang)) {
        const country = localeCode.getCountryCode(locale);
        if (
          territoryInfo[country]
          &&
          territoryInfo[country].languagePopulation
          &&
          territoryInfo[country].languagePopulation[lang]
        ) {
          const countryPopulation = parseInt(territoryInfo[country]._population, 10);
          const adData = territoryInfo[country].languagePopulation[lang];
          const populationPercent = parseFloat(adData._populationPercent);
          const number = Math.round(countryPopulation / 100 * populationPercent);

          const worldPercent = (number / worldPopulation * 100).toFixed(3);

          let official = false;
          if (adData._officialStatus && adData._officialStatus === 'official') {
            official = true;
          }

          result.total += number;
          result.list[`${lang}-${country}`] = {
            country,
            countryName: localeCode.getCountryName(locale),
            langName: localeCode.getLanguageName(locale),
            lang,
            countryPopulation,
            countryPopulationFormat: new Intl.NumberFormat().format(countryPopulation),
            populationPercent,
            number,
            numberFormat: new Intl.NumberFormat().format(number),
            official,
            worldPercent,
          };
        }
      }
    }
  });

  result.totalPercent = Math.round(result.total / worldPopulation * 100);
  result.totalFormat = new Intl.NumberFormat().format(result.total);

  result.list = _.orderBy(result.list, ['number'], ['desc']);
  return result;
};

module.exports = out;
