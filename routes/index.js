
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'What Should I Build?' });
};

/*
 * GET project suggestion.
 */

exports.suggest = function (req, res) {
  req.app.get('getRandomProject')(function (title, description) {
    res.render('suggest', { title: title, description: description });
  })
};
