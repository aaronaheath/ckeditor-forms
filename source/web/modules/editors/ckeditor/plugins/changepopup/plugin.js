(function(){

	CKEDITOR.plugins.add('changepopup', {
		init:function(editor){
			editor.addCommand('changepopupdialog', new CKEDITOR.dialogCommand('changepopupdialog'));
			
			editor.ui.addButton('changepopup', {
				label: 'Change Popup',
				icon: this.path + 'icon.png',
				command: 'changepopupdialog'
			});
			
			CKEDITOR.dialog.add('changepopupdialog', function (config) {
				return {
					title: 'Enter a new popup:',
					contents: [{
						id: 'tab1',
						label: 'this',
						title: 'that',
						expand: true,
						padding: 0,
						elements: [{
							type: 'textarea',
							id: 'newpopuptext',
							rows: 1,
							cols: 40
						}]
					}],
					buttons: [ CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton ],
					onOk: function () {
						changePopup(this.getContentElement('tab1', 'newpopuptext').getValue());
					}
				};
			});
		}
	});
	
	
	function changePopup (newPopup) {
		var editor = CKEDITOR.instances['template_x002e_inline-edit_x002e_inline-edit_x0023_default_prop_cm_content'];
		var data = editor.getData();
		var dlt = 'data-linktarget="';
		
		if (data.indexOf(dlt) == -1) {
			alert('No popup value to change. Try reloading the template.');
			return false;
		}
		
		var str = data.split(dlt);	
		if (str.length != 2) {
			alert('Too many popups. Try reloading the template.');
			return false;
		}
		
		var newData = str[0] + dlt + newPopup + str[1].substring(str[1].indexOf('"'));
		editor.setData(newData);
		
		alert('Popup successfully changed!');
		return true;
	}
})();