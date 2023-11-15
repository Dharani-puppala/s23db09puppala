var icecream = require('../models/icecream');
// List of all icecreams
// exports.icecream_list = function(req, res) {
// res.send('NOT IMPLEMENTED: icecream list');
// };

exports.icecream_list = async function(req, res) {
    try{
    theicecreams = await icecream.find();
    res.send(theicecreams);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };

// for a specific icecream.
exports.icecream_detail = function(req, res) {
res.send('NOT IMPLEMENTED: icecream detail: ' + req.params.id);
};
// Handle icecream create on POST.
// exports.icecream_create_post = function(req, res) {
// res.send('NOT IMPLEMENTED: icecream create POST');
// };
// for a specific icecream.
exports.icecream_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await icecream.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
    };
    
// Handle icecream create on POST.
exports.icecream_create_post = async function(req, res) {
console.log(req.body)
let document = new icecream();
// We are looking for a body, since POST does not have query parameters.
// Even though bodies can be in many different formats, we will be picky
// and require that it be a json object
// {"icecream_type":"goat", "flavour":12, "price":"large"}
document.cone = req.body.cone;
document.flavour = req.body.flavour;
document.price = req.body.price;
try{
let result = await document.save();
res.send(result);
}
catch(err){
res.status(500);
res.send(`{"error": ${err}}`);
}
};


// Handle icecream delete form on DELETE.
exports.icecream_delete = function(req, res) {
res.send('NOT IMPLEMENTED: icecream delete DELETE ' + req.params.id);
};
// Handle icecream update form on PUT.
// exports.icecream_update_put = function(req, res) {
// res.send('NOT IMPLEMENTED: icecream update PUT' + req.params.id);
// };

// Handle icecream update form on PUT.
exports.icecream_update_put = async function(req, res) {
console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
try {
let toUpdate = await icecream.findById( req.params.id)
// Do updates of properties
if(req.body.cone)toUpdate.cone = req.body.cone;
if(req.body.flavour) toUpdate.flavour = req.body.flavour;
if(req.body.price) toUpdate.price = req.body.price;
let result = await toUpdate.save();
console.log("Sucess " + result)
res.send(result)
} catch (err) {
res.status(500)
res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
}
};


// VIEWS
// Handle a show all view
exports.icecream_view_all_Page = async function(req, res) {
try{
theicecreams = await icecream.find();
res.render('icecream', { title: 'icecream Search Results', results: theicecreams });
}
catch(err){
res.status(500);
res.send(`{"error": ${err}}`);
}
};
//Handle Costume delete on DELETE.
exports.icecream_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await icecream.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
    };