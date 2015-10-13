window.addEventListener('load', init);

function init(){
	var view = new View;
	var model = new PrimaryBookmarksTree;
	var controller = new Controller(view, model);
	console.log(controller);
	controller.bindEventListeners();

}

