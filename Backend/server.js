const http = require('http');
const app = require('./app');

const normalizePort = val => {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		return val;
	}
	if (port >= 0) {
		return port;
	}
	return false;
};
const port = normalizePort(process.env.PORT ||'5678');
app.set('port', port);

const errorHandler = error => {
	if (error.syscall !== 'listen') {
		throw error;
	}
	const address = server.address();
	const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges.');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use.');
			process.exit(1);
			break;
		default:
			throw error;
	}
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
	const address = server.address();
	const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
	console.log('Listening on ' + bind);
});

server.listen(port);

// Remplacez l'URL par l'URL réelle de l'API que vous souhaitez interroger
const apiUrl = "http://localhost:5678/api/works";

// Utilisation de la fonction fetch pour interroger l'API
fetch(apiUrl)
  .then(response => {
    // Vérifiez si la réponse HTTP est réussie (statut 200)
    if (!response.ok) {
      throw new Error(`Erreur HTTP! Statut : ${response.status}`);
    }
    return response.json(); // Parse la réponse en tant qu'objet JSON
  })
  .then(data => {
    // Les données des projets de l'architecte sont dans la variable "data"
    console.log("Projets de l'architecte :", data);
    // Vous pouvez traiter les données ici, par exemple les afficher dans votre application
  })
  .catch(error => {
    console.error("Une erreur s'est produite :", error);
  });


