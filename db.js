const dotenv = require('dotenv')
dotenv.config()

const mongodb = require('mongodb')
//const connectionString = 'mongodb+srv://event:58G1FNCcXUTSOXWn@cluster0-uwenp.mongodb.net/event?retryWrites=true&w=majority'


mongodb.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    module.exports = client
    const app = require('./app')
    app.listen(process.env.PORT)
  })



// 58G1FNCcXUTSOXWn