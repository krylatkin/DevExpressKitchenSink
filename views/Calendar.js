KitchenSink.Calendar = function (params) {

    var viewModel = {
        calendar: {
            value: new Date(),
            min: new Date(2014, 1, 1),
            max: new Date(2014, 12, 31),
            firstDayOfWeek: 0
        }
    };

    return viewModel;
};