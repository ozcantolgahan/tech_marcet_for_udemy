$(document).ready(function(){
$(".social-media-animation").each(function(){
    $(this).mouseenter(function(){
        let img=$(this).children()[0];
        $(img).animate({top:"-10%"},"slow");
    });
    $(this).mouseleave(function(){
        let img=$(this).children()[0];
        $(img).animate({top:"10%"},"slow");
    });
});
});