// Copyright 2014 by Rainer Rillke
// The script must be run in a JavaScript console.
// The POTY-object must be present ( https://commons.wikimedia.org/wiki/MediaWiki:EnhancedPOTY.js ).
// The config must be merged into the POTY object. So it's best if you run it on a gallery of the competition.
// Very hackish and crappy but... ah and it takes about an hour!
// This was published by User:Rillke (https://commons.wikimedia.org/wiki/User:Rillke) on Wikipedia Commons
// at https://commons.wikimedia.org/wiki/User:Rillke/POTY2014r1.eligibility-checker-and-vote-tallier.js under the  Creative Commons Attribution-ShareAlike 3.0 license license
// https://commons.wikimedia.org/wiki/Commons:Creative_Commons_Attribution-ShareAlike_3.0_Unported_License

var gf, poty = POTY;

function firstItem(o) {
    for (var i in o) {
		if (o.hasOwnProperty(i)) {
			return o[i];
		}
	}
}

$.inTimestamps = function (ts, tss) {
	var found;
	$.each(tss, function (k, v) {
		if (ts === v.ts) {
			found = v;
			return false;
		}
	});
	return found;
};

var users = [],
	/*
	{ example: {
		votes: {},
		eligibility: {}
	} }
	*/
	pages2Dig = [],
	userInfo = {},
	usersToCheck = [],
	votes = 0;
	
poty.tasks =[];
poty.addTask('getDbList');
poty.nextTask();

function UserInfo(username) {
	this.name = username;
	this.votes = new UserVotes();
	this.eligibility = {};
}
UserInfo.prototype = $.extend(true, UserInfo.prototype, {
	// You MUST NOT RUN multiple queries at once!
	$checkEligibility: function () {
		var $def = $.Deferred();

		var ca = [],
			possibleWikis = [],
			u = this.name,
			_t = this;
		var _gotCentralAuthPart = function (r) {
			if (!r.query.globaluserinfo) return;
			ca = ca.concat(r.query.globaluserinfo.merged || []);
		};
		var _generalEligibility = function () {
			// Hack into POTY script
			var poty = window.POTY;
			poty.tasks = [];
			delete poty.data.eligible;
			poty.username = window.debugPOTYUserName = u;
			poty.currentEditGroup = -1;
			poty.queriesRunning = 0;
			poty.showEligible = function () {
				console.info('eligible', poty.data.eligible);
				_t.eligibility = poty.data.eligible;
				$def.resolve();
			};
			poty.showIneligible = function () {
				console.info('ineligible', poty.data.ineligible);
				_t.eligibility = false;
				$def.resolve();
			};
			poty.data.sulmissing = false;
			poty.addTask('checkSUL');
			//poty.addTask('getDbList');
			poty.addTask('checkLocalExistingContribs');
			poty.addTask('checkGlobalExistingContribs');
			poty.nextTask();
		};
		var _centralAuthDone = function () {
				_generalEligibility();
		};

		mw.libs.commons.api.$autoQuery({
			action: 'query',
			meta: 'globaluserinfo',
			guiprop: 'merged',
			guiuser: this.name
		}).progress(_gotCentralAuthPart).done(_centralAuthDone).fail(function () {
			console.error(arguments);
		});

		return $def;
	}
});

