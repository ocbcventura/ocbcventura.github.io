///////////////////////////HAMBURGER
var menuButton = document.querySelector('.header-menu-button');
menuButton.addEventListener('click', menuTog);

function menuTog() {
    var headerWrapper = document.querySelector('.header-wrapper');
    var headerSpans = menuButton.querySelectorAll('span');
    this.classList.toggle('active-menu-button');
    $('body').toggleClass('body-not-scroll');
    headerWrapper.classList.toggle('active-menu');
    for (var i = 0; i < headerSpans.length; i++) {
        headerSpans[i].classList.toggle('active-span');
    }
}

//////////////////////NAVBAR RESIZE
$(document).ready(function(){
    if ($(window).width() > 768) {
        $(document).scroll(function () {
            var $nav = $(".navbar-fixed-top");
            $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
        });

        moveBackground();
        var $nav = $(".navbar-fixed-top");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
        dynamicDropdown(2);
        resetDynamicDropdown();
    } else {
        $(document).scroll(function () {
            var $nav = $(".navbar-fixed-top");
            $nav.removeClass('scrolled');
            $nav.toggleClass(' ', $(this).scrollTop() > $nav.height());
        });
        dynamicDropdown(2);
        resetDynamicDropdown();
    }
});
$(window).resize(function () {
    if ($(window).width() > 768) {
        $(document).scroll(function () {
            var $nav = $(".navbar-fixed-top");
            $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
        });

        moveBackground();
        var $nav = $(".navbar-fixed-top");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
        dynamicDropdown(2);
        resetDynamicDropdown();
    } else {
        $(document).scroll(function () {
            var $nav = $(".navbar-fixed-top");
            $nav.removeClass('scrolled');
            $nav.toggleClass(' ', $(this).scrollTop() > $nav.height());
        });
        dynamicDropdown(2);
        resetDynamicDropdown();
    }
});

///////////////////////////BACKGROUND ANIMATION
var lFollowX = 0,
    lFollowY = 0,
    x = 0,
    y = 0,
    friction = 1 / 30;

function moveBackground() {
    x += (lFollowX - x) * friction;
    y += (lFollowY - y) * friction;
  
    translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';
    $('.parallax-background').css({
        '-webit-transform': translate,
        '-moz-transform': translate,
        'transform': translate
    });
    window.requestAnimationFrame(moveBackground);
}

$(window).on('mousemove click', function(e) {
    var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
    var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
    lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
    lFollowY = (10 * lMouseY) / 100;
});

///////////////////////////TEAM DROPDOWN
function dynamicDropdown(countSeparateDiv) {
    var totalDiv = $(".team-content-wrapper").length;
    var separateDivEvery = countSeparateDiv;
    console.log('separateDivEvery '+separateDivEvery);

    $('.team-content-wrapper').unbind('click').click(function (event) {
        var clickedId = $(this).attr('id').split('team')[1];
        // console.log('clickedId '+clickedId);
        var positionId = (Math.ceil(clickedId/separateDivEvery)*separateDivEvery);
        // console.log('positionId '+positionId);
        var display = $('.team-detail-container').find('#detail'+clickedId);

        if(positionId <= totalDiv){
            if(display.length!=0){

            } else{
                $('.team-detail-container').slideUp('slow', function() {
                    $('.team-detail-container:hidden').remove();
                });
                $('#team'+positionId).after('<div class="col-sm-12 team-detail-container" id='+positionId+'><div class="team-detail-wrapper"></div></div>');  
                $('#'+positionId).html($(this).find(".detail-hidden").html());
                $('#'+positionId).slideDown('slow', function(){
                    $('html, body').stop().animate({
                        scrollTop: $('#'+positionId).offset().top - 90 
                    }, 1000);                    
                });
            }   
        } else{
            $('.team-detail-container').slideUp('slow', function() {
                $('.team-detail-container:hidden').remove();
            });
            $('#team'+totalDiv).after('<div class="col-sm-12 team-detail-container" id='+positionId+'><div class="team-detail-wrapper"></div></div>');  
            $('#'+positionId).html($(this).find(".detail-hidden").html());
            $('#'+positionId).slideDown('slow', function(){
                $('html, body').stop().animate({
                    scrollTop: $('#'+positionId).offset().top - 90 
                }, 1000);                    
            });            
        }
    });
    $(document).on('click', '.close-white', function (event) {
        $('.team-detail-container').slideUp('slow', function() {
            $('.team-detail-container:hidden').remove();
        });
        $('html, body').animate({
            scrollTop: $(".section8").stop().offset().top - 40 
        }, 1000);
    });
};
function resetDynamicDropdown(){
    $('.team-detail-container').slideUp('slow', function() {
        $('.team-detail-container').remove();
    });    
}
///////////////////////////AOS
// AOS.init();


///////////////////////////PREVIEW INPUT
function readFile(input) {
    if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
    var htmlPreview = 
    // '<img width="200" src="' + e.target.result + '" />'+
    '<p>' + input.files[0].name + '</p>';
    var wrapperZone = $(input).parent();
    var previewZone = $(input).parent().parent().find('.preview-zone');
    var boxZone = $(input).parent().parent().find('.preview-zone').find('.box').find('.box-body');

    wrapperZone.removeClass('dragover');
    previewZone.removeClass('hidden');
    boxZone.empty();
    boxZone.append(htmlPreview);
    };

    reader.readAsDataURL(input.files[0]);
    }
}

function reset(e) {
    e.wrap('<form>').closest('form').get(0).reset();
    e.unwrap();
}
$(".dropzone").change(function(){
    readFile(this);
});
$('.dropzone-wrapper').on('dragover', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).addClass('dragover');
});
$('.dropzone-wrapper').on('dragleave', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).removeClass('dragover');
});
$('.remove-preview').on('click', function() {
    var boxZone = $(this).parents('.preview-zone').find('.box-body');
    var previewZone = $(this).parents('.preview-zone');
    var dropzone = $(this).parents('.form-group').find('.dropzone');
    boxZone.empty();
    previewZone.addClass('hidden');
    reset(dropzone);
});