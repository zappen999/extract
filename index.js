'use strict';

const floatRegex = /\d+(\.|,)\d+/g;
const hashtagRegex = /\S*#(?:\[[^\]]+\]|\S+)/g;

function float(string) {
  const match = string.match(floatRegex);

  return match ? parseFloat(match[0].replace(',', '.')) : false;
}

function floats(string, first = 0, limit = 0) {
  const matches = string.match(floatRegex);

  if (!matches) {
    return [];
  }

  return matches.map(function(match) {
    return parseFloat(match.replace(',', '.'));
  });
}

function hashtag(string) {
  const matches = string.match(hashtagRegex);

  if (!matches) {
    return false;
  }

  return matches[0];
}

/**
 * Extracts a string between two other strings, matching the first occurrence of
 * 'from', to the first occurrence of 'to'.
 * @param  {string} string String to extract from
 * @param  {string} from   String to match from
 * @param  {string} to     String to match to
 * @return {string}        String that matches
 */
function between(string, from, to) {
  if (from === null) {
    return string.substring(0, string.indexOf(to));
  }

  if (to === null) {
    const fromIndex = string.indexOf(from);

    return string.substring(fromIndex, string.length);
  }

  const fromIndex = string.indexOf(from);
  const toIndex = string.indexOf(to, fromIndex);

  if (fromIndex === -1 || toIndex === -1) {
    return false;
  }

  return string.substring(fromIndex + from.length, toIndex);
}

/**
 * Extracts all strings between two other strings, matching the first occurrence
 * after the last run, to the closest matching 'to' string.
 * @param  {string} string String to extract from
 * @param  {string} from   String to match from
 * @param  {string} to     String to match to
 * @return {array}         Array of matching strings
 */
function betweenAll(string, from, to) {
  let lastFromIndex = 0;
  let lastToIndex = 0;
  const matches = [];

  while (1) {
    lastFromIndex = string.indexOf(from, lastToIndex);
    lastToIndex = string.indexOf(to, lastToIndex + to.length);

    if (lastFromIndex === -1 || lastToIndex === -1) {
      return matches;
    }

    matches.push(string.substring(lastFromIndex + from.length, lastToIndex));
  }
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

module.exports = {
  float,
  floats,
  between,
  betweenAll,
  capitalize,
  toTitleCase,
  hashtag
};
