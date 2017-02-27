'use strict';

// all dependencies go here
const express     = require('express');
const bodyParser  = require('body-parser');
const logger      = require('morgan');

const isDev = !('NODE_ENV' in process.env) && require('dotenv').config() && true;

const app = express();
app.set('PORT', process.env.PORT || 3000);

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

const handlebars = require('express-handlebars')
  .create({ defaultLayout: 'main' });

const db = require('./model/dbconnection.js');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


// go get the routes I need for this app
app.use('/zones', require('./routes/zones'));
app.use('/drivers', require('./routes/drivers'));
app.use('/login', require('./routes/login'));


app.get('/', (req, res) => {
  res.render('index');
});

// app.get('/leases/tomato', (req, res) => {
// 	res.send('still onserver')
// })

///////////////////


// app.post('/form', (req, res) => {
//   console.log(`zone: ${req.body.zone_number}; license: ${req.body.price}`);
//   db.none('INSERT INTO leases (zone_number, price, time_limit, plate_state, plate_number, duration, cgnumber) VALUES ($1,$2,$3,$4,$5,$6,$7)', [req.body.zone_number, req.body.price, req.body.time_limit, req.body.plate_state, req.body.plate_number, req.body.duration, req.body.cgnumber]);
//   res.redirect(303, 'success'/*, `/success/${req.body.plate_number}/${req.body.plate_state}`*/);
// });

// app.get('/success', (req, res) => {
//   res.render('success');
// });

// app.get('/success/:plate_number/:plate_state', (req, res) => {
//   const data = db.one(`
//     SELECT
//       zone_number,
//       price,
//       duration
//     FROM leases
//     WHERE plate_number = $/plate_number/
//       AND plate_state = $/plate_state/
//     `, req.params)
//     .then((data) => {
//       var zone = data.zone_number;
//       var price = data.price;
//       var time = data.duration;
//       res.render('success', {zone, price, time});
//     })
// });


// //404
// app.use(function(req, res){
//  res.type('text/plain');
//  res.status(404);
//  res.send('404 - Not Found');
// });
//
// //500
// app.use(function(err, req, res, next){
//  console.error(err.stack);
//  res.type('text/plain');
//  res.status(500);
//  res.send('500 - Server Error');
// });

app.listen(app.get('PORT'), () => {
  console.log(`Express started on http://localhost: ${app.get('PORT')}; press Ctrl-C to terminate.`);
});