function UserVotes() {
	this.votesByCandidate = {};
	this.votesByTimestamp = [];
}
UserVotes.prototype = $.extend(true, UserVotes.prototype, {
	add: function (candidate, timestamp, diff) {
		// Votes must be pre-registered
		// This prevents adding votes that were removed by the user later
		if (timestamp && undefined === this.votesByCandidate[candidate]) {
			return;
		}

		// Pre-register a vote
		if (!timestamp) {
			return (this.votesByCandidate[candidate] = '');
		}

		// The date must be greater than existing dates
		// This is to find the occurence of the user's last choice for one candidate
		// The API-timestamp is in format YYYY-MM-ddThh:mm:ssZ
		if (timestamp > this.votesByCandidate[candidate]) {
			this.votesByCandidate[candidate] = timestamp;
			// The rules were clear in this regard. If a user managed to vote 2 logos the same time, 
			// this is not our problem but let's log it
			var v = $.inTimestamps(timestamp, this.votesByTimestamp);
			if (v) {
				console.warn("2 votes at same time encountered: " + v.ts + ", " + candidate + " |" + timestamp);
			}
			this.votesByTimestamp.push({
				ts: timestamp,
				candidate: candidate,
				diff: diff
			});
		}
	},
	// Return the first 3 candidates chosen by the user but
	// sort them by occurence of the last vote so their 1st 2nd and 3rd choice are correctly reported
	getValidVotes: function () {
		// First, drop everything that is not the last vote for one file
		var _t = this,
			usableVotes = $.grep(this.votesByTimestamp, function (vote, i) {
				return vote.ts === _t.votesByCandidate[vote.candidate];
			});
			
		return usableVotes;
	}
});

var displayCandatesInfo = function () {
	var tbl = [],
		byCandidate = {}, c = 0;
	var td = function (inner) {
		return '<td>' + inner + '</td>';
	};
	var file = function (k) {
		return td('[[File:' + k + '|135px]]<br />[[File:' + k + '|16px]] <tt>' + k + '</tt>');
	};
	var voters = function (cand) {
		var out = [];
		$.each(cand, function (i, v) {
			var item = '[[User:' + v.user + '|' + v.user + ']] (' + (v.number + 1) + ')';

			out.push(item);
		});
		return td(out.join(', '));
	};
	var getVotes = function (cand, round) {
		var count = 0;
		$.each(cand, function (i, v) {
			if (v.number === round) {
				count++;
			}
		});
		return count;
	};
	$.each(window.voyResults, function (u, userInfo) {
		var votes = userInfo.votes.getValidVotes();
		$.each(votes, function (i, v) {
			if (!(v.candidate in byCandidate)) byCandidate[v.candidate] = [];
			var cand = byCandidate[v.candidate];
			v.user = u;
			v.eligibility = userInfo.eligibility;
			v.number = i;
			cand.push(v);
		});
	});
	$.each(byCandidate, function (k, cand) {
		c++;
		var r0a = getVotes(cand, 0);

		tbl.push('<tr>' + td(c) + file(k) + td(cand.length) + voters(cand) +
			td(r0a) + '</tr>');
	});

	$('<pre>').text(tbl.join('\n')).appendTo('body');
};

var displayVoterInfo = function () {
	var tbl = [],
		c = 0;
	var td = function (inner) {
		return '<td>' + inner + '</td>';
	};
	var elig2UI = function (usi) {
		if (!usi.eligibility) {
			return 'not verified';
		} else if (usi.eligibility.edits) {
			return 'general (' + usi.eligibility.on.name + ')';
		}
	};
	var votes2UI = function (usi) {
		var out = '';
		$.each(usi.votes.getValidVotes(), function (i, obj) {
			out += '\n# [//commons.wikimedia.org/wiki/?diff=' + obj.diff + ' ' + obj.ts.replace('T', ' ').replace('Z', '') + ' ++ ' + obj.candidate + ']';
		});
		return out;
	};
	$.each(window.voyResults, function (u, userInfo) {
		c++;
		if (u === "Rillke") console.log(userInfo.votes.getValidVotes());
		tbl.push('<tr>' + td(c) + td(u) + td(elig2UI(userInfo)) + '\n' + td(votes2UI(userInfo)) + '\n' + '</tr>');
	});
	$('<pre>').text(tbl.join('\n')).appendTo('body');
};

var exportJSON = function() {
	mw.loader.load('json', function() {
		$('<pre>').text(JSON.stringify(window.voyResults)).appendTo('body');
	});
};

