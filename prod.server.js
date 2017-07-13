var express = require('express');
var app =express();
var port = 9000;

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Connection",' Keep-alive')
    res.header("X-Powered-By",' 3.2.1')
    //res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 模拟接口
var appData = require("./data.json");
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

var apiRoutes = express.Router();
apiRoutes.get('/seller',function(req, res) {
  res.json({
    errno: 0,
    data: seller 
  }) 
})

apiRoutes.get('/goods',function(req, res) {
  res.json({
    errno: 0,
    data: goods 
  })
})

apiRoutes.get('/ratings',function(req, res) {
  res.json({
    errno: 0,
    data: ratings 
  })
})

app.use('/api', apiRoutes);

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:' + port)
})