$(document).ready(function() {
    resizeStatus();
    resizeTable();
});

$(window).on('resize', function (event) {
    resizeStatus();
    resizeTable();
});

function resizeTable() {

    var header = $('#headerID').height();
    var breadcrumbs = $('#container-full > #breadcrumbsID').height();
    var breadcrumbs_pt = parseInt($('#container-full > #breadcrumbsID').css('padding-top'));
    var breadcrumbs_mb = parseInt($('#container-full > #breadcrumbsID').css('margin-bottom'));
    var footer = $('#StatusNetwork1').height();
    var width = $(window).width();
    var height = $(window).height();
    var curHeight = height - header - breadcrumbs - breadcrumbs_pt - breadcrumbs_mb - footer;

    console.log("header: " + header);
    console.log("breadcrumbs: " + breadcrumbs);
    console.log("breadcrumbs padding-top: " + breadcrumbs_pt);
    console.log("breadcrumbs margin-bottom: " + breadcrumbs_mb);
    console.log("footer: " + footer);
    console.log("curHeight: " + curHeight);
    console.log("width: " + width);
    console.log("height: " + height);

    minCurHeight = curHeight;

    if(width <= 767) {
        curHeight = 100 + '%';
        minCurHeight = 100 + '%';
    }
    if($('#col_left').height() > curHeight && width > 767) {
        curHeight = $('#col_left').height();
        minCurHeight = 100 + '%';
    }

    $('.table-messages-out').height(curHeight);
    $('.table-messages-out').css('min-height',minCurHeight);
    $('#body_container').height(curHeight);
    $('#body_container').css('min-height',minCurHeight);

}

function resizeStatus() {

    $('.material-tooltip-main').tooltip({template: '<div class="tooltip md-tooltip"><div class="tooltip-arrow md-arrow"></div><div class="tooltip-inner md-inner"></div></div>'});

    var windowWidth = $(window).width();
    var qw;

    if (windowWidth < 1200) {
        $(".material-tooltip-main").each(function () {
            $(this).tooltip('enable');
        });

    } else {
        $(".material-tooltip-main").each(function () {
            $(this).tooltip('disable');
        });
    }

    if (windowWidth < 1200) {
        qw = (windowWidth - 9) / 7;
    } else {
        qw = (windowWidth - 9) / 14;
    }


    $(".q").css("width", qw + "px");

}