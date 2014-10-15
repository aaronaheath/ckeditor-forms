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
					title: 'Change Popup',
					height: 180,
					width: 250,
					resizeable: CKEDITOR.DIALOG_RESIZE_NONE,
					contents: [{
						id: 'tab1',
						label: 'this',
						title: 'that',
						expand: true,
						padding: 0,
						elements: [{
							type: 'text',
							label: 'Change the popup',
							id: 'newpopuptext'
						}]
					}],
					buttons: [ CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton ],
					onShow: function () {
						console.log('setup');
						var currentPopup = getCurrentPopup();
						if (!currentPopup) {
							alert('Invalid Template Found. This is for use with the Popup Template only. Try reloading the template.');
							return false;
						}
						this.getContentElement('tab1', 'newpopuptext').setValue(currentPopup);
					},
					onOk: function () {
						changePopup(this.getContentElement('tab1', 'newpopuptext').getValue());
					}
				};
			});
		}
	});
	
	function getCurrentPopup() {
		var str = splitAtPopup();
		if (!str) {
			return false
		} else {
			return str[1].substring(0, str[1].indexOf('"'));
		}
	}
	
	function changePopup (newPopup) {
		var str = splitAtPopup();
		if (!str) {
			alert('Invalid Template Found. This is for use with the Popup Template only. Try reloading the template.');
			return false;
		}
		
		var newData = str[0] + dlt + newPopup + str[1].substring(str[1].indexOf('"'));
		editor.setData(newData);
		
		alert('Popup successfully changed!');
		return true;
	}
	
	function splitAtPopup () {
		var editor = CKEDITOR.instances['template_x002e_inline-edit_x002e_inline-edit_x0023_default_prop_cm_content'] || CKEDITOR.instances['template_x002e_edit-metadata_x002e_edit-metadata_x0023_default_prop_cm_content'];
		var data = editor.getData();
		var str = data.split('data-linktarget="');
		
		return (str.length == 2 ? str : false);
	}
	
})();