

const ActorStatus = {
	LOGGED_IN: 'actor.logged_in', // MEANS THAT A ATTENDANT LOGGEDIN
	LOGGED_OUT: 'actor.logged_out', // MEANS THAT A ATTENDANT LOGGEDOUT
	RINGING: 'actor.ringing', // MEANS THAT A ATTENDANT IS BEING REQUIRED
	PAUSED: 'actor.paused', // MEANS THAT A ATTENDANT PAUSED IN QUEUE
	UNPAUSED: 'actor.unpaused', // MEANS THAT A ATTENDANT UNPAUSED IN QUEUE
	ENTERED: 'actor.entered', // MEANS THAT A ATTENDANT TOOK THE CALL
	LEFT: 'actor.left', // MEANS THAT A ATTENDANT LEFT THE CALL
	NOANSWER: 'actor.noanswer' // MEANS THAT A ATTENDANT DID NOT TAKE THE CALL
};

const available = status => status === ActorStatus.UNPAUSED || status === ActorStatus.LOGGED_IN || status === ActorStatus.LEFT;


module.exports = {
	ActorStatus, available
};