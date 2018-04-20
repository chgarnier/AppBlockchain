//SPDX-License-Identifier: Apache-2.0

var med = require('./controller.js');

module.exports = function(app){

  app.get('/get_med/:id', function(req, res){
    med.get_med(req, res);
  });
  app.get('/add_med/:med', function(req, res){
    med.add_med(req, res);
  });
  app.get('/get_all_med', function(req, res){
    med.get_all_med(req, res);
  });
  app.get('/change_med_owner/:medowner', function(req, res){
    med.change_med_owner(req, res);
  })
  app.get('/delete_med/:id_del', function(req, res){
    med.delete_med(req, res);
  })

}
