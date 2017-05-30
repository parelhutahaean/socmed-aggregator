const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const index = require('./routes/index')
require('dotenv').config();

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', index);

app.listen(app.get('port'), () => {
  console.log('App listen to port ' + app.get('port'));
})
