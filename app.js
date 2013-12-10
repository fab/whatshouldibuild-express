
/**
 * Module dependencies.
 */

var express = require('express')
var routes = require('./routes')
var http = require('http')
var path = require('path')
var ejs  = require('ejs')
var request = require('request')
var cheerio = require('cheerio')

var app = express()

var projectsURL = 'https://github.com/karan/Projects/blob/master/README-scratch.md'
  , projectsHTML

request(projectsURL, function (err, res, body) {
  projectsHTML = body
})

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler())
}

app.set('getRandomProject', function (callback) {
  $ = cheerio.load(projectsHTML)
  var projects = $('.markdown-body p')
    , randNum = Math.floor(Math.random() * projects.length)
    , project = $(projects)[randNum]
    , title = $(project).find('strong').text()
    , description = $(project).text().slice(title.length + 3)

  callback(title, description)
})

app.get('/', routes.index)
app.get('/suggest', routes.suggest)

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})
