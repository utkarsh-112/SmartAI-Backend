const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use('/', express.static(path.join(__dirname, './')));

const DB = "mongodb+srv://Utkarsh:zTNfFKUCgz9A4Aga@cluster0.wkmh6.mongodb.net/SmartAI?retryWrites=true&w=majority"

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => console.log('DB connection successful'));

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
	},
});

app.get('/form', (req, res) => {
	res.sendFile(__dirname + './form/index.html');
});

app.get('/face_detection', (req, res) => {
	res.sendFile(__dirname + '../face_detection/index.html');
});

//for collections
const Signup = new mongoose.model('form', userSchema);

app.post('/form/signup', async (req, res) => {
	const { name, password, email } = req.body;

	try {
		const data = await Signup.create({
			name,
			password,
			email,
		});
		return res.json({ status: 'ok', data: '' });
	} catch (error) {
		res.status(400).send('Server error !!!!!');
	}
});

app.post('/form/signin', async (req, res) => {
	const { name, password } = req.body;

	const user = await Signup.find({ name, password }, (err, docs) => {
		if (docs.length !== 0) {
			console.log('success');
			return res.json({ status: 'ok', data: '' });
		} else {
			console.log('error');
			return res.json({ status: 'error', data: '' });
		}
	});
	// console.log(user);
});

app.listen(port, () => {
	console.log('App is running....');
});
