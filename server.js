const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = 80;
const host =  '192.168.100.101';

app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname,'public'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
  res.render('index.html')
});

let messages = [];

io.on('connection', sokect => {
    console.log('usuario conenctado : ' + sokect.id);
    
    sokect.emit('previousMessage', messages);

    sokect.on('sendMessage', data => {
        console.log(data);
        messages.push(data);
        sokect.broadcast.emit('receivedMessage', data);
    })
});

server.listen(port, host, () =>{
    console.log('Servidor rodando: ' + host + ':'+port);
});