var fetchVoterInfo = function () {
	console.info("Now fetching voter info.", userInfo);

	var _next = function () {
		if (usersToCheck.length === 0) {
			window.voyResults = userInfo;
			console.log(window.voyResults);
			displayVoterInfo();
			displayCandatesInfo();
			exportJSON();
			alert("Done!");
			return;
		}
		usersToCheck.pop().$checkEligibility().done(_next).fail(_next);
	};
	_next();
};

var currentVoters = [],
	previousVoters = [];

var gotPageHist = function (r) {
	var pg = firstItem(r.query.pages);

	console.log('Doing ' + pg.title, r);
	$.each(pg.revisions, function (ir, rv) {
		var c = rv['*'],
			t = pg.title,
			f = poty.getFileNameFromPageName(t),
			m = c.match(poty.genericVoteRegExp),
			l = 0;

		// Empty page? First revision?
		if (!m) return;
		currentVoters = [];
		$.each(m, function (i, vote) {
			var u = vote.replace(/\n# \[\[User:(.+?)\|.+\]\]/, '$1'),
				manip = false;
				
			currentVoters.push(u);
			// Was this a new voter?
			if ($.inArray(u, previousVoters) === -1) {
				if (u !== rv.user) {
					console.warn("Vote manipulation detected: " + rv.user + " claims to be " + u, t, rv.timestamp, previousVoters.length);
					$('<pre>')
						.text("Vote manipulation detected: " + rv.user + " claims to be " + u + '\n' + t + '\n' + rv.timestamp + '\n' + previousVoters.length)
						.appendTo('body');
					if (rv.user !== 'Rillke' && rv.user !== '**Romina**') manip = true;
				}
				if (!(u in userInfo)) {
					console.info(u + " is not in userInfo object! Skipping.");
				} else {
					if (!manip) userInfo[u].votes.add(f, rv.timestamp, rv.revid);
				}
			}
		});
		previousVoters = currentVoters;
	});
};

var digPageHist = function (result) {
	previousVoters = [];
	if (!pages2Dig.length) return fetchVoterInfo();
	mw.libs.commons.api.$autoQuery({
		action: 'query',
		titles: pages2Dig.pop(),
		prop: 'revisions',
		rvprop: 'content|user|ids|timestamp',
		rvlimit: 'max',
		rvdir: 'newer'
	}).progress(gotPageHist).done(digPageHist).fail(function () {
		console.error(arguments);
	});
};

poty.genericVoteRegExp = new RegExp(poty.mdEscapeSpecial(mw.RegExp.escape(poty.votingFormat)).replace(/%UserName%/g, '[^\\|\\[\\]]+'), 'g');
var _gotPages = function (r) {
	var pgs = r.query.pages;
	$.each(pgs, function (ids, pg) {
		var c = pg.revisions[0]['*'],
			t = pg.title,
			f = poty.getFileNameFromPageName(t),
			m = c.match(poty.genericVoteRegExp),
			l = 0;

		if (!f) return;
		if (m) {
			l = m.length;
			votes += l;
			$.each(m, function (i, vote) {
				var u = vote.replace(/\n# \[\[User:(.+?)\|.+\]\]/, '$1');
				if ($.inArray(u, users) < 0) {
					users.push(u);
					userInfo[u] = new UserInfo(u);
					usersToCheck.push(userInfo[u]);
				}
				// Pre-register candidate
				userInfo[u].votes.add(f);
			});
			pages2Dig.push(pg.title);
		}
	});
	console.info("Votes pre-registered.", userInfo);
	digPageHist();
};


mw.libs.commons.api.$autoQuery({
	action: 'query',
	generator: 'allpages',
	gapnamespace: mw.config.get('wgNamespaceNumber'),
	gapfilterredir: 'nonredirects',
	gaplimit: 'max',
	gapprefix: 'Picture of the Year/2014/R1/v/',
	prop: 'revisions',
	rvprop: 'content'
}).done(_gotPages).fail(function () {
	console.error(arguments);
});
