$(document).ready(function() {
    var $ = jQuery;
    $('#saveData').ajaxForm({
        url: $(this).attr('action'),
        type: 'post',
        dataType: 'json',
        beforeSend: function() {
            $("#btnloading").attr("value", "Sending...");
            $('#saveData #btn-submit').html('<span>PLEASE WAIT ...</span>');
            $('#saveData :input').attr('disabled', true);
        },
        success: function(response) {
            if (response.status != 'success') {
                $("#btnloading").attr("value", "Send");
                $('#saveData #btn-submit').html('<span>SUBMIT</span>');
                $('input[name="_cTName"]').val(response.token);
                $('#saveData :input').attr('disabled', false);
                $.each(response.message, function(key, val) {
                    $('span[for="' + key + '"]').html(val);
                });
            } else {
                $("#btnloading").attr("value", "Send");
                $('#saveData #btn-submit').html('<span>SUBMIT</span>');
                $('input[name="_cTName"]').val(response.token);
                setTimeout(function() {
                    $("html, body").animate({ scrollTop: 265 }, "slow");
                    location.reload();
                }, 1000);
                $('#saveData')[0].reset();
                $('textarea').val(" ");
                $('#saveData :input').attr('disabled', false);
            }
        }
    });

     $('#saveContactUs').ajaxForm({
        url: $(this).attr('action'),
        type: 'post',
        dataType: 'json',
        beforeSend: function() {
            $("#btnloading").attr("value", "Sending...");
            $('#saveData :input').attr('disabled', true);
        },
        success: function(response) {
            if (response.status != 'sendsuccess') {
                $("#btnloading").attr("value", "Send");
                $('input[name="_cTName"]').val(response.token);
                $('#saveData :input').attr('disabled', false);
                $.each(response.message, function(key, val) {
                    $('span[for="' + key + '"]').html(val);
                });
            } else {
                $("#btnloading").attr("value", "Send");
                $('input[name="_cTName"]').val(response.token);
                setTimeout(function() {
                    $("html, body").animate({ scrollTop: 265 }, "slow");
                    location.reload();
                }, 1000);
                $('#saveData')[0].reset();
                $('textarea').val(" ");
                $('#saveData :input').attr('disabled', false);
            }
        }
    });
});
