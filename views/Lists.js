KitchenSink.Lists = function(params) { 

    var menuTypes = [
        // menuType
        "slide",
        "hold",
        // deleteType
        "toggle",
        "swipe"
    ];

    var viewModel = {

        menuTypes: menuTypes,

        menuType: ko.observable(menuTypes[0]),

        tabs: [
           { text: "Simple" },
           { text: "Grouped" },
           { text: "Custom" }
        ],

        contentItems: [{
                template: 'simpleList'
            }, {
                template: 'groupedList'
            }, {
                template: 'customList'
            }
        ],

        selectedTab: ko.observable(),

        simpleList: {
            dataSource: new DevExpress.data.DataSource({ store: KitchenSink.db.products }),
            rendered: ko.observable(false)
        },

        groupedList: {
            dataSource: new DevExpress.data.DataSource({ store: KitchenSink.db.productsGrouped }),
            rendered: ko.observable(false)
        },

        customList: {
            dataSource: new DevExpress.data.DataSource({ store: KitchenSink.db.productsCustom }),
            rendered: ko.observable(false),
            searchQuery: ko.observable().extend({ throttle: 500 }),
            resetFocus: function(e) { e.component.blur(); }
        },

        editEnabled: ko.observable(false),

        editList: function() {
            viewModel.editEnabled(!viewModel.editEnabled());
        },

        refreshList: function() {
            var simpleDataSource = viewModel.simpleList.dataSource;
            simpleDataSource.pageIndex(0);
            simpleDataSource.load();
        }
    };

    $.each(["simpleList", "groupedList", "customList"], function(i, list) {
        viewModel[list].listVisible = ko.computed(function() {
            return viewModel.selectedTab() === i;
        });

        viewModel.selectedTab.subscribe(function(value) {
            if(viewModel[list].rendered())
                return;
            if(value === i)
                viewModel[list].rendered(true);
        });

        if(i < 2) {
            viewModel[list].editEnabled = viewModel.editEnabled;
            viewModel[list].editConfig = ko.computed(function() {
                var config = {
                    reorderEnabled: DevExpress.devices.current().platform != "win8",
                    deleteEnabled: true
                };

                var type = viewModel.menuType();
                if(type == "hold" || type == "slide") {
                    config.menuType = type;
                    config.menuItems = [
                        {
                            text: viewModel.menuType() == "slide" ? "Custom" : "Custom Command",
                            action: function() { viewModel.showOverlay() }
                        }
                    ];
                } else {
                    config.deleteType = type;
                    config.menuItems = [];
                }

                return config;
            });
        }
    });

    viewModel.editTitle = ko.computed(function() {
        return viewModel.editEnabled() ? "Done" : "Edit";
    });

    viewModel.commandsVisible = ko.computed(function() {
        return viewModel.selectedTab() === 0;
    });

    viewModel.customList.searchQuery.subscribe(function(value) {
        viewModel.customList.dataSource.filter("Name", "contains", value);
        viewModel.customList.dataSource.load();
    });

    viewModel.selectedTab(0);

    viewModel.showOverlay = function() {
        var toast = $("#overlay").data("dxToast");
        toast.show();
    }

    return viewModel;
};