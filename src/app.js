const express = require('express');
const app = express();
const PORT = 3000;
const routes = require('./routes/routes')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use('/', routes)


app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`)
});