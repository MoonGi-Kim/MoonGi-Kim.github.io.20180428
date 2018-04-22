/** Project: PROG3180 Programming: Mobile Applications
 * Purpose: Final Project
 *       - javascript for business function.
 *
 * Revision History
 *       - 2018.04.05 Created by Moon
 */

/**
 * ================== Common Utilities =============================================
 */
var loginmessage = false;

/**
 * get login userId from localStorage
 * @returns {string userId}
 */
function getLoginUserId() {
    if (doCheckLoginEmailAddress()) {
        return localStorage.getItem("MGUserLoginId");
    }
    else {
        return false;
    }
}

/**
 * get eventId from localStorage
 * @returns {string | eventId}
 */
function getEventId() {
    if (doCheckLoginEmailAddress()) {
        return localStorage.getItem("eventId");
    }
    else {
        return null;
    }
}

/**
 * get user email from localStorage
 * @returns {string:user email}
 */
function getUserEmail() {
    if (doCheckLoginEmailAddress()) {
        return localStorage.getItem("MGUserLoginEmail");
    }
    else {
        return null;
    }
}

/**
 * get user Type from localStorage
 * @returns {string:user typs}
 */
function getUserTypeName() {
    if (doCheckLoginEmailAddress()) {
        return localStorage.getItem("userTypeName");
    }
    else {
        return null;
    }
}

/**
 * get item id from localStorage
 * @returns {string:itemId}
 */
function getItemId() {
    if (doCheckLoginEmailAddress()) {
        return localStorage.getItem("itemId");
    }
    else {
        return null;
    }
}

/**
 * get user nick name from localStorage
 * @returns {string:user nick name}
 */
function getNickName() {
    if (doCheckLoginEmailAddress()) {
        return localStorage.getItem("userNickName");
    }
    else {
        return null;
    }
}

/**
 * get user id on user edit page from localStorage
 * @returns {*}
 */
function getUserId() {
    if (doCheckLoginEmailAddress()) {
        return localStorage.getItem("userId");
    }
    else {
        return null;
    }
}

/**
 * Check Login email address from local storage
 */
function doCheckLoginEmailAddress() {
    var loginEmail = localStorage.getItem("MGUserLoginEmail");
    if (loginEmail == null || loginEmail == "") {
        //
        if (!loginmessage) {
            alert("Please log on system first.");
            loginmessage = true;
        }

        $.mobile.changePage("#MGAboutPage", {transition: 'none'});
        //return false;
    }
    else {
        return true;
    }
}

/**
 * ================== Add Default Select Box Data =============================================
 * ================== [User Types, Category ]
 */
/**
 * load default user types from UserType tables of database
 */
function mkUpdateUserTypesDropdown(obj) {

    var options = [];

    function callback(tx, results) {
        var htmlcode = "";
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            if (row['id'] == '1') {
                htmlcode += "<option value='" + row['id'] + "' selected>" + row['name'] + "</option>";
            }
            else {
                htmlcode += "<option value='" + row['id'] + "'>" + row['name'] + "</option>";
            }
        }
        obj.html(htmlcode);
        obj.selectmenu("refresh", true);
    }

    UserTypeDB.selectAll(options, callback);
}

/**
 * load default categories from UserType tables of database
 */
function mkUpdateCategoryDropdown(obj) {

    var options = [];

    function callback(tx, results) {
        var htmlcode = "";
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            if (row['id'] == '1') {
                htmlcode += "<option value='" + row['id'] + "' selected>" + row['name'] + "</option>";
            }
            else {
                htmlcode += "<option value='" + row['id'] + "'>" + row['name'] + "</option>";
            }
        }
        obj.html(htmlcode);
        obj.selectmenu("refresh", true);
    }

    CategoryDB.selectAll(options, callback);
}

/**
 * ================== Event Page =============================================
 */
/**
 * show Event List
 */
