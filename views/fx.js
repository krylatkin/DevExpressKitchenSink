KitchenSink.fx = function (params) {
    var animating = ko.observable(false),
        duration = ko.observable(500),
        optionsDisabled = ko.observable(false),
        buttonTitle = ko.observable("Start"),
        types = ["slide", "pop", "fade"],
        type = ko.observable(types[0]),
        animationConfig = {
            "slide": { type: "slide", from: { top: 0 }, to: { top: 90 }},
            "pop": { type: "pop"},
            "fade": { type: "fade", from: 1, to: 0}
        };

    animating.subscribe(function (value) {
        buttonTitle(value ? "Stop" : "Start");
        optionsDisabled(value);
    });

    var viewModel = {      
        buttonTitle: buttonTitle,
        durationSlider: {
            min: 100,
            max: 2000,
            value: duration,
            step: 100,
            disabled: optionsDisabled,
            tooltip: {
                enabled: true,
                showMode: 'onHover',
                position: 'top',
                format: function (value) {
                    return value + " ms";
                }
            }
        },
        animationTypeOptions: {
            dataSource: types,
            value: type,
            placeholder: 'Select animation ...',
            disabled: optionsDisabled
        },
        animate: function() {
            var block = $(".animation-block")

            if (animating()) {
                DevExpress.fx.stop(block, false);
                animating(false);
                return;
            }

            animating(true);

            var config = animationConfig[type()];

            config.duration = duration();

            DevExpress.fx.animate(block, config).done(function() {
                if(config.type === "pop") {
                    animating(false);
                    return;
                }
                var backConfig = { type: config.type, to: config.from, from: config.to, duration: config.duration };
                DevExpress.fx.animate(block, backConfig).done(function() {
                    animating(false);
                });
            });
        }
    };

    return viewModel;
};