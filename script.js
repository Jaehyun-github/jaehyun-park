var mHtml = $("html");
var page = 1;

mHtml.animate({scrollTop : 0}, 10);

var prevScrollTop = 1;
var nowScrollTop = 1;

    function wheelDelta(){
        return prevScrollTop - nowScrollTop > 0 ? 'up' : 'down';
    }
    $(window).on('scroll', function(){
        nowScrollTop = $(this).scrollTop();
            if(wheelDelta() == 'down'){
                $('#section1 h1').fadeOut();
                $('#section1 h2').fadeOut();
                $('#section1 h3').fadeOut();
            }
            if(wheelDelta() == 'up'){
                $('#section1 h1').fadeIn();
                $('#section1 h2').fadeIn();
                $('#section1 h3').fadeIn();
            }
    })

$('.nav_menu ul li a').click(function(e){

    var href = $(this).attr('href'); 
    var targetTop = $(href).offset().top;
        
    $('html').stop().animate({scrollTop:targetTop}, 700);
    page=$(this).parent("li").index()+1;
    e.preventDefault();
});

function Page__updateIndicatorActive(){

    var scrollTop = $(window).scrollTop();
    
    $($('.section').get().reverse()).each(function(index, node){

        var $node = $(this);
        var offsetTop = parseInt($node.attr('data-offset-top'));
        
        if (scrollTop >= offsetTop){
            $('.nav_menu ul li a.active').removeClass('active');
                    
            var currentPageIndex = $node.index();
            $('.nav_menu ul li a').eq(currentPageIndex).addClass('active');
            
            $('html').attr('data-current-page-index', currentPageIndex);
            return false;   
        }
    });
}

function Page__updateOffsetTop(){
    
    $('.section').each(function(index, node){

        var $page = $(node);
        var offsetTop = $page.offset().top;
        
        $page.attr('data-offset-top', offsetTop);
    });
    
    Page__updateIndicatorActive();
}

function Page__init(){
    Page__updateOffsetTop();
}

Page__init();

$(window).resize(Page__updateOffsetTop);

$(window).scroll(Page__updateIndicatorActive);

$(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 500) {
            $('.top').fadeIn();
        } else {
            $('.top').fadeOut();
        }
    })
        
    $(".top").click(function() {
        $('html, body').animate({
            scrollTop : 0
        }, 700);
        page=$(this).parent("li").index()+1;
        // page=$(this).html();
        return false;
    })
})


