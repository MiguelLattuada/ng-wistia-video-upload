var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use('/demo', express.static('demo'))
app.use('/dist', express.static('dist'));
app.use('/vendors', express.static('demo/vendors'))

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/demo/index.html');
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});