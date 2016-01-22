var mongoose = require('mongoose')
	,	Schema = mongoose.Schema		

var usersTurnSchema = Schema({
			_user: {type: Schema.Types.ObjectId, ref: "User", index: true },
			day: { type: Number, default: 0, index: true },
			turn: { type: Number, default: 0, index: true }
		})
	,	UsersTurn = mongoose.model('User', usersTurnSchema)


module.exports = User;