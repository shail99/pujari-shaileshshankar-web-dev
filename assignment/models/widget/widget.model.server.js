module.exports = function(){
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget",WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };
    return api;

    function createWidget(pageId, widget){
        widget._page = pageId;
        return Widget.create(widget);
    }

    function findAllWidgetsForPage(pageId){
        return Widget.find({_page: pageId});
    }

    function findWidgetById(widgetId){
        return Widget.findById({_id: widgetId});
    }

    function updateWidget(widgetId, widget){

    }

    function deleteWidget(widgetId){

    }

    function reorderWidget(pageId, start, end){

    }
};