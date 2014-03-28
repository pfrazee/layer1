function MenuControls(menu, domElement) {
	this.menu = menu;
	this.domElement = domElement || document.body;
	this.setup();
}
module.exports = MenuControls;

MenuControls.prototype.setup = function() {
	document.body.addEventListener('keypress', this.onKeyPress.bind(this), false);
	document.body.addEventListener('click', this.onClick.bind(this), false);
};

MenuControls.prototype.onKeyPress = function(e) {
	var c = String.fromCharCode(e.which || e.keyCode);
	var id = this.menu.hotkeyToCmdId(c);
	if (id) {
		this.menu.dispatchEvent({ type: 'execute', cmd: this.menu.getCmd(id) });
	}
};

MenuControls.prototype.onClick = function(e) {
	if (e.which !== 1) return; // left click only
	var cmdEl = local.util.findParentNode.byClass(e.target, 'menu-cmd');
	if (cmdEl && cmdEl.dataset.cmd) {
		this.menu.dispatchEvent({ type: 'execute', cmd: this.menu.getCmd(cmdEl.dataset.cmd) });
		e.preventDefault();
	}
};