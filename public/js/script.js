var TwitterPath = function() {
	this.init();
}

TwitterPath.prototype = {
	
	init: function() {
		console.log('in init');
		var width = $(window).width();
		var height = $(window).height();
	
		var paper_width = Math.floor(.9 * width);
		var x_coord = Math.floor((width - paper_width) / 2)

		this.paper = Raphael(x_coord, 0, paper_width, height);
		
		// Creates circle at x = 50, y = 40, with radius 10
		var bg = this.paper.rect(0, -1, paper_width, height + 2).attr({
			fill: '30-#ddd-#777',
			stroke: '#f00'
		});
	}
};

var ProfileNode = function(paper, initialX, initialY, profileInfo) {
	this.setUserInfo(profileInfo);
	this.setX(initialX);
	this.setY(initialY);
	this.setPaper(paper);
	this.draw();
}

ProfileNode.prototype = {
	setUserInfo: function(profileInfo) {
		this.info = profileInfo;
	},
	
	setPaper: function(paper) {
		this.paper = paper;
	},
	
	setX: function(x) {
		this.x = x;
	},
	
	setY: function(y) {
		this.y = y;
	},
	
	draw: function() {
		this.paper.image(this.info.profile_image_url, this.x, this.y, 48, 48);
	}
};

$(document).ready(function() {
	console.log('In doc.ready');
	var twitPath = new TwitterPath();
	var testNode = new ProfileNode(twitPath.paper, 100, 100, {
		profile_image_url : 'http://a1.twimg.com/profile_images/1212991106/136657032_full_r_470x470_reasonably_small.jpg'
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























