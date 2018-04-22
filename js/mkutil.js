/** Project: PROG3180 Programming: Mobile Applications
 * Purpose: Final Project
 *       - javascript for utilities function.
 *
 * Revision History
 *       - 2018.04.05 Created by Moon
 */

/**
 * Date format
 * @param input(date)
 * @returns {string| {yyyy-mm-dd}}
 */
function getFormatDate(input){
    var idate = new Date(input);
    var year = idate.getFullYear();
    var month = idate.getMonth()+1;
    var day = idate.getDate();

    return year+"/"+month+"/"+day;
}

/**
 * ================== Home Page =================================
 */

/**
 * ================== Event Page =================================
 */
/**
 * do validate for Event Add Form
 * @param
 * @returns valid
 */
function doValidate_mGEventAddForm() {
    var form = $("#MGEventAddForm");
    form.validate({
        rules:{
            MGEventAddName:{
                required: true,
                rangelength: [2, 50]
            },
            MGEventAddStartDate:{
                required: true,
                datecheck: true
            },
            MGEventAddEndDate:{
                required: true,
                datecheck: true,
                greaterThen: $("#MGEventAddStartDate").val()
            },
            MGEventAddDescription:{
                required: true,
                minlength: 2
            }
        },
        messages:{
            MGEventAddName:{
                required: "Event Name is required",
                rangelength: "Length must be 2-50 characters long"
            },
            MGEventAddStartDate:{
                required: "Start Date is required",
                datecheck: "Start Date must be greater than current date"
            },
            MGEventAddEndDate:{
                required: "End Date is required",
                datecheck: "End Date must be greater then current date",
                greaterThen: "End Date must be greater than start date"
            },
            MGEventAddDescription:{
                required: "Description is required",
                minlength: "Length must be 2 characters long"
            }
        }
    });

    return form.valid();
}

/**
 * do validate for Event Edit Form
 * @param
 * @returns valid
 */
function doValidate_mGEventEditForm() {
    var form = $("#MGEventEditForm");
    form.validate({
        rules:{
            MGEventEditName:{
                required: true,
                rangelength: [2, 50]
            },
            MGEventEditStartDate:{
                required: true,
                datecheck: true
            },
            MGEventEditEndDate:{
                required: true,
                datecheck: true,
                greaterThen: $("#MGEventEditStartDate").val()
            },
            MGEventEditDescription:{
                required: true,
                minlength: 2
            }
        },
        messages:{
            MGEventEditName:{
                required: "Event Name is required",
                rangelength: "Length must be 2-50 characters long"
            },
            MGEventEditStartDate:{
                required: "Start Date is required",
                datecheck: "Start Date must be greater than current date"
            },
            MGEventEditEndDate:{
                required: "End Date is required",
                datecheck: "End Date must be greater then current date",
                greaterThen: "End Date must be greater than start date"
            },
            MGEventEditDescription:{
                required: "Description is required",
                minlength: "Leng must be 2 characters long"
            }
        }
    });

    return form.valid();
}

/**
 * ================== Item Page =================================
 */
/**
 * Get Category Description
 */
function getCategoryName(idx) {
    var options = ['Sports','Foods','Movies'];
    return options[idx-1];
}

/**
 * do validate for Item Add Form
 * @param
 * @returns valid
 */
