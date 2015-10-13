function PrimaryBookmarksTree(){
	this.bookmarks = [
		{
			dateCreated: "10/12/2015",
			name: "my favorite site",
			tags: ["fun", "dogs", "bark"],
			url: "www.thecaseplace.co"
		},
		{
			dateCreated: "10/12/2015",
			name: "my other fave",
			tags: ["fun", "work"],
			url: "www.thesuiteclub.co"
		},
		{
			dateCreated: "10/11/2015",
			name: "my third fave",
			tags: ["fun", "dogs", "shark"],
			url: "www.barklar.com"
		}
	];
	this.tagGroups = {
		fun: [
			{
			dateCreated: "10/12/2015",
			name: "my favorite site",
			tags: ["fun", "dogs", "bark"],
			url: "www.thecaseplace.co"
			},
			{
			dateCreated: "10/12/2015",
			name: "my other fave",
			tags: ["fun", "work"],
			url: "www.thesuiteclub.co"
			}
		],
		dogs: [
			{
			dateCreated: "10/12/2015",
			name: "my favorite site",
			tags: ["fun", "dogs", "bark"],
			url: "www.thecaseplace.co"
			},
			{
			dateCreated: "10/11/2015",
			name: "my third fave",
			tags: ["fun", "dogs", "shark"],
			url: "www.barklar.com"
			}
		]
	};
	this.title = "Marinade Bookmarks";
}

function tagGroup(tag){
	this.bookmarks = [];
	this.tag = tag;
}

function Bookmark(name, url, tags){
	this.name = name;
	this.url = url;
	this.dateCreated = this.date();
	this.tags = tags;
}

Bookmark.prototype.date = function(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	} 
	if (mm < 10) {
		mm = '0' + mm;
	} 
	return mm + '/' + dd + '/' + yyyy;
}


PrimaryBookmarksTree.prototype.createNewtagGroup = function(tag){
	newTree = new tagGroup(tag)
	this.bookmarks.push(newTree);
}

PrimaryBookmarksTree.prototype.createBookmark = function(name, url, tags){
	newBookmark = new Bookmark(name, url, tags);
	this.bookmarks.push(newBookmark);
}