function doShowEventPage() {
    //check admin user
    var loginemail = getUserEmail();

    var options = [loginemail];

    function callback(tx, result) {
        if (result.rows.length > 0) {
            var row = result.rows[0];

            //display all Event
            var opts = [];

            function callbackAll(tx, results) {
                var htmlcode = "";
                for (var i = 0; i < results.rows.length; i++) {
                    var irow = results.rows[i];
                    //make html code for list view
                    htmlcode += "<li><a href='#MGEventDisplayPage' data-role='button' data-row-id='" + irow['id'] + "' href='#'>" +
                        "<div>Event Name: " + irow['name'] + " (" + irow['id'] + ")</div>" +
                        "<p>Event Date: " + irow['startDate'] + " ~ " + irow['endDate'] + " | " +
                        "Processing: " + irow['processing'] + " | " +
                        "Descritioon: " + irow['description'] + "</p>" +
                        "</a></li>";

                }

                var lv = $("#MGEventList").html(htmlcode);
                lv.listview("refresh");

                $("#MGEventList a").on("click", clickHandler);

                function clickHandler() {
                    localStorage.setItem("eventId", $(this).attr("data-row-id"));
                    $.mobile.changePage("#MGEventDisPlayPage", {transition: 'none'});
                }
            }

            EventDB.selectAll(opts, callbackAll);

            if (row['userTypeId'] == '3') {
                //disabled add Event group button
                $("#MGEventAddBtnGroup").show();
            }
            else {
                //disabled add Event group button
                $("#MGEventAddBtnGroup").hide();
            }

        }
    }

    UserDB.selectByEmail(options, callback);

}

/**
 * do show Current Event information to edit
 */
function doShowDisplayEvent() {
    //get current Event id
    var eventId = getEventId();
    var options = [eventId];

    function callback(tx, results) {
        if (results.rows.length > 0) {
            var row = results.rows[0];
            var htmlcode = "";
            //make html code for list view
            htmlcode += "<li><a href='#MGEventEditPage' data-role='button' data-row-id='" + row['id'] + "' href='#'>" +
                "<div>Event Name: " + row['name'] + " (" + row['id'] + ")</div>" +
                "<p>Event Date: " + row['startDate'] + " ~ " + row['endDate'] + " | " +
                "Processing: " + row['processing'] + " | " +
                "Descritioon: " + row['description'] + "</p>" +
                "</a></li>";

            var lv = $("#MGEventDisplay").html(htmlcode);
            lv.listview("refresh");

        }
    }

    EventDB.select(options, callback);
}

/**
 * activate buttons by user authorization
 */
function doActivateButtonsDisplayEventPage(obj) {
    var obj = document.getElementById("MGEventDisplayForm");
    var userTypeName = getUserTypeName();

    $("#MGEventDisplayBtnModify").hide();
    $("#MGEventDisplayBtnJoin").show();
    if (userTypeName == "Manager") {
        $("#MGEventDisplayBtnModify").show();
        $("#MGEventDisplayBtnJoin").show();
    }
}

/**
 * Display Joined user List, Item list, and My Item list ..
 */
