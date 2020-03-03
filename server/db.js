const mongoose = require('mongoose');
const env = require('../env');
const DB_URL = `mongodb://${env.dbUser}:${env.dbPwd}@localhost:27017/blog`;

mongoose.connect(DB_URL);

mongoose.connection.on('connected', () => {
	console.log('DB connected');
})

mongoose.connection.on('error', () => {
	console.log('DB connect error');
})

mongoose.connection.on('disconnected', () => {
	console.log('DB disconnected');
})

const userSchema = new mongoose.Schema({
	name: 'string',
	password: 'string'
});

const articleSchema = new mongoose.Schema({
	articleId: 'number',
	original: 'boolean',
	title: 'string',
	introMd: 'string',
	introduction: 'string',
	contentMd: 'string',
	content: 'string',
	show: 'boolean',
	tags: 'array',
	commentNum: 'number',
	likeNum: 'number',
	pv: 'number',
	date: 'number'
})

const newMsgSchema = new mongoose.Schema({
	type: "string",
	name: "string",
	say: "string",
	title: "string",
	content: "string",
	ip: "string",
	date: "number"
})

const counterSchema = new mongoose.Schema({
	_id: 'string',
	seq: 'number'
})

articleSchema.pre('save', function (next) {
	let _this = this
	db.counter.find({}, (err, doc) => {
		if (err) {
			res.status(500).end()
		} else {
			if (!doc.length) {
				new db.counter({
					_id: 'articleId',
					seq: 1
				}).save()
				next()
			} else {
				db.counter.findByIdAndUpdate({
					_id: 'articleId'
				}, {
					$inc: {
						seq: 1
					}
				}, function (error, counter) {
					if (error) {
						return next(error)
					} else {
						_this.articleId = counter.seq
						next()
					}
				})
			}
		}
	})
})

const db = {
	user: mongoose.model('user', userSchema),
	article: mongoose.model('article', articleSchema),
	newMsg: mongoose.model('newMsg', newMsgSchema),
	counter: mongoose.model('counter', counterSchema)
}

module.exports = db;