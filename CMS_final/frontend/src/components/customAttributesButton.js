export default function customAttributePlugin(context) {
    const editor = context.editor;
    const pluginName = 'customAttributePlugin';
  
    context.customAttributePlugin = {
      // Function to add custom attributes to an element
      addCustomAttributes: function (element) {
        if (element) {
          const className = prompt("Enter class name:");
          const href = prompt("Enter link (optional):");
          if (className) {
            element.classList.add(className);
          }
          if (href) {
            element.setAttribute('href', href);
          }
          // Example custom attributes (optional)
          element.setAttribute('data-custom', 'customValue'); // Add custom data attribute
        }
      },
      // Function to add custom attributes to all elements in the editor
      addAttributesToAllElements: function () {
        const elements = editor.getElementsByTagName('*');
        for (let i = 0; i < elements.length; i++) {
          context.customAttributePlugin.addCustomAttributes(elements[i]);
        }
      }
    };
  
    return {
      name: pluginName,
      add: function (core) {
        // Add a button to the toolbar to manually trigger the attribute addition
        core.addModule([{
          name:'customAttributePlugin',
          buttonList: ['customAttributePlugin']
        }]);
  
        // Add a command to manually trigger the attribute addition
        core.addCommand('addCustomAttributesCommand', {
          title: 'Add Custom Attributes',
          icon: 'fa fa-plus',
          command: function () {
            context.customAttributePlugin.addCustomAttributes();
          }
        });
  
        // Add the custom attribute button to the toolbar
        core.addToolbarButton('customAttributePlugin', 'Add Custom Attributes', 'fa fa-plus', 'addCustomAttributesCommand');
      }
    };
}