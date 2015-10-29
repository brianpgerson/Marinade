window.addEventListener('load', init);

function init(){
	var view = new View;
	var model = new PrimaryBookmarksTree;
	var controller = new Controller(view, model);
	controller.bindListeners();
	console.log(controller);
	console.log(model);
}