function doEventDisplayPageDetails() {
    //default variables
    var options = [];
    var eventId = getEventId();
    var userId = getLoginUserId();

    //Display Joined user lists (MGJoinEventDisplay)
    options = [eventId];

    function callbackJoinList(tx, results) {
        var htmlcode = "";
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var nickName = "Nick Name: " + row['nickName'];
            var jdate = "Join: " + getFormatDate(row['joinedDate']);
            var title = nickName + "\n" + jdate;
            htmlcode += "<li><a data-role='button' title='" + title + "' data-transition='' data-row-id='" + row['id'] + "' >" +
                "<p>" + nickName + "</p>" +
                "<p>" + jdate + "</p>" +
                "</a></li>";
        }

        var lv = $("#MGJoinEventDisplay").html(htmlcode);
        lv.listview("refresh", true);
    }

    JoinEventDB.selectJoinList(options, callbackJoinList);

    //Display Item List (MGEventItemDisplay)
    options = [eventId];

    function callbackEventItemList(tx, results) {
        var htmlcode = "";
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var itemName = "Item Name: " + row['itemName'];
            var quantity = "Quantity: " + row['quantity'];
            var price = "Price: " + row['price'];
            var sdate = getFormatDate(row['startDate']) + "~" + getFormatDate(row['endDate']);
            var title = itemName + "\n" + quantity + "\n" + price + "\n" + sdate;

            htmlcode += "<li><a data-role='button' title = '" + title + "' data-transition='' data-row-id='" + row['id'] + "," + row['price'] + "' >" +
                "<p>" + itemName + "</p>" +
                "<p>" + quantity + "</p>" +
                "<p>" + price + "</p>" +
                "<p>" + sdate + "</p>" +
                "</a></li>";
        }
        var lv = $("#MGEventItemDisplay").html(htmlcode);
        lv.listview("refresh", true);

        //row click event for saving item to event
        $("#MGEventItemDisplay a").on("click", clickHandlerEventItemDisplay);

        function clickHandlerEventItemDisplay() {
            if (confirm("Do you want to get this item?")) {
                var rowId = $(this).attr("data-row-id");
                var data = rowId.split(",");
                localStorage.setItem("itemId", data[0]);
                localStorage.setItem("price", data[1]);

                //first, check if the item is registered on event table
                var userId = getLoginUserId();
                var evntId = getEventId();
                var itemId = getItemId();
                var opts = [userId, evntId, itemId];

                function callbackExists(tx, results) {
                    if (results.rows.length > 0) {
                        alert("Item is already exists on Event table");
                    }
                    else {
                        //save item to event
                        var eId = getEventId();
                        var itmId = getItemId();
                        var userId = getLoginUserId();
                        var price = localStorage.getItem("price");
                        var options = [userId, eId, itmId, price, 1, new Date()];

                        function callbackInsert() {
                            alert("Item is attached on Event now!");
                        }

                        UserEventItemDB.insert(options, callbackInsert);
                    }
                }

                UserEventItemDB.existsUserEventItem(opts, callbackExists);
            }
        }
    }

    EventItemDB.selectEventItemList(options, callbackEventItemList);

    //Display My Items (MGGetEventItemDisplay) selectGetEventItemList
    options = [eventId, userId];

    function callbackUserEventItem(tx, results) {
        var htmlcode = "";
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var itemName = "Item Name: " + row['itemName'];
            var quantity = "Quantity: " + row['quantity'];
            var price = "Quantity: " + row['price'];
            var sdate = "Get: " + getFormatDate(row['getDate']);
            var title = itemName + "\n" + quantity + "\n" + sdate;

            htmlcode += "<li><a data-role='button' title = '" + title + "' data-transition='' data-row-id='" + row['id'] + "' >" +
                "<p>" + itemName + "</p>" +
                "<p>" + quantity + " " + price + "</p>" +
                "<p>" + sdate + "</p>" +
                "</a></li>";
        }

        var lv = $("#MGUserEventItemDisplay").html(htmlcode);
        lv.listview("refresh", true);
    }

    UserEventItemDB.selectUserEventItemList(options, callbackUserEventItem);
}

/**
 * move to Event Edit Page
 */
function goMGEventEditPage() {
    $.mobile.changePage("#MGEventEditPage", {transition: 'none'});
}

/**
 *
 */
function mGEventDisplayBtnJoin_click() {
    //add user to joinEvent table
    var eventId = getEventId();
    var userId = getLoginUserId();
    var options = [eventId, userId];

    function callback(tx, results) {
        if (results.rows.length > 0) {
            alert("You are already joined this Event");
        }
        else {
            var nickName = getNickName();
            if (nickName == "") nickName = "MARKET GO";

            //add join table
            var options = [eventId, userId, nickName, new Date(), null, null];

            function callback1() {
                alert("You joined this event now!");
            }

            JoinEventDB.insert(options, callback1);
        }

    }

    JoinEventDB.selectByEventIdAndUserId(options, callback);

}

/**
 * do show Current Event information to edit
 */
function doShowCurrentEvent() {
    //get current Event id
    var eventId = getEventId();
    var options = [eventId];

    function callback(tx, results) {
        if (results.rows.length > 0) {
            var row = results.rows[0];

            $("#MGEventEditName").val(row['name']);
            $("#MGEventEditStartDate").val(row['startDate']);
            $("#MGEventEditEndDate").val(row['endDate']);
            $("#MGEventEditDescription").val(row['description']);

            if (row['processing'] == 'true') {
                $("#MGEventEditProcessing").prop("checked", true);
            }

            $("#MGEventEditProcessing :checkbox").checkboxradio("refresh");
        }
    }

    EventDB.select(options, callback);
}

/**
 * show event item list on event edit page
 */
function doShowEventItemListOnEventEditPage() {
    //display free items for event
    showFreeItemList();

    //display joined items for event
    showJoinedItemList();

}

/**
 * show free item list for event
 */
