const { connect, connection } = require('mongoose');

connect('mongodb://localhost/SocialnetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;

