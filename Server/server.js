const express = require('express')
const app = express()
const path = require('path')

const server = require('http').createServer(app)

const io = require('socket.io')(server)

app.get('/', (req, resp) => {
    resp.sendFile(path.resolve('html/battleground.html'))
    console.log(__dirname + '/../index.html')
})
app.use(express.static(path.resolve('assets')))

io.on('connection', (socket) => {
    console.log('Based')
})

server.listen(3000, () => {
    console.log('Started')
})