function showFreeItemList() {
    var eventId = getEventId();
    var options = [];

    function callbackFreeItems(tx, results) {
        var htmlcode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var irow = results.rows[i];
            var itemId = "Item ID: " + irow['id'];
            var itemName = "Item Name: " + irow['name'];
            var sdate = "Date: " + irow['startDate'] + " ~ " + irow['endDate'];
            var category = "Category: " + getCategoryName(irow['categoryId']);
            var location = "location: " + irow['location'];
            var quantity = "Quantity: " + irow['quantity'];
            var title = itemId + "\n" + itemName + "\n" + sdate + "\n" + category + "\n" + location + "\n" + quantity;

            //make html code for list view
            htmlcode += "<li><a data-role='button' title='" + title + "' data-row-id='" + irow['id'] + "' href='#'>" +
                "<p>Item Name: " + irow['name'] + " (" + irow['id'] + ")</p>" +
                "<p>Date: " + irow['startDate'] + " ~ " + irow['endDate'] + "</p>" +
                "<p>Category: " + getCategoryName(irow['categoryId']) + "</p>" +
                "<p>location: " + irow['location'] + "</p>" +
                "<p>Quantity: " + irow['quantity'] + "</p>" +
                "</a></li>";
        }

        var lv = $("#MGNotJoinEventItemList").html(htmlcode);
        lv.listview("refresh");

        $("#MGNotJoinEventItemList a").on("click", clickFreeItemHandler);

        function clickFreeItemHandler() {
            //add item to event
            var cnfrm = confirm("Do you want to add this item to Event?");

            if (cnfrm) {
                var itemId = $(this).attr("data-row-id");
                var eventId = getEventId();
                var userId = getLoginUserId();

                var opts = [eventId, itemId, userId];

                function callbackInsertEventItem() {
                    console.info("Item is added to Event");
                }

                EventItemDB.insert(opts, callbackInsertEventItem);
                showJoinedItemList();
                showFreeItemList();
            }
        }
    }

    ItemDB.selectFreeItems(options, callbackFreeItems);
}

/**
 * show joined item list on Event
 */
function showJoinedItemList() {
    var eventId = getEventId();
    var options = [eventId];

    function callbackJoinedItems(tx, results) {
        var htmlcode = "";
        for (var i = 0; i < results.rows.length; i++) {
            var irow = results.rows[i];
            var itemId = "Item ID: " + irow['id'];
            var itemName = "Item Name: " + irow['name'];
            var sdate = "Date: " + irow['startDate'] + " ~ " + irow['endDate'];
            var category = "Category: " + getCategoryName(irow['categoryId']);
            var location = "location: " + irow['location'];
            var quantity = "Quantity: " + irow['quantity'];
            var title = itemId + "\n" + itemName + "\n" + sdate + "\n" + category + "\n" + location + "\n" + quantity;

            //make html code for list view
            htmlcode += "<li><a data-role='button' title='" + title + "' data-row-id='" + irow['eid'] + "' href='#'>" +
                "<p>Item Name: " + irow['name'] + " (" + irow['id'] + ")</p>" +
                "<p>Date: " + irow['startDate'] + " ~ " + irow['endDate'] + "</p>" +
                "<p>Category: " + getCategoryName(irow['categoryId']) + "</p>" +
                "<p>location: " + irow['location'] + "</p>" +
                "<p>Quantity: " + irow['quantity'] + "</p>" +
                "</a></li>";
        }

        var lv = $("#MGJoinEventItemList").html(htmlcode);
        lv.listview("refresh");

        $("#MGJoinEventItemList a").on("click", clickJoinedItemHandler);

        function clickJoinedItemHandler() {
            var cnfrm = confirm("Do you want to delete this item from Event?");

            if (cnfrm) {
                var eid = $(this).attr("data-row-id");
                var opts = [eid];

                function callbackDeleteEventItem() {
                    console.info("Item is now released!");
                }

                EventItemDB.delete(opts, callbackDeleteEventItem());
                showFreeItemList();
                showJoinedItemList();
            }
        };
    };

    ItemDB.selectJoinedItems(options, callbackJoinedItems);
}

/**
 * do validation for MGEventAddForm and
 * add Event information to database if data is valid
 */
function mgAddEvent() {
    if (doValidate_mGEventAddForm()) {
        console.info("Add Event Validation successful");

        var name = $("#MGEventAddName").val();
        var startDate = $("#MGEventAddStartDate").val();
        var endDate = $("#MGEventAddEndDate").val();
        var processing = $("#MGEventAddProcessing").val();
        var description = $("#MGEventAddDescription").val();

        var options = [
            name,
            startDate,
            endDate,
            processing,
            description];

        function callback() {
            alert("New Event Added");
        }

        EventDB.insert(options, callback);
    }
    else {
        console.info("Add Event Validation failed");
    }
}

