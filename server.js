var express = require('express');

var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.sendfile('./public/index.html');
})



app.listen(3000, function (err) {
	if (err) return console.log('Hubo un error'), process.exit(1);

	console.log('Buscaminas escuchando en el puerto 3000')
})