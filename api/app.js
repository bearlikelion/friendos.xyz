const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 9000;

require('dotenv').config();

app.use(cors())

app.get('/', function (req, res, next) {
  const server_ip = process.env.SERVER_IP
  const steam_key = process.env.STEAM_API_KEY

  console.log()
  axios.get("http://api.steampowered.com/IGameServersService/GetServerList/v1/?filter=\\gameaddr\\"+server_ip+"&key="+steam_key)
  .then(function(response) {
    res.json(response.data.response)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.json({msg: "Check console"})
  });
})

app.listen(port, () => {
  console.log(`Friendos API listening at http://localhost:${port}`)
})