/**
 * do validation for MGEventEditForm and
 * update Event information to database if data is valid
 */
function mgUpdateEvent() {
    if (doValidate_mGEventEditForm()) {
        console.info("Update Event Validation successful");

        var eventId = getEventId();
        var name = $("#MGEventEditName").val();
        var startDate = $("#MGEventEditStartDate").val();
        var endDate = $("#MGEventEditEndDate").val();
        var processing = $("#MGEventEditProcessing").val();
        var description = $("#MGEventEditDescription").val();

        var options = [
            name,
            startDate,
            endDate,
            processing,
            description,
            eventId];

        function callback() {
            alert("Event Updated successfully");
            $.mobile.changePage("#MGEventPage", {transition: 'none'});
        }

        EventDB.update(options, callback);
    }
    else {
        console.info("Update Event Validation failed");
    }
}

/**
 * delete Event information from database
 */
function mgDeleteEvent() {
    console.info("Delete Event Validation successful");
    var eventId = getEventId();

    var options = [eventId];

    function callback() {
        alert("Event Deleted successfully");
        $.mobile.changePage("#MGEventPage", {transition: 'none'});
    }

    EventDB.delete(options, callback);
}

/**
 * clear and move Event add page
 */
function doGoEventAddPage() {
    //move add Event page
    $.mobile.changePage("#MGEventAddPage", {transition: 'none'});

    //clear Event add page
    $("#MGEventAddName").val("");
    $("#MGEventAddStartDate").val("");
    $("#MGEventAddEndDate").val("");
    $("#MGEventAddDescription").val("");

    $("#MGEventAddProcessing").prop("checked", true);
    $("#MGEventAddProcessing :checkbox").checkboxradio("refresh");
}

/**
 * ================== Item Page =============================================
 */
/**
 * show item List
 */
function doShowItemPage() {
    //check admin user
    var loginemail = getUserEmail();

    var options = [loginemail];

    function callback(tx, result) {
        if (result.rows.length > 0) {
            var row = result.rows[0];

            if (row['userTypeId'] == '3') {
                //disabled add Item group button
                $("#MGItemAddBtnGroup").show();

                //display all Item
                var opts = [];

                function callbackAll(tx, results) {
                    var htmlcode = "";
                    for (var i = 0; i < results.rows.length; i++) {
                        var irow = results.rows[i];
                        //make html code for list view
                        htmlcode += "<li><a data-role='button' data-row-id='" + irow['id'] + "' href='#'>" +
                            "<div>Item Name: " + irow['name'] + " (" + irow['id'] +
                            ") Date: " + irow['startDate'] + " ~ " + irow['endDate'] +
                            "</div>" +
                            "<p>Category: " + getCategoryName(irow['categoryId']) + " " +
                            " location: " + irow['location'] + " " +
                            " Quantity: " + irow['quantity'] + "</p>" +
                            "</a></li>";

                    }

                    var lv = $("#MGItemList").html(htmlcode);
                    lv.listview("refresh");

                    $("#MGItemList a").on("click", clickHandler);

                    function clickHandler() {
                        localStorage.setItem("itemId", $(this).attr("data-row-id"));
                        $.mobile.changePage("#MGItemEditPage", {transition: 'none'});
                    }
                }

                ItemDB.selectAll(opts, callbackAll);
            }
            else {
                //disabled add Item group button
                $("#MGItemAddBtnGroup").hide();

                //display user Item
                var opts = [row['id']];

                function callbackAll(tx, results) {
                    var htmlcode = "";
                    for (var i = 0; i < results.rows.length; i++) {
                        var irow = results.rows[i];

                        //make html code for list view
                        htmlcode += "<li><a data-role='button' data-row-id='" + irow['id'] + "' href='#'>" +
                            "<div>Item Name: " + irow['name'] + " (" + irow['id'] +
                            ") Date: " + irow['startDate'] + " ~ " + irow['endDate'] +
                            "</div>" +
                            "<p>Category: " + getCategoryName(irow['categoryId']) + " " +
                            " location: " + irow['location'] + " " +
                            " Quantity: " + irow['quantity'] + "</p>" +
                            "</a></li>";

                    }

                    var lv = $("#MGItemList").html(htmlcode);
                    lv.listview("refresh");

                    $("#MGItemList a").on("click", clickHandler);

                    function clickHandler() {
                        localStorage.setItem("itemId", $(this).attr("data-row-id"));
                        $.mobile.changePage("#MGItemEditPage", {transition: 'none'});
                    }
                }

                ItemDB.selectByUserId(opts, callbackAll);

            }
        }
    }

    UserDB.selectByEmail(options, callback);

}

