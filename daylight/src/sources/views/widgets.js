// Grid Layout components

export function gridComponent (container, state) {
    var widget = null;

    container.on('open', function() {
        widget = webix.ui({
            container: container.getElement()[0],
            view:"datatable"
        })
    });

    container.on('resize', function() {
        if (widget) {
            widget.$setSize(container.width, container.height);
        }
    });
};