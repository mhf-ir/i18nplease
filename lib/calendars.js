const localeCode = require('locale-code');

const calendarPreferenceData = require('cldr-core/supplemental/calendarPreferenceData.json').supplemental.calendarPreferenceData;
const territoryInfo = require('cldr-core/supplemental/territoryInfo.json').supplemental.territoryInfo;

const worldPopulation = require('./worldPopulation');

const out = () => {
  const result = {
    totalDiff: 0,
    totalPercent: 0,
    teritories: [],
  };

  Object.keys(calendarPreferenceData).forEach((teritory) => {
    const calendars = calendarPreferenceData[teritory].split(' ');
    if (calendars.length > 1) {
      result.teritories.push({
        teritory,
        countryName: localeCode.getCountryName('en-' + teritory),
        population: territoryInfo[teritory]._population,
        populationFormat: Intl.NumberFormat().format(territoryInfo[teritory]._population),
        populationPercent: (territoryInfo[teritory]._population / worldPopulation * 100),
        calendars: calendarPreferenceData[teritory].split(' '),
      });
      result.totalDiff += parseInt(territoryInfo[teritory]._population, 10);
    }
  });

  result.totalPercent += Math.round(result.totalDiff / worldPopulation * 100);
  result.totalFormat = Intl.NumberFormat().format(result.totalDiff);

  return result;
};

module.exports = out;