/**
 * do show Current Item information to edit
 */
function doShowCurrentItem() {
    //get current Item id
    var itemId = getItemId();
    var options = [itemId];

    function callback(tx, results) {
        if (results.rows.length > 0) {
            var row = results.rows[0];

            $("#MGItemEditName").val(row['name']);
            $("#MGItemEditCategoryId").val(row['categoryId']);
            $("#MGItemEditCategoryId").selectmenu("refresh", true);
            $("#MGItemEditLocation").val(row['location']);
            $("#MGItemEditLongitude").val(row['longitude']);
            $("#MGItemEditLatitude").val(row['latitude']);
            $("#MGItemEditPrice").val(row['price']);
            $("#MGItemEditQuantity").val(row['quantity']);
            $("#MGItemEditDiscountRate").val(row['discountRate']);
            $("#MGItemEditStartDate").val(row['startDate']);
            $("#MGItemEditEndDate").val(row['endDate']);

            var lat = Number(row['latitude']);
            var lng = Number(row['longitude']);
            //show google map on item Edit Page
            showGoogleMapEdit(lat, lng);
        }
    }

    ItemDB.select(options, callback);
}

/**
 * activate buttons by user authorization
 */
function doActivateButtonsEditItemPage(obj) {
    var obj = document.getElementById("MGItemEditForm");
    var userTypeName = getUserTypeName();

    $("#MGItemEditBtnUpdate").hide();
    $("#MGItemEditBtnDelete").hide();
    if (userTypeName == "Manager" || userTypeName == "Supplier") {
        $("#MGItemEditBtnUpdate").show();
        $("#MGItemEditBtnDelete").show();
    }
}

/**
 * do validation for MGItemAddForm and
 * add Item information to database if data is valid
 */
function mgAddItem() {
    $("#MGItemAddLongitude").val(mapMarker.position.lng());
    $("#MGItemAddLatitude").val(mapMarker.position.lat());

    var latitude = mapMarker.position.lat();
    if (doValidate_mGItemAddForm()) {
        console.info("Add Item Validation successful");

        var name = $("#MGItemAddName").val();
        var categoryId = $("#MGItemAddCategoryId").val();
        var location = $("#MGItemAddLocation").val();
        var longitude = $("#MGItemAddLongitude").val();
        var latitude = $("#MGItemAddLatitude").val();
        var price = $("#MGItemAddPrice").val();
        var quantity = $("#MGItemAddQuantity").val();
        var discountRate = $("#MGItemAddDiscountRate").val();
        var userId = getLoginUserId();
        var startDate = $("#MGItemAddStartDate").val();
        var endDate = $("#MGItemAddEndDate").val();

        var options = [
            name,
            categoryId,
            location,
            longitude,
            latitude,
            price,
            quantity,
            discountRate,
            userId,
            startDate,
            endDate];

        function callback() {
            alert("New Item Added");
        }

        ItemDB.insert(options, callback);
    }
    else {
        console.info("Add Item Validation failed");
    }
}

/**
 * do validation for MGItemEditForm and
 * update Item information to database if data is valid
 */
function mgUpdateItem() {
    $("#MGItemEditLongitude").val(mapMarker.position.lng());
    $("#MGItemEditLatitude").val(mapMarker.position.lat());

    if (doValidate_mGItemEditForm()) {
        console.info("Update Item Validation successful");

        var itemId = getItemId();
        var name = $("#MGItemEditName").val();
        var categoryId = $("#MGItemEditCategoryId").val();
        var location = $("#MGItemEditLocation").val();
        var longitude = $("#MGItemEditLongitude").val();
        var latitude = $("#MGItemEditLatitude").val();
        var price = $("#MGItemEditPrice").val();
        var quantity = $("#MGItemEditQuantity").val();
        var discountRate = $("#MGItemEditDiscountRate").val();
        var userId = getLoginUserId();
        var startDate = $("#MGItemEditStartDate").val();
        var endDate = $("#MGItemEditEndDate").val();

        var options = [
            name,
            categoryId,
            location,
            longitude,
            latitude,
            price,
            quantity,
            discountRate,
            userId,
            startDate,
            endDate,
            itemId];

        function callback() {
            alert("Item Updated successfully");
            $.mobile.changePage("#MGItemPage", {transition: 'none'});
        }

        ItemDB.update(options, callback);
    }
    else {
        console.info("Update Item Validation failed");
    }
}