function doValidate_mGItemAddForm() {
    var form = $("#MGItemAddForm");
    form.validate({
        rules:{
            MGItemAddName:{
                required: true,
                rangelength: [2, 50]
            },
            MGItemAddCategoryId:{
                required: true
            },
            MGItemAddLocation:{
                required: true
            },
            MGItemAddLongitude:{
                required: true
            },
            MGItemAddLatitude:{
                required: true
            },
            MGItemAddPrice:{
                required: true
            },
            MGItemAddQuantity:{
                required: true,
                min: 1,
                max: 20
            },
            MGItemAddDiscountRate:{
                required: true,
                min: 1,
                max: 50
            },
            MGItemAddUserId:{
                required: true
            },
            MGItemAddStartDate:{
                required: true,
                datecheck: true
            },
            MGItemAddEndDate:{
                required: true,
                datecheck: true,
                greaterThen: $("#MGItemAddStartDate").val()
            }
        },
        messages:{
            MGItemAddName:{
                required: "Item Name is required",
                rangelength: "Length must be 2-50 characters long"
            },
            MGItemAddCategoryId:{
                required: "Item Category is required"
            },
            MGItemAddLocation:{
                required: "Location address is required"
            },
            MGItemAddLongitude:{
                required: "Longitude is required"
            },
            MGItemAddLatitude:{
                required: "Latitude is required"
            },
            MGItemAddPrice:{
                required: "Item Price is required"
            },
            MGItemAddQuantity:{
                required: "Item Quantity is required",
                min: "Quantity at least be 1. ",
                max: "Quantity less than 20."
            },
            MGItemAddDiscountRate:{
                required: "Item DiscountRate is required",
                min: "DiscountRate at least be 1. ",
                max: "DiscountRate less than 50."
            },
            MGItemAddUserId:{
                required: "User is required"
            },
            MGItemAddStartDate:{
                required: "Start Date is required",
                datecheck: "Start Date must be greater than current date"
            },
            MGItemAddEndDate:{
                required: "End Date is required",
                datecheck: "End Date must be greater than current date",
                greaterThen: "End Date must be greater than start date"
            }
        }
    });

    return form.valid();
}

/**
 * do validate for Item Edit Form
 * @param
 * @returns form.valid(true/false, message)
 */
function doValidate_mGItemEditForm(){
    var form = $("#MGItemEditForm");
    form.validate({
        rules:{
            MGItemEditName:{
                required: true,
                rangelength: [2, 50]
            },
            MGItemEditCategoryId:{
                required: true
            },
            MGItemEditLocation:{
                required: true
            },
            MGItemEditLongitude:{
                required: true
            },
            MGItemEditLatitude:{
                required: true
            },
            MGItemEditPrice:{
                required: true
            },
            MGItemEditQuantity:{
                required: true,
                min: 1,
                max: 20
            },
            MGItemEditDiscountRate:{
                required: true,
                min: 1,
                max: 50
            },
            MGItemEditUserId:{
                required: true
            },
            MGItemEditStartDate:{
                required: true,
                datecheck: true
            },
            MGItemEditEndDate:{
                required: true,
                datecheck: true,
                greaterThen: $("#MGItemAddStartDate").val()
            }
        },
        messages:{
            MGItemEditName:{
                required: "Item Name is required",
                rangelength: "Length must be 2-50 characters long"
            },
            MGItemEditCategoryId:{
                required: "Item Category is required"
            },
            MGItemEditLocation:{
                required: "Location address is required"
            },
            MGItemEditLongitude:{
                required: "Longitude is required"
            },
            MGItemEditLatitude:{
                required: "Latitude is required"
            },
            MGItemEditPrice:{
                required: "Item Price is required"
            },
            MGItemEditQuantity:{
                required: "Item Quantity is required",
                min: "Quantity at least be 1. ",
                max: "Quantity less than 20."
            },
            MGItemEditDiscountRate:{
                required: "Item DiscountRate is required",
                min: "DiscountRate at least be 1. ",
                max: "DiscountRate less than 50."
            },
            MGItemEditUserId:{
                required: "User is required"
            },
            MGItemEditStartDate:{
                required: "Start Date is required",
                datecheck: "Start Date must be greater than current date"
            },
            MGItemEditEndDate:{
                required: "End Date is required",
                datecheck: "End Date must be greater than current date",
                greaterThen: "End Date must be greater than start date"
            }
        }
    });

    return form.valid();
}

/**
 * ================== User Page =================================
 */
/**
 * Get User Type Name
 */
function getUserTypeName(idx) {
    var options = ['User','Supplier','Manager'];
    return options[idx-1];
}

/**
 * do validate for User Add Form
 * @param
 * @returns valid
 */
