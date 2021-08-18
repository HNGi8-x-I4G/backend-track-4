(function ($) {
    "use strict";
    // Form
    var contactForm = function () {
        if ($('#contactForm').submit(function (e) {
            e.preventDefault();

            var $submit = $('.submitting'),
                waitText = 'Submitting...';
            $.ajax({
                type: "POST",
                url: $('#contactForm').attr('action'),
                data: JSON.stringify($('#contactForm').serialize()),
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',

                beforeSend: function () {
                    $submit.css('display', 'block').text(waitText);
                },
                success: function (response) {
                    console.log(response);
                    if (response['valid']) {
                        $('#form-message-warning').hide();
                        setTimeout(function () {
                            $('#contactForm').fadeIn();
                        }, 1000);
                        setTimeout(function () {
                            Email.send({
                                Host: "smtp.elasticemail.com",
                                Username: "mewpit@mailpoof.com",
                                Password: "46ECFF416EFFDA74A811397DF3E2D8E8DD3A",
                                To: 'mewpit@mailpoof.com',
                                From: "mewpit@mailpoof.com",
                                Subject: "Subject" + response['subject'],
                                Body: "Body" + response['name'] + '<br />'
                                    + response['email'] + '<br />'
                                    + response['message']
                            }).then(
                                swal("Thank you", "Your message was sent!", "success")
                            );
                        }, 1400);

                        setTimeout(function () {
                            $('#form-message-success').fadeOut();
                        }, 8000);

                        setTimeout(function () {
                            $submit.css('display', 'none').text(waitText);
                        }, 1400);

                        setTimeout(function () {
                            $('#contactForm').each(function () {
                                this.reset();
                            });
                        }, 1400);

                    } else {
                        $('#form-message-warning').html(response);
                        $('#form-message-warning').fadeIn();
                        $submit.css('display', 'none');
                    }
                },
                error: function () {
                    $('#form-message-warning').html("Something went wrong. Please try again.");
                    $('#form-message-warning').fadeIn();
                    $submit.css('display', 'none');
                }
            });

        }));
    };
    contactForm();

})(jQuery);