/**
 * delete Item information from database
 */
function mgDeleteItem() {
    console.info("Delete Item Validation successful");
    var itemId = getItemId();

    var options = [itemId];

    function callback() {
        alert("Item Deleted successfully");
        $.mobile.changePage("#MGItemPage", {transition: 'none'});
    }

    ItemDB.delete(options, callback);
}

/**
 * clear and move Item add page
 */
function doGoItemAddPage() {
    //move add Item page
    $.mobile.changePage("#MGItemAddPage", {transition: 'none'});

    //clear item add page
    $("#MGItemAddName").val("");
    $("#MGItemAddCategoryId").val("1");
    $("#MGItemAddCategoryId").selectmenu("refresh", true);
    $("#MGItemAddLocation").val("");
    $("#MGItemAddPrice").val("");
    $("#MGItemAddQuantity").val("");
    $("#MGItemAddDiscountRate").val("");
    $("#MGItemAddUserId").val("");
    $("#MGItemAddStartDate").val("");
    $("#MGItemAddEndDate").val("");

}

/**
 * ================== User Page =============================================
 */
/**
 * show user List
 */
function doShowUserPage() {
    //check admin user
    var loginemail = getUserEmail();

    var options = [loginemail];

    function callback(tx, result) {
        if (result.rows.length > 0) {
            var row = result.rows[0];

            if (row['userTypeId'] == '3') {
                //disabled add user group button
                $("#MGUserAddBtnGroup").show();

                //display all user
                var opts = [];

                function callbackAll(tx, results) {
                    var htmlcode = "";
                    for (var i = 0; i < results.rows.length; i++) {
                        var irow = results.rows[i];
                        //make html code for list view
                        htmlcode += "<li><a data-role='button' data-row-id='" + irow['id'] + "' href='#'>" +
                            "<div>Name: " + irow['firstName'] + " " + irow['lastName'] + "</div>" +
                            "<p>User Email: " + irow['email'] + "</p>" +
                            "<p>User Type: " + getUserTypeName(irow['userTypeId']) + "</p>" +
                            "</a></li>";

                    }

                    var lv = $("#MGUserList").html(htmlcode);
                    lv.listview("refresh");

                    $("#MGUserList a").on("click", clickHandler);

                    function clickHandler() {
                        localStorage.setItem("userId", $(this).attr("data-row-id"));
                        $.mobile.changePage("#MGUserEditPage", {transition: 'none'});
                    }
                }

                UserDB.selectAll(opts, callbackAll);
            }
            else {
                //disabled add user group button
                $("#MGUserAddBtnGroup").hide();

                //display user only
                var htmlcode = "";

                //make html code for list view
                htmlcode += "<li><a data-role='button' data-row-id='" + row['id'] + "' href='#'>" +
                    "<div>Name: " + row['firstName'] + " " + row['lastName'] + "</div>" +
                    "<p>User Email: " + row['email'] + "</p>" +
                    "<p>User Type: " + getUserTypeName(row['userTypeId']) + "</p>" +
                    "</a></li>";

                var lv = $("#MGUserList").html(htmlcode);
                lv.listview("refresh");

                $("#MGUserList a").on("click", clickHandler);

                function clickHandler() {
                    localStorage.setItem("userId", $(this).attr("data-row-id"));
                    $.mobile.changePage("#MGUserEditPage", {transition: 'none'});
                }
            }
        }
    }

    UserDB.selectByEmail(options, callback);

}

/**
 * do show Current User information to edit
 */
function doShowCurrentUser() {
    //get current user id
    var userId = getUserId();
    var options = [userId];

    function callback(tx, results) {
        if (results.rows.length > 0) {
            var row = results.rows[0];

            $("#MGUserEditFirstName").val(row['firstName']);
            $("#MGUserEditLastName").val(row['lastName']);
            $("#MGUserEditEmail").val(row['email']);
            $("#MGUserEditPassword").val(row['password']);
            $("#MGUserEditUserType").val(row['userTypeId']);
            $("#MGUserEditUserType").selectmenu("refresh", true);
        }
    }

    UserDB.select(options, callback);
}

