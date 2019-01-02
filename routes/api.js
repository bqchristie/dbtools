let router = require('express').Router();              // get an instance of the express Router
let models = require('../model/_registry');

router.get('/', function(req, res) {
    res.json({ message: 'welcome to our api!' });
});

router.get('/:model/:id', function(req, res){
    models.getModel(req.params.model).findById(req.params.id).then(result=>{
        res.json(result);
    }).catch(err=>{
        res.json(err);
    });
});

router.get('/:model', function(req, res){
    models.getModel(req.params.model).findAll().then(result=>{
        res.json(result);
    }).catch(err=>{
        res.json(err);
    });
});

router.put('/:model', function(req, res){
    let model = models.getModel(req.params.model);
    let instance = new model(req.body);
    instance.save().then(result=>{
        res.json(result);
    }).catch(err=>{
        res.json(err);
    });
});

router.post('/:model', function(req, res){
    let model = models.getModel(req.params.model);
    let instance = new model(req.body);
    instance.save().then(result=>{
        res.json(result);
    }).catch(err=>{
        res.json(err);
    });
});

router.delete('/:model/:id', function(req, res){
    models.getModel(req.params.model).deleteById(req.params.id).then(result=>{
        res.json(result);
    }).catch(err=>{
        res.json(err);
    });
})


module.exports = router;