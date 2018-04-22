/** Project: PROG3180 Programming: Mobile Applications
 * Purpose: Final Project
 *       - javascript for all global function.
 *
 * Revision History
 *       - 2018.04.05 Created by Moon
 */

/**
 * ================== Home Page =============================================
 */
/**
 * localStorage data clear
 */
function mGClearLocalStorage()
{
    localStorage.clear();
}

/**
 * ================== Common on Page =============================================
 */
/**
 * go to add Event page
 * @param val - temp
 */
function goEventAddPage(val)
{
    doGoEventAddPage;
}

/**
 * go to add Item page
 * @param val - temp
 */
function goItemAddPage(val)
{
    doGoItemAddPage;
}

/**
 * go to add User page
 * @param val - temp
 */
function goUserAddPage(val)
{
    doGoUserAddPage();
}


/**
 * ================== Event Page =============================================
 */
/**
 * click Event Page Show
 */
function mGEventPage_show() {
    //login check
    if (doCheckLoginEmailAddress()) {
        doShowEventPage();
    }
}

/**
 * when click Event list on Event list page
 */
function mGEventDisplayPage_show(){
    //display event information
    doShowDisplayEvent();
    //show/hide control button
    doActivateButtonsDisplayEventPage();
    //display related list
    doEventDisplayPageDetails();
}

/**
 * when click Event list on Event display page
 */
function mGEventEditPage_show() {
    //show current event
    doShowCurrentEvent();

    //show Event Item List
    doShowEventItemListOnEventEditPage();
}

/**
 * click Update button on Event Edit Form
 */
function mGEventDisplayBtnModify_click() {
    goMGEventEditPage();
}

/**
 * click Save button on Event Add Form
 */
function mGEventAddBtnSave_click() {
    mgAddEvent();
}

/**
 * click Update button on Event Edit Form
 */
function mGEventEditBtnUpdate_click() {
    mgUpdateEvent();
}

/**
 * click delete button on Event Edit Form
 */
function mGEventEditBtnDelete_click() {
    mgDeleteEvent();
}


/**
 * ================== Item Page =============================================
 */
/**
 * click Item Page Show
 */
function mGItemPage_show() {
    //login check
    if (doCheckLoginEmailAddress()) {
        doShowItemPage();
    }
}

/**
 * show google map when item add page is opened
 */
function mGItemAddPage_show(){
    //show google map
    showGoogleMap();
}

/**
 * when click Item list on Item page
 */
function mGItemEditPage_show() {
    //setting Category Type
    mkUpdateUserTypesDropdown($("#MGItemEditCategoryId"));
    //Show current Item info.
    doShowCurrentItem();
}

/**
 * click Save button on Item Add Form
 */
function mGItemAddBtnSave_click() {
    //setting Category Type
    mkUpdateUserTypesDropdown($("#MGItemAddCategoryId"));
    //show empty screen for new item info.
    mgAddItem();
}

/**
 * click Update button on Item Edit Form
 */
function mGItemEditBtnUpdate_click() {
    mgUpdateItem();
}

/**
 * click delete button on Item Edit Form
 */
function mGItemEditBtnDelete_click() {
    mgDeleteItem();
}


/**
 * ================== User Page =============================================
 */
/**
 * click User Page Show
 */
function mGUserPage_show() {
    //login check
    if (doCheckLoginEmailAddress()) {
        doShowUserPage();
    }
}

/**
 * when click user list on user page
 */
function mGUserEditPage_show() {
    //setting User Type
    mkUpdateUserTypesDropdown($("#MGUserEditType"));
    //Show current user information
    doShowCurrentUser();
}

/**
 * click Save button on User Add Form
 */
function mGUserAddBtnSave_click() {
    //setting User Type
    mkUpdateUserTypesDropdown($("#MGUserAddType"));
    //show empty screen for new user info.
    mgAddUser();
}

/**
 * click Update button on User Edit Form
 */
function mGUserEditBtnUpdate_click() {
    mgUpdateUser();
}

/**
 * click delete button on User Edit Form
 */
function mGUserEditBtnDelete_click() {
    mgDeleteUser();
}

/**
 * ================== About Page =============================================
 */
/**
 * click User Login button on About Form
 */
function mGUserLogin_click() {
    doValidateMGUserLogin();
}

/**
 * click Clear Setting Button on About form
 */
function mGSettingClearDatabase_click() {
    doClearMGSettingDatabase();
}


/**
 * init function
 */
function init() {

    //initilize Home page (localStorage)
    mGClearLocalStorage();

    //Event Page
    //Event page show event
    $("#MGEventPage").on("pageshow", mGEventPage_show);

    //Event display page show event
    $("#MGEventDisplayPage").on("pageshow", mGEventDisplayPage_show);

    //Event Edit page show event
    $("#MGEventEditPage").on("pageshow", mGEventEditPage_show);

    //click join event on MGEventDisplay Form to move to Event Edit Form
    $("#MGEventDisplayBtnModify").on("click", mGEventDisplayBtnModify_click);

    //click join event on MGEventDisplay Form to join event
    $("#MGEventDisplayBtnJoin").on("click", mGEventDisplayBtnJoin_click);

    //click Save button on MGEventAddForm
    $("#MGEventAddBtnSave").on("click", mGEventAddBtnSave_click);

    //click Save button on MGEventEditForm
    $("#MGEventEditBtnUpdate").on("click", mGEventEditBtnUpdate_click);

    //click Delete button on MGEventEditForm
    $("#MGEventEditBtnDelete").on("click", mGEventEditBtnDelete_click);

    //Item Page
    //Item page show event
    $("#MGItemPage").on("pageshow", mGItemPage_show);

    //Item Add page show event
    $("#MGItemAddPage").on("pageshow", mGItemAddPage_show);

    //Item Edit page show event
    $("#MGItemEditPage").on("pageshow", mGItemEditPage_show);

    //click Save button on MGItemAddForm
    $("#MGItemAddBtnSave").on("click", mGItemAddBtnSave_click);

    //click Save button on MGItemEditForm
    $("#MGItemEditBtnUpdate").on("click", mGItemEditBtnUpdate_click);

    //click Delete button on MGItemEditForm
    $("#MGItemEditBtnDelete").on("click", mGItemEditBtnDelete_click);


    //User Page
    //User page show event
    $("#MGUserPage").on("pageshow", mGUserPage_show);

    //User Edit page show event
    $("#MGUserEditPage").on("pageshow", mGUserEditPage_show);

    //click Save button on MGUserAddForm
    $("#MGUserAddBtnSave").on("click", mGUserAddBtnSave_click);

    //click Save button on MGUserEditForm
    $("#MGUserEditBtnUpdate").on("click", mGUserEditBtnUpdate_click);

    //click Delete button on MGUserEditForm
    $("#MGUserEditBtnDelete").on("click", mGUserEditBtnDelete_click);


    //About Page
    //click Save Defaults reviewer eamil button on Setting page
    $("#MGUserLogin").on("click", mGUserLogin_click);

    //click Clear Button on Setting page
    $("#MGSettingClearDatabase").on("click", mGSettingClearDatabase_click);

}

/**
 * init database
 */
function initDB() {
    console.info("Start creating Database....");
    try {
        DB.mgCreateDatabase();
        if (db) {
            DB.mgCreateTables();
            console.info("Database was created successfully");
        }
        else {
            console.error("Error: Cannot create tables: Database not avaiable.");
        }
    } catch (e) {
        console.error("Error: (Fatal) Error in initDB(). Cannot proceed.");
    }
}

/**
 * ready to html document
 */
$(document).ready(function () {
    init();
    initDB();
});

