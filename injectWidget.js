freeboard.loadWidgetPlugin({
 
	"type_name"   : "widget_inject_test",
	"display_name": "Widget Injector Test",
    "description" : "Wire an HTML5 input field to a datasource for updates/publishes",



	"fill_size" : false,
	"settings"    : [
		{
			"name"        : "formTitle",
			"display_name": "Title",
			"type"        : "text"
		}
	],


	newInstance   : function(settings, newInstanceCallback, updateCallback)
	{
		newInstanceCallback(new WidgetInjectorTestPlugin(settings, updateCallback));
	}
});

 
var WidgetInjectorTestPlugin = function(settings, updateCallback)
{
	var self = this;
	//replace spaces with dash so we can retrieve by id later
	settings.formName = settings.formTitle.replace(/\s+/g, '-');
	var currentSettings = settings;
	var inputElement = $("<input type='"+settings.inputType+"' id='"+settings.formName+"' class='messageTextBox'/>");

	self.render = function(containerElement)
	{

		$(containerElement).append(inputElement);
		inputElement.on( "blur", self.onEvent);

	}


	self.getHeight = function()
	{
		if(currentSettings.size == "big")
		{
			return 2;
		}
		else
		{
			return 1;
		}
	}


	self.onSettingsChanged = function(newSettings)
	{
		currentSettings = newSettings;
	}


	self.onCalculatedValueChanged = function(settingName, newValue)
	{


		if(settingName == "the_text")
		{


			$(myButtonElement).html(newValue);
		}
	}


	self.onDispose = function()
	{
	}

	self.getTextValue = function() {
		var textBox = $('#'+currentSettings.formName);
		try {
			var a={};
			a[currentSettings.buttonLabel] = textBox.val()
			return a;
		} catch(e) {
			console.log('unable to get value for message button textbox');
			console.log(e);
			return {};
		}
	}

	self.onEvent = function() {
		updateCallback(self.getTextValue(), "value");
	}
}
