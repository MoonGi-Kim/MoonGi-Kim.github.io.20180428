/** Project: PROG3180 Programming: Mobile Applications
 * Purpose: Final Project
 *       - javascript for marketgoDAL function.
 *
 * Revision History
 *       - 2018.04.05 Created by Moon
 */

var EventDB = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO event( " +
                "name, " +
                "startDate, " +
                "endDate, " +
                "processing, " +
                "description ) " +
                "VALUES(?, ?, ?, ?, ?); ";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Event Insert transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE event SET " +
                "name = ?, " +
                "startDate = ?, " +
                "endDate = ?, " +
                "processing = ?, " +
                "description = ? " +
                "WHERE id = ?; ";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Event Update transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM event WHERE id = ?; ";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Event Delete transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM event WHERE id = ?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Event Select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM event;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Event SelectAll Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var JoinEventDB = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO joinEvent( " +
                "eventId, " +
                "userId, " +
                "nickName, " +
                "joinedDate, " +
                "droppedDate, " +
                "dropped ) " +
                "VALUES(?, ?, ?, ?, ?, ?); ";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: JoinEvent Insert transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE joinEvent SET " +
                "eventId = ?, " +
                "userId = ?, " +
                "nickName = ?, " +
                "joinedDate = ?, " +
                "droppedDate = ?, " +
                "dropped = ? " +
                "WHERE id = ?; ";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: JoinEvent Update transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM joinEvent WHERE id = ?; ";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: JoinEvent Delete transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM joinEvent WHERE id = ?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: JoinEvent Select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM joinEvent;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: JoinEvent SelectAll Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectByEventIdAndUserId: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM joinEvent WHERE eventId = ? and userId = ?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: JoinEvent selectByEventIdAndUserId transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectJoinList: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT " +
                "e.id, " +
                "e.name, " +
                "e.description, " +
                "j.nickName, " +
                "j.joinedDate, " +
                "j.droppedDate, " +
                "j.dropped, " +
                "u.firstName as firstName, " +
                "u.lastName as lastName " +
                "FROM joinEvent j, event e, user u " +
                "WHERE j.eventid = e.id " +
                "AND j.userid = u.id " +
                "AND j.eventId = ?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: JoinEvent selectByEventIdAndUserId transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};


var EventItemDB = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO eventItem( " +
                "eventId, " +
                "itemId, " +
                "managerId ) " +
                "VALUES(?, ?, ?); ";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: EventItem Insert transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE eventItem SET " +
                "eventId = ?, " +
                "itemId = ?, " +
                "managerId = ? " +
                "WHERE id = ?; ";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: EventItem Update transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM eventItem WHERE id = ?; ";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: EventItem Delete transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM eventItem WHERE id = ?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: EventItem Select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM eventItem;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: EventItem SelectAll Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    existsEventItem: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * " +
                "FROM eventItem " +
                "WHERE eventId = ? " +
                "AND itemId = ? " +
                ";";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: EventItem SelectAll Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectEventItemList: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT i.id, " +
                "i.name as itemName, " +
                "i.quantity, " +
                "i.price, " +
                "i.startDate, " +
                "i.endDate " +
                "FROM eventItem e, item i, user u " +
                "WHERE e.itemId = i.id " +
                "AND e.managerId = u.id " +
                "AND e.eventId = ? "
                ";";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: EventItem SelectAll Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var UserEventItemDB = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO userEventItem( " +
                "userId, " +
                "eventId, " +
                "itemId, " +
                "price, " +
                "quantity, " +
                "getDate ) " +
                "VALUES(?, ?, ?, ?, ?, ?); ";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Insert transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE userEventItem SET " +
                "userId = ?, " +
                "eventId = ?, " +
                "itemId = ?, " +
                "price = ?, " +
                "quantity = ?, " +
                "getDate = ? " +
                "WHERE id = ?; ";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: UserEventItem Update transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM userEventItem WHERE id = ?; ";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: UserEventItem Delete transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM userEventItem WHERE id = ?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: UserEventItem Select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM userEventItem;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: UserEventItem SelectAll Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectUserEventItemList: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT uei.id, " +
                "i.name as itemName, " +
                "uei.quantity, " +
                "uei.price, " +
                "uei.getDate " +
                "FROM userEventItem uei, item i " +
                "WHERE uei.itemId = i.id " +
                "AND uei.eventId = ? " +
                "AND uei.userId = ? " +
                ";";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: UserEventItem SelectAll Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    existsUserEventItem: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * " +
                "FROM userEventItem " +
                "WHERE userId = ? " +
                "AND eventId = ? " +
                "AND itemId = ? " +
                ";";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: EventItem SelectAll Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var ItemDB = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var sql = "INSERT INTO item( " +
                "name, " +
                "categoryId, " +
                "location, " +
                "longitude, " +
                "latitude, " +
                "price, " +
                "quantity, " +
                "discountRate, " +
                "userId, " +
                "startDate, " +
                "endDate ) " +
                "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Item Insert transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE item SET " +
                "name = ?, " +
                "categoryId = ?, " +
                "location = ?, " +
                "longitude = ?, " +
                "latitude = ?, " +
                "price = ?, " +
                "quantity = ?, " +
                "discountRate = ?, " +
                "userId = ?, " +
                "startDate = ?, " +
                "endDate = ? " +
                "WHERE id = ?; ";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Item Update transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM item WHERE id = ?; ";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Item Delete transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM item WHERE id = ?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Item Select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM item;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Item SelectAll Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectByUserId: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM item WHERE userId = ?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Item SelectAll Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectFreeItems: function(options, callback){
        function txFunction(tx) {
            var sql = "SELECT * " +
                "FROM item " +
                "WHERE id NOT IN "+
                "(SELECT itemId FROM eventItem) " +
                ";";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction(){
            console.info("Success: SelectFreeItems tansaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectJoinedItems: function(options, callback){
        function txFunction(tx) {
            var sql = "SELECT i.*, ei.id as eid " +
                "FROM item i, eventItem ei " +
                "WHERE i.id = ei.itemId " +
                "AND ei.eventId = ? "
                ";";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction(){
            console.info("Success: SelectJoinedItems tansaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var UserDB = {
    insert: function (options, callback) {

        insertRow = function (options) {
            db.transaction(function (tx) {
                var sql = "INSERT INTO user( " +
                    "firstName, " +
                    "lastName, " +
                    "email, " +
                    "password, " +
                    "userTypeId ) " +
                    "VALUES(?, ?, ?, ?, ?); ";

                tx.executeSql(sql, options);
            });
        }

        var opts = [options[2]];

        function callback(tx, results) {
            var len = results.rows.length;
            if (len == 0) {
                insertRow(options);
            }
            else {
                alert("user Email is already registered on user file.")
            }
        }

        UserDB.selectByEmail(opts, callback);

    },
    update: function (options, callback) {
        function txFunction(tx) {
            var sql = "UPDATE user SET " +
                "firstName = ?, " +
                "lastName = ?, " +
                "email = ?, " +
                "password = ?, " +
                "userTypeId = ? " +
                "WHERE id = ?; ";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: User Update transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM user WHERE email = ?; ";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: User Delete transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM user WHERE id = ?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: User Select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectByEmail: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM user WHERE email = ?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: User Select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM user;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: User SelectAll Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};


var UserTypeDB = {
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM userType " +
                "WHERE id = ?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successSelectTransaction() {
            console.info("Success: User Select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successSelectTransaction);
    },
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM userType;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: selectAll user types transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var CategoryDB = {
    select: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM category " +
                "WHERE id = ?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successSelectTransaction() {
            console.info("Success: User Select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successSelectTransaction);
    },
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM category;";

            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: selectAll category transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};