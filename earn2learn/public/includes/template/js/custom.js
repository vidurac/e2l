/*************************************************************/
/**************** Commonly used js functions *****************/
/*************************************************************/

function Common() {
}

/*
 ***@doc Use to issue GET ajax request
 ***
 ***@param url : The yaws script path
 ***@param path : The yaws script path
 */
Common.prototype.getAjaxRequest = function (url) {
    var response = $.ajax({
        type: "get",
        url: url,
        cache: false,
        async: false,
        success: function (json) {
            return json;
        },
        error: function () {
            return '{"status":"error", "message":"ajax request fail"}';
        }
    }).responseText;

    return jQuery.parseJSON(response);
};

/*
 ***@doc Use to issue POST ajax request
 ***
 ***@param url : The yaws script path
 ***@param path : The yaws script path
 */
Common.prototype.postAjaxRequest = function (url, data) {
    var response = $.ajax({
        type: "post",
        url: url,
        async: false,
        dataType: "json",
        data: data,
        success: function (json) {
            return json;
        },
        error: function () {
            return '{"status":"error", "message":"ajax request fail"}';
        }
    }).responseText;

    return jQuery.parseJSON(response);
};

Common.prototype.setMessage = function (message_type, target, message) {
    $(target).html('<div class="alert alert-' + message_type + '">' +
            '<button type="button" class="close" data-dismiss="alert">×</button>' +
            message +
            '</div>').fadeIn().delay(4000).fadeOut();
};

var objCommon = new Common();

// THE SCRIPT THAT CHECKS IF THE KEY PRESSED IS A NUMERIC OR DECIMAL VALUE.
function isNumberOrDecimal(evt, element) {

    var charCode = (evt.which) ? evt.which : event.keyCode
    if (
            (charCode != 46 || $(element).val().indexOf('.') != -1) && // “.” CHECK DOT, AND ONLY ONE.
            (charCode < 48 || charCode > 57))
        return false;
    return true;
}   