/** Project: PROG3180 Programming: Mobile Applications
 * Purpose: Final Project
 *       - javascript for database of marketgo function.
 *
 * Revision History
 *       - 2018.04.05 Created by Moon
 */

var db;

/**
 * General purpose error handler
 * @param tx The transaction object
 * @param error The error object
 */
function errorHandler(tx, error)
{
    console.error("SQL Error: " + tx + " (" + error.code + ") : " + error.message);
}

var DB = {
    mgCreateDatabase: function(){
        var name = "JJMKMarketGoDB";
        var version = "1.0";
        var displayName = "PROG3180-Final Project";
        var size = 2 * 1024 * 1024;

        function successCreate(){
            console.info("Success: Database created successfully.")
        }

        db = openDatabase(name, version, displayName, size, successCreate);
    },
    mgCreateTables: function(){
        function txFunction(tx){
            var options = [];
            var sql = "";

            //drop user types table
            sql = "DROP TABLE IF EXISTS userType;";
            function successDropUSERTYPE(){
                console.info("Success: user type Table dropped successfully");
            }
            tx.executeSql(sql, options, successDropUSERTYPE, errorHandler);

            //create user type table
            sql = "CREATE TABLE IF NOT EXISTS userType(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                "name VARCHAR(20) NOT NULL ); ";

            function sucessCreateUSERTYPE(){
                console.info("Success: created USER TYPE table successfully");
            }
            tx.executeSql(sql, options, sucessCreateUSERTYPE, errorHandler);

            //inset user types into table
            var types = ['User', 'Supplier', 'Manager'];
            sql = "INSERT INTO userType(name) VALUES(?); ";

            for(var i = 0; i<types.length; i++)
            {
                function successInsertThreeTYPE(input){
                    console.info("Success: '" + input  + "' user type is inserted successfully");
                }
                options = [types[i]];

                tx.executeSql(sql, options, successInsertThreeTYPE(types[i]), errorHandler);
            }

            //drop category table
            options=[];
            sql = "DROP TABLE IF EXISTS category;";
            function successDropCATEGORYBEFORINSERT(){
                console.info("Success: item category Table dropped successfully");
            }
            tx.executeSql(sql, options, successDropCATEGORYBEFORINSERT, errorHandler);

            //create category table
            var sql = "CREATE TABLE IF NOT EXISTS category(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                "name VARCHAR(20) NOT NULL ); ";

            function sucessCreateCATEGORY(){
                console.info("Success: created CATEGORY table successfully");
            }
            tx.executeSql(sql, options, sucessCreateCATEGORY, errorHandler);

            //insert category of item into category table
            var categories = ['Sports', 'Foods', 'Movies'];
            sql = "INSERT INTO category(name) VALUES(?); ";

            for(var i = 0; i<categories.length; i++)
            {
                function successInsertCATEGORY(input){
                    console.info("Success: '" + input  + "' category is inserted successfully");
                }
                options = [categories[i]];

                tx.executeSql(sql, options, successInsertCATEGORY(categories[i]), errorHandler);
            }

            //event table
            options = [];
            sql = "CREATE TABLE IF NOT EXISTS event(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                "name VARCHAR(50) NOT NULL, " +
                "startDate DATE NOT NULL, " +
                "endDate DATE NOT NULL, " +
                "processing VARCHAR(1), " +
                "description TEXT ); ";

            function sucessCreateEVENT(){
                console.info("Success: created EVENT table successfully");
            }
            tx.executeSql(sql, options, sucessCreateEVENT, errorHandler);

            //join event table
            options = [];
            sql = "CREATE TABLE IF NOT EXISTS joinEvent(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                "eventId INTEGER NOT NULL, " +
                "userId INTEGER NOT NULL, " +
                "nickName VARCHAR(50) NOT NULL, " +
                "joinedDate DATE, " +
                "droppedDate DATE, " +
                "dropped VARCHAR(1), " +
            "FOREIGN KEY(eventId) REFERENCES event(id)," +
            "FOREIGN KEY(userId) REFERENCES user(id) ); ";

            function sucessCreateJOINEVENT(){
                console.info("Success: created JOINEVENT table successfully");
            }
            tx.executeSql(sql, options, sucessCreateJOINEVENT, errorHandler);

            //Event item table
            options = [];
            sql = "CREATE TABLE IF NOT EXISTS eventItem(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                "eventId INTEGER NOT NULL, " +
                "itemId INTEGER NOT NULL, " +
                "managerId INTEGER NOT NULL, " +
                "FOREIGN KEY(eventId) REFERENCES event(id), " +
                "FOREIGN KEY(itemId) REFERENCES item(id), " +
                "FOREIGN KEY(managerId) REFERENCES user(id)); ";

            function sucessCreateEVENTITEM(){
                console.info("Success: created EVENT ITEM table successfully");
            }
            tx.executeSql(sql, options, sucessCreateEVENTITEM, errorHandler);

            //get user event item table
            options = [];
            sql = "CREATE TABLE IF NOT EXISTS userEventItem( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                "userId INTEGER, " +
                "eventId INTEGER NOT NULL, " +
                "itemId INTEGER NOT NULL, " +
                "price INTEGER, " +
                "quantity INTEGER, " +
                "getDate DATE, " +
                "UNIQUE (userId, eventId, itemId), " +
                "FOREIGN KEY(eventId) REFERENCES event(id), " +
                "FOREIGN KEY(itemId) REFERENCES item(id), " +
                "FOREIGN KEY(userId) REFERENCES user(id) ); ";

            function sucessCreateGETEVENTITEM(){
                console.info("Success: created GET EVENT ITEM table successfully");
            }
            tx.executeSql(sql, options, sucessCreateGETEVENTITEM, errorHandler);

            //item table
            options = [];
            sql = "CREATE TABLE IF NOT EXISTS item(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                "name VARCHAR(50) NOT NULL, " +
                "categoryId INTEGER, " +
                "location  VARCHAR(100), " +
                "longitude  float, " +
                "latitude  float, " +
                "price INTEGER, " +
                "quantity INTEGER, " +
                "discountRate INTEGER, " +
                "userId INTEGER, " +
                "startDate DATE, " +
                "endDate DATE, " +
                "FOREIGN KEY(categoryId) REFERENCES category(id), " +
                "FOREIGN KEY(userId) REFERENCES user(id)); ";

            function sucessCreateITEM(){
                console.info("Success: created ITEM table successfully");
            }
            tx.executeSql(sql, options, sucessCreateITEM, errorHandler);

            //========user table=========
            //drop table
            options = [];
            sql = "DROP TABLE IF EXISTS user;";

            function successInitilizeUser(input){
                console.info("Success: drop user table successfully");
            }
            tx.executeSql(sql, options, successInitilizeUser, errorHandler);

            sql = "CREATE TABLE IF NOT EXISTS user(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
                "firstName VARCHAR(50) NOT NULL, " +
                "lastName VARCHAR(50) NOT NULL, " +
                "email VARCHAR(50) NOT NULL, " +
                "password VARCHAR(50) NOT NULL, " +
                "userTypeId INTEGER, " +
                "UNIQUE(email), " +
                "FOREIGN KEY(userTypeId) REFERENCES userType(id)); ";

            function sucessCreateUSER(){
                console.info("Success: created USER table successfully");
            }
            tx.executeSql(sql, options, sucessCreateUSER, errorHandler);

            //insert default user into table
            sql = "INSERT INTO user(firstName, lastName, email, password, userTypeId) " +
                "VALUES('Moon', 'Kim', 'jkim5918@conestogac.on.ca', 'Conestoga1', 3); ";

            function successInsertDefaultUser(input){
                console.info("Success: Default user is inserted successfully");
            }

            options = [];
            tx.executeSql(sql, options, successInsertDefaultUser, errorHandler);

        }

        function successTransaction()
        {
            console.info("Success: Create tables transaction successful.");
        }
        db.transaction(txFunction, errorHandler, successTransaction);

    },
    mgDropTables: function(){
        function txFunction(tx) {
            var options = [];
            var sql = "DROP TABLE IF EXISTS type;";
            function successDropTYPE(){
                console.info("Success: type Table dropped successfully");
            }
            tx.executeSql(sql, options, successDropTYPE, errorHandler);

            var sql = "DROP TABLE IF EXISTS category;";
            function successDropCATEGORY(){
                console.info("Success: category Table dropped successfully");
            }
            tx.executeSql(sql, options, successDropCATEGORY, errorHandler);

            var sql = "DROP TABLE IF EXISTS event;";
            function successDropEVENT(){
                console.info("Success: event Table dropped successfully");
            }
            tx.executeSql(sql, options, successDropEVENT, errorHandler);

            var sql = "DROP TABLE IF EXISTS joinEvent;";
            function successDropJOINEVENT(){
                console.info("Success: joinEvent Table dropped successfully");
            }
            tx.executeSql(sql, options, successDropJOINEVENT, errorHandler);

            var sql = "DROP TABLE IF EXISTS eventItem;";
            function successDropEVENTITEM(){
                console.info("Success: eventItem Table dropped successfully");
            }
            tx.executeSql(sql, options, successDropEVENTITEM, errorHandler);

            var sql = "DROP TABLE IF EXISTS userEventItem;";
            function successDropUSEREVENTITEM(){
                console.info("Success: userEventItem Table dropped successfully");
            }
            tx.executeSql(sql, options, successDropUSEREVENTITEM, errorHandler);

            var sql = "DROP TABLE IF EXISTS item;";
            function successDropITEM(){
                console.info("Success: item Table dropped successfully");
            }
            tx.executeSql(sql, options, successDropITEM, errorHandler);

            var sql = "DROP TABLE IF EXISTS user;";
            function successDropUSER(){
                console.info("Success: user Table dropped successfully");
            }
            tx.executeSql(sql, options, successDropUSER, errorHandler);
        }
        function successDropTransaction(){
            console.info("Success: Drop table transaction successfully");
        }
        db.transaction(txFunction, errorHandler, successDropTransaction);
    }
};