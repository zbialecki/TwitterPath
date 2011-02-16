var TweetPath = function() {
	this.init()
}

TweetPath.prototype = {
	
	init: function() {
		var width = $(window).width()
		var height = $(window).height()
	
		var paper_height = Math.floor(.8 * height)
		var y_coord = Math.floor((height - paper_height) / 2)

		this.paper = Raphael(0, y_coord, width, paper_height)
		
		var bg = this.paper.rect(-1, 0, width + 2, paper_height).attr({
			fill: '30-#ddd-#777',
			stroke: '#555'
		})
	},
	
	addNode: function(profileNode) {
		profileNode.draw(this.paper);
	}
}

var ProfileNode = function(initialX, initialY, profileInfo) {
	this.setUserInfo(profileInfo)
	this.setX(initialX)
	this.setY(initialY)
}

ProfileNode.prototype = {
	setUserInfo: function(profileInfo) {
		this.info = profileInfo
	},
	
	setX: function(x) {
		this.x = x
	},
	
	setY: function(y) {
		this.y = y
	},
	
	draw: function(paper) {
		var pic = paper.image(this.info.profile_image_url, this.x, this.y, 48, 48)
		$(pic.node).unbind().bind('click', this.handleClick)
	},
	
	handleClick: function(event) {
		
	}
}

$(document).ready(function() {
	var app = new TweetPath()

	window.socket = new io.Socket('localhost');
	socket.connect()
	socket.on('message', function(data){
	    switch (data.type) {
	    	case 'profile':
				var pNode = new ProfileNode(200, 200, data.profile)
				app.addNode(pNode)
				break
				
			case 'friends':
				$.each(data.list, function(index, val) {
					app.addNode(new ProfileNode(100 + 50 * index, 100, val))
				})
				break
				
			case 'error':
				console.log("ERROR: " + data.message)
				break
		} 
	})
})