/**
 * do validation for MGUserAddForm and
 * add User information to database if data is valid
 */
function mgAddUser() {
    if (doValidate_mGUserAddForm()) {
        console.info("Add User Validation successful");

        var firstName = $("#MGUserAddFirstName").val();
        var lastName = $("#MGUserAddLastName").val();
        var email = $("#MGUserAddEmail").val();
        var password = $("#MGUserAddPassword").val();
        var userType = $("#MGUserAddType").val();

        var options = [
            firstName,
            lastName,
            email,
            password,
            userType];

        function callback() {
            alert("New User Added");
        }

        UserDB.insert(options, callback);
    }
    else {
        console.info("Add User Validation failed");
    }
}

/**
 * do validation for MGUserEditForm and
 * update User information to database if data is valid
 */
function mgUpdateUser() {
    if (doValidate_mGUserEditForm()) {
        console.info("Update User Validation successful");
        var userId = getUserId();
        var firstName = $("#MGUserEditFirstName").val();
        var lastName = $("#MGUserEditLastName").val();
        var email = $("#MGUserEditEmail").val();
        var password = $("#MGUserEditPassword").val();
        var userType = $("#MGUserEditType").val();

        var options = [
            firstName,
            lastName,
            email,
            password,
            userType,
            userId];

        function callback() {
            alert("User Updated successfully");
            $.mobile.changePage("#MGUserPage", {transition: 'none'});
        }

        UserDB.update(options, callback);
    }
    else {
        console.info("Update User Validation failed");
    }
}

/**
 * delete User information from database
 */
function mgDeleteUser() {
    console.info("Delete User Validation successful");
    var userId = getUserId();

    var options = [userId];

    function callback() {
        alert("User Deleted successfully");
        $.mobile.changePage("#MGUserPage", {transition: 'none'});
    }

    UserDB.delete(options, callback);
}

/**
 * clear and move user add page
 */
function doGoUserAddPage() {
    //move add user page
    $.mobile.changePage("#MGUserAddPage", {transition: 'none'});

    //clear user add page
    $("#MGUserAddFirstName").val("");
    $("#MGUserAddLastName").val("");
    $("#MGUserAddEmail").val("jkim5918@conestogac.on.ca");
    $("#MGUserAddPassword").val("");
    $("#MGUserAddPasswordRe").val("");
    $("#MGUserAddType").val("1");
    $("#MGUserAddType").selectmenu("refresh", true);
}


/**
 * ==================About Page =============================================
 */

/**
 * do log in for MGAboutForm
 */
function doValidateMGUserLogin() {
    //loginmessage = false;
    if (doValidate_mGUserLoginForm()) {
        console.info("Login Email Validation successful");

        //save default user login email address
        var email = $("#MGUserLoginEmail").val();
        var options = [email];

        var selectUserRow = function (user) {
            var options = [user['userTypeId']];

            function callback1(tx, typeResults) {
                var row = typeResults.rows[0];
                localStorage.setItem("MGUserLoginEmail", user['email']);
                localStorage.setItem("MGUserLoginId", user['id']);
                localStorage.setItem("MGUserLoginName", user['firstName'] + " " + user['lastName']);
                localStorage.setItem("userTypeName", row['name']);
                localStorage.setItem("userNickName", $("#MGUserLoginNickName").val());
                loginmessage = false;
                window.alert("Login user email saved: " + getUserEmail());
                $.mobile.changePage("#MGHomePage", {transition : "none"});
            }

            UserTypeDB.select(options, callback1);
        }

        function callback(tx, results) {

            if (results.rows.length == 0) {
                window.alert("Please register user information");
                $.mobile.changePage("#MGUserAddPage", {transition: 'none'});
            }
            else {
                var user = results.rows[0];
                var password = $("#MGUserLoginPassword").val();
                if (user['password'] == password) {
                    selectUserRow(user);
                }
                else {
                    window.alert("Please password is wrong");
                }
            }

        }

        //password check
        UserDB.selectByEmail(options, callback);

    }
    else {
        console.info("User Email Validation failed");
    }
}

/**
 * do clear tables for MGSettingForm
 */
function doClearMGSettingDatabase() {
    var del = confirm("Do you really want to clear database?");
    if (del) {
        try {
            DB.mgDropTables();
            alert("Database cleared");
        }
        catch (e) {
            alert(e);
        }
    }
}
