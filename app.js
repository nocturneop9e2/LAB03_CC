var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/la03');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app=express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post("/sign_up", function(req,res){
	var applicant_name = req.body.applicant_name;
	var father_name = req.body.father_name;
	var mother_name = req.body.mother_name;
	var blood_group = req.body.blood_group;
	var nationality = req.body.nationality;
	var national_id = req.body.national_id;
	var email = req.body.email;
	var present_address = req.body.present_address;
	var permanent_address = req.body.permanent_address;
	var ssc_roll_no = req.body.ssc_roll_no;
	var ssc_result = req.body.ssc_result;
	var hsc_roll_no = req.body.hsc_roll_no;
	var hsc_result = req.body.hsc_result;
	var grad_result = req.body.grad_result;
	var grad_subject = req.body.grad_subject;
	var grad_uni = req.body.grad_university;
	var ms_result = req.body.ms_result;
	var ms_subject = req.body.ms_subject;
	var ms_uni = req.body.ms_university;

	var data = {
		"applicant_name": applicant_name,
		"father_name":father_name,
		"mother_name":mother_name,
		"blood_group":blood_group,
		"nationality":nationality,
		"national_id":national_id,
		"email":email,
		"present_address":present_address,
		"permanent_address":permanent_address,
		"ssc_roll_no":ssc_roll_no,
		"ssc_result":ssc_result,
		"hsc_roll_no":hsc_roll_no,
		"hsc_result":hsc_result,
		"grad_result":grad_result,
		"grad_subject":grad_subject,
		"grad_uni":grad_uni,
		"ms_result":ms_result,
		"ms_subject":ms_subject,
		"ms_uni":ms_uni,
	}
	db.collection('details').insertOne(data,function(err, collection){
			if (err) throw err;
			console.log("Record inserted Successfully");		
	});
		
	return res.redirect('\signup-success');
})


app.get('/', function(req, res){
    res.sendFile(__dirname + "\\idx.html"); // change the path to your index.html
}).listen(3000);

app.get('/signup-success',(req,res) => {
	res.sendFile(__dirname	+ "\\signup_success.html");
});

console.log("server listening at port 3000");