function doValidate_mGUserAddForm() {
    var form = $("#MGUserAddForm");
    form.validate({
        rules:{
            MGUserAddFirstName:{
                required: true,
                rangelength: [2, 50]
            },
            MGUserAddLastName:{
                required: true,
                rangelength: [2, 50]
            },
            MGUserAddEmail:{
                required: true,
                emailcheck: true //add validator
            },
            MGUserAddPassword:{
                required: true
            },
            MGUserAddPasswordRe:{
                required: true,
                equalTo: "#MGUserAddPassword"
            },
            MGUserAddType:{
                required: true
            }
        },
        messages:{
            MGUserAddFirstName:{
                required: "First Name is required",
                rangelength: "Length must be 2-50 characters long"
            },
            MGUserAddLastName:{
                required: "Last Name is required",
                rangelength: "Length must be 2-50 characters long"
            },
            MGUserAddEmail:{
                required: "Email address is required",
                emailcheck: "Please enter a valid email address" //add validator
            },
            MGUserAddPassword:{
                required: "Password is required"
            },
            MGUserAddPasswordRe:{
                required: "[Re] Password is required",
                equalTo: "Password does not match, re-enter"
            },
            MGUserAddType:{
                required: "User Type is required"
            }
        }
    });

    return form.valid();
}

/**
 * do validate for User Edit Form
 * @param
 * @returns form.valid(true/false, message)
 */
function doValidate_mGUserEditForm(){
    var form = $("#MGUserEditForm");
    form.validate({
        rules:{
            MGUserEditFirstName:{
                required: true,
                rangelength: [2, 50]
            },
            MGUserEditLastName:{
                required: true,
                rangelength: [2, 50]
            },
            MGUserEditEmail:{
                required: true,
                emailcheck: true //add validator
            },
            MGUserEditPassword:{
                required: true
            },
            MGUserEditPasswordRe:{
                required: true,
                equalTo: "#MGUserEditPassword"
            },
            MGUserEditType:{
                required: true
            }
        },
        messages:{
            MGUserEditFirstName:{
                required: "First Name is required",
                rangelength: "Length must be 2-50 characters long"
            },
            MGUserEditLastName:{
                required: "Last Name is required",
                rangelength: "Length must be 2-50 characters long"
            },
            MGUserEditEmail:{
                required: "Email address is required",
                emailcheck: "Please enter a valid email address" //add validator
            },
            MGUserEditPassword:{
                required: "Password is required"
            },
            MGUserEditPasswordRe:{
                required: "[Re] Password is required",
                equalTo: "Password does not match, re-enter"
            },
            MGUserEditType:{
                required: "User Type is required"
            }
        }
    });

    return form.valid();
}

/**
 * ================== About Page =================================
 */

/**
 * do validate for User Login Eamil on About Form
 * @param
 * @returns form.valid(true/false, message)
 */
function doValidate_mGUserLoginForm(){
    var form = $("#MGUserLoginForm");
    form.validate({
        rules:{
            MGUserLoginEmail:{
                required: true,
                emailcheck: true
            }
        },
        message:{
            required: "Default Reviewer Email Address is required",
            emailcheck: "Please enter a valid email address"
        }
    });

    return form.valid();

}

/**
 * ================== Add Validator Method ========================
 */
/**
 * add jquery validator method for Date
 * @param value, element
 * @returns true/false
 */
jQuery.validator.addMethod(
    "datecheck",
    function(value, element){
        var d = new Date();
        var cdate = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();

        if (Date.parse(cdate) <= Date.parse(value) && value != cdate)
        {
            return true;
        }
        else
        {
            return false;
        }
    },
    "date must be greater then current date"
);

/**
 * add jquery validator method for End Date
 * @param value, element, param
 * @returns true/false
 */
jQuery.validator.addMethod(
    "greaterThen",
    function(value, element, param){
        if (Date.parse(param) >= Date.parse(value) || param == value)
        {
            return false;
        }
        else
        {
            return true;
        }
    },
    "End Date must be greater then start date"
);

/**
 * add jquery validator method for email address
 * @param value, element
 * @returns true/false
 */
jQuery.validator.addMethod(
    "emailcheck",
    function(value, element){
        //var regex = /^.+conestogac.on.ca$/;
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return this.optional(element) || regex.test(value);
    },
    "Please enter a valid email address"
);

/**
 * add jquery validator method for Quality
 * @param value, element
 * @returns true/false
 */
jQuery.validator.addMethod(
    "inputvaluecheck",
    function(value, element){
        if (value >= 0 && value <= 5)
        {
            return true;
        }
        else
        {
            return false;
        }
    },
    "value must be 0-5"
);
