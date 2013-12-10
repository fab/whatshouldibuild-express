
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'What Should I Build?' });
};
