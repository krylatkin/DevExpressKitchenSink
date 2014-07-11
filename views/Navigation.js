KitchenSink.Navigation = function(params) {
    var viewModel = {
        navbar: {
            currentImageClass: ko.observable("content-icon-home"),
            itemClickAction: function(e) {
                this.navbar.currentImageClass(e.itemData.imageClass);
            },
            items: [
                { text: "Home", icon: "home" },
                { text: "User", icon: "user" },
                { text: "Comment", icon: "comment", badge: 12 },
                { text: "Photo", icon: "photo", badge: 1 }
            ],
            selectedIndex: ko.observable(0)
        },
        contentItems: [
            { template: 'home' },
            { template: 'user' },
            { template: 'message' },
            { template: 'image' }
        ]
    };
    return viewModel;
};