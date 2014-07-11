KitchenSink.Form = function(params) {
    var viewModel = {
        dxAutocomplete: {
            text: ko.observable(""),
            cities: KitchenSink.db.cities
        },
        dxSwitch: {
            value: ko.observable(true)
        },
        dxSlider: {
            value: ko.observable(5),
            tooltip: {
                enabled: true,
                showMode: "always",
                position: "top"
            }
        },
        dxRangeSlider: {
            minValue: ko.observable(3),
            maxValue: ko.observable(7),
            tooltip: {
                enabled: true,
                showMode: "onHover",
                position: "bottom"
            }
        },
        dxLookup: {
            data: ["red", "green", "blue", "yellow"],
            value: ko.observable(null)
        },
        dxSelectbox: {
            data: ["light", "dark"],
            value: ko.observable(null)
        },
        dxMultiselect: {
            data: ["Red", "Green", "Blue", "White", "Black"],
            value: ko.observable(null)
        },
        dxCheckbox: {
            value: ko.observable(undefined)
        },
        dxRadioGroup: {
            items: [
                { text: "Tea" },
                { text: "Coffee" },
                { text: "Juice" }
            ]
        }
    };

    return viewModel;
};