const mongodb = require('mongodb')
const connectionString = 'mongodb+srv://event:58G1FNCcXUTSOXWn@cluster0-uwenp.mongodb.net/event?retryWrites=true&w=majority'


mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    module.exports = client.db()
    const app = require('./app')
    app.listen(3000)
  })

//   2ag9GwoikBpBzw69


//   HjzQ5Wp8enAt3NGD

//   xf7gEHAzcf3zZNPW
// dnHZDjrBOPl7bO4n

// 58G1FNCcXUTSOXWn