/**
 * Patroller for POTY vote edits
 * This was published by User:Rillke (https://commons.wikimedia.org/wiki/User:Rillke) on Wikipedia Commons
 * at https://commons.wikimedia.org/wiki/User:Rillke/POTYpatrol.js under the  Creative Commons Attribution-ShareAlike 3.0 license license
 * https://commons.wikimedia.org/wiki/Commons:Creative_Commons_Attribution-ShareAlike_3.0_Unported_License
 */
 
(function($, mw) {
	var isRunning = false,
		lastContinue,
		patrolToken;
	
	var fetchList = function() {
		isRunning = true;
		$.get(mw.util.wikiScript('api'), {
			format: 'json',
			action: 'query',
			list: 'recentchanges',
			rawcontinue: 1,
			rctype: 'edit',
			rcshow: '!bot|!patrolled',
			rcprop: 'flags|timestamp|user|title|comment|ids|patrolled',
			rcnamespace: 4, // Project namespace
			rclimit: 25,
			rcdir: 'older',
			rccontinue: lastContinue
		}, gotList);
	};
	var gotList = function(r) {
		$.each(r.query.recentchanges, function(i, rc) {
			if (rc.comment.indexOf('+1 POTY vote') !== 0 && rc.comment.indexOf('-1 POTY removing vote') !== 0) return;
			if (rc.title.indexOf('Commons:Picture of the Year/2015/R1/v') !== 0) return;
			var c = window.console;
			if (c && $.isFunction(c.log)) c.log(rc.user, rc.title, rc.comment);
			
			$.ajax({
				url: mw.util.wikiScript('api'),
				data: {
					format: 'json',
					action: 'patrol',
					rcid: rc.rcid,
					token: patrolToken
				},
				type: 'POST',
				async: false,
				success: function(r2) {
					if (r2.patrol && r2.patrol.rcid) if (c && $.isFunction(c.log)) c.log(' << OK');
				},
				error: function (x, status, error) {
					if (c && $.isFunction(c.log)) c.log(' ---> PATROLLING FAILED. SERVER ERROR.');
				}
			});
		});
		lastContinue = r['query-continue'].recentchanges.rccontinue;
		
		if (lastContinue < '20160403182936') {
			lastContinue = undefined;
			isRunning = false;
			return;
		}
		fetchList();
	};
	$.get(mw.util.wikiScript('api'), {
		format: 'json',
		action: 'tokens',
		type: 'patrol'
	}, function(r3) {
		patrolToken = r3.tokens.patroltoken;
		setInterval(function() {
			if (isRunning) return;
			fetchList();
		}, 60000);
		fetchList();
	});
	
}(jQuery, mediaWiki));
