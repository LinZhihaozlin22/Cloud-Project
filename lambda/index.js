var DBHandler = require("./DBHandler")

exports.handler = (event, context, callback) => {
    console.log('This event is ' + JSON.stringify(event))
    var intent = event.currentIntent.name;
    var slot = event.currentIntent.slots.Location;

    DBHandler.getRestaurantDetails(intent, function(err, data) {
        if (err) {
            context.fail(err);
        } else {
            let output = '';
            if (data.Item.message !== undefined)
            output = data.Item.message;
            else
            output = data.Item.Slot[slot]
            var response = {
                "dialogAction": {
                    "type": "Close",
                    "fulfillmentState": "Fulfilled",
                    "message": {
                        "contentType": "PlainText",
                        "content": output
                    }
                }
            }
            callback(null, response);
        }
    });

};
