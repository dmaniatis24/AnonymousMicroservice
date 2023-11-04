const app=require('./src/app')

//Port
const { API_PORT } = process.env
const port = process.env.PORT || API_PORT

app.listen(port)
console.log('Server Started at ' + port)