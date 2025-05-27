const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'swagger-ui.html'));
});

app.listen(port, () => {
    console.log(`Swagger UI is available at http://localhost:${port}`);
    console.log(`OpenAPI specification is available at http://localhost:${port}/openapi.yaml`);
}); 