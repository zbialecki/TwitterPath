var TwitterPath = function() {
	this.init();
}

TwitterPath.prototype = {
	
	init: function() {
		var width = $(window).width();
		var height = $(window).height();
	
		var paper_height = Math.floor(.8 * height);
		var y_coord = Math.floor((height - paper_height) / 2)

		this.paper = Raphael(0, y_coord, width, paper_height);
		
		var bg = this.paper.rect(-1, 0, width + 2, paper_height).attr({
			fill: '30-#ddd-#777',
			stroke: '#555'
		});
	},
	
	addNode: function(profileNode) {
		profileNode.draw(this.paper);
	}
};

var ProfileNode = function(initialX, initialY, profileInfo) {
	this.setUserInfo(profileInfo);
	this.setX(initialX);
	this.setY(initialY);
}

ProfileNode.prototype = {
	setUserInfo: function(profileInfo) {
		this.info = profileInfo;
	},
	
	setX: function(x) {
		this.x = x;
	},
	
	setY: function(y) {
		this.y = y;
	},
	
	draw: function(paper) {
		paper.image(this.info.profile_image_url, this.x, this.y, 48, 48);
	}
};

$(document).ready(function() {
	var twitPath = new TwitterPath();

	socket = new io.Socket('localhost');
	socket.connect();
	socket.send('Check it out bitches!');
	socket.on('message', function(data){
	    console.log('Got data from the server: ' + data);
	});
		
	/***
	$.getJSON('seeds.json', function(seeds) {
		var friendlist = "<ul>";
		var source_sn = seeds[Math.floor(Math.random() * seeds.length)];

		$.getJSON('ladygaga2.json', function(friends) {
			var source_friends = [];
			$.each(friends.users, function(i, item) {
				friendlist = friendlist + "<li>" + item.screen_name +	"</li>";
				if (item.verified && !item['protected']) {
					source_friends.push(item);
				}
			});
			friendlist = friendlist	+ "</ul>";
			console.log(friends);
		});
		$('#source_sn').html(source_sn);
		console.log(source_sn + friendlist);
	});


	$.getJSON('http://api.twitter.com/1/trends.json?callback=?', function(data) {
		var output = '<ul>';
		$.each(data.trends, function(i, item) {
			output = output + '<li>' + item.name + '</li>';
		});
		output = output + '</ul>';
		$('#trends').html(output);
	});
	***/
});























