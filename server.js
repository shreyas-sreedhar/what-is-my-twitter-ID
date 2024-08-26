var express = require('express')
var app = express()

const port = 3000;

let counter = 0
app.use(express.static('public'));

app.get('/api/counter', function (req, res) {
    counter++;
    res.send(String(counter));
  })

    

app.listen(port, () =>{
    console.log(`server up at http://localhost:${port}`);

})