window.onload = function() {
	var view = new TagView;
	var model = new PrimaryBookmarksTree;
	var controller = new TagController(view, model);
	controller.view.display();
}