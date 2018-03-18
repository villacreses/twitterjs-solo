const _ = require('lodash');

var data = [];

module.exports = {
  add: function (name, content) {
    data.push({name: name, content: content, id: data.length});
    return _.clone(data[data.length -1]);
  },

  list: function () {
    return _.cloneDeep(data);
  },

  find: function (properties) {
    return _.cloneDeep(_.filter(data, properties));
  }
  
};

// ============================================================================
// Fake tweets generated below

const randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getFakeName = function(i) {
  const fakeFirsts = ['Nimit', 'David', 'Shanna', 'Emily', 'Scott', 'Karen', 'Ben', 'Dan', 'Ashi', 'Kate', 'Omri', 'Gabriel', 'Joe', 'Geoff'];
  const fakeLasts = ['Hashington', 'Stackson', 'McQueue', 'OLogn', 'Ternary', 'Claujure', 'Dunderproto', 'Binder', 'Docsreader', 'Ecma'];
  return fakeFirsts[i] + " " + fakeLasts[i];
};

const getFakeTweet = function() {
  const awesome_adj = ['awesome', 'breathtaking', 'amazing', 'funny', 'sweet', 'cool', 'wonderful', 'mindblowing', 'impressive'];
  return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};

for (let i = 0; i < 10; i++) {
  module.exports.add( getFakeName(i), getFakeTweet(i) );
}
