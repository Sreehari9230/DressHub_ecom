$(document).ready(function () {
    "use strict";
        // Animate loader off screen
        $( ' .preloader' ).fadeOut("slow");
        setTimeout(function(){ $('.preloader').fadeOut('slow'); }, 3000);
    });

    
// ........................................................................HOME.........................................................................

//plus minus quantity
$('.btn-number').click(function(e){
    e.preventDefault();
    
    fieldName = $(this).attr('data-field');
    type      = $(this).attr('data-type');
    var input = $("input[name='"+fieldName+"']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if(type == 'minus') {
            
            if(currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            } 
            if(parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if(type == 'plus') {

            if(currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if(parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});
$('.input-number').focusin(function(){
   $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {
    
    minValue =  parseInt($(this).attr('min'));
    maxValue =  parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());
    
    name = $(this).attr('name');
    if(valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    
});
//plus minus quantity


// special product
$('#fullcarousel').owlCarousel({
  // loop: true,  
  pagination:false,
  navigation:false,
  nav: true,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>"
  ],
  autoplay: false,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1
    }
  }
})


// top product

$(document).ready(function() {
  $("#product_carousel2").owlCarousel({
  itemsCustom : [
     [0, 1],
    [375,2],
    [600, 3],
    [768,4],
    [1200,4]
    ],
    //autoPlay: 6000,
    loop: true,
    navigationText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
    navigation : true,
    pagination:false
  });
  });

$(document).ready(function() {
  $("#product_carousel1").owlCarousel({
  itemsCustom : [
   [0, 1],
    [375,2],
    [600, 3],
    [768,4],
    [1200,4]
    ],
    //autoPlay: 6000,
    loop: true,
  navigationText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
    navigation : true,
    pagination:false
  });
  });

$(document).ready(function() {
  $("#product_carousel3").owlCarousel({
  itemsCustom : [
    [0, 1],
    [375,2],
    [600, 3],
    [768,4],
    [1200,4]
    ],
    //autoPlay: 6000,
    loop: true,
    navigationText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
    navigation : true,
    pagination:false
  });
  });

// lastest carousel

$(document).ready(function() {
  $("#lastest_carousel").owlCarousel({
  itemsCustom : [
     [0, 1],
    [375,2],
    [600, 3],
    [768,4],
    [1200,4]
    ],
    //autoPlay: 6000,
    loop: true,
    navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    navigation : false,
    pagination:false
  });
});

//home page Silder
$('#silder_carousel').owlCarousel({
  // loop: true,  
  autoPlay: 3000,
      animateIn: 'fadeIn',
      animateOut: 'fadeOut',
      loop: false,
      navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
      navigation : false,
      pagination:true,
  responsive: {
    0: {
      items: 1
    },
    380: {
      items: 1
    },
    576: {
      items: 1
    },
    992: {
      items: 1
    },
    1409: {
      items: 1
    },
    1850: {
      items: 1
    }
  }
})

$('#top_carousel').owlCarousel({
  loop: true,  
  pagination:false,
  navigation:false,
  nav: false,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>"
  ],
  autoplay: false,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 2
    },
    480: {
      items: 3
    },
    600: {
      items: 3
    },
    992: {
      items: 4
    },
    1200: {
      items: 6
    },
    1410: {
      items: 7
    },
    1850: {
      items: 8
    }
  }
})

//cat style2 carousel
$(document).ready(function() {
  $("#cat_style2_carousel").owlCarousel({
  itemsCustom : [
    [0, 1],
    [575, 1],
    [575, 2],
    [992, 3]
    ],
    //autoPlay: 6000,
    loop: true,
    navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    navigation : true,
    pagination:false
  });
});

  // headphones and bluetooth


$('#head_blue_carousel').owlCarousel({
  // loop: true,  
  pagination:false,
  navigation:false,
  nav: false,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>"
  ],
  autoplay: false,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1
    },
    576: {
      items: 2
    },
    992: {
      items: 2
    },
    1200: {
      items: 3
    },
    1410: {
      items: 3
    },
    1850: {
      items: 3
    }
  }
})

// smartwatch & mobile


$('#smart_carousel').owlCarousel({
  // loop: true,  
  pagination:false,
  navigation:false,
  nav: true,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>"
  ],
  autoplay: false,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1
    },
    576: {
      items: 2
    },
    992: {
      items: 2
    },
    1200: {
      items: 3
    },
    1410: {
      items: 3
    },
    1850: {
      items: 3
    }
  }
})
  

// blog 

$(document).ready(function() {
  $("#blog_carousel").owlCarousel({
  itemsCustom : [
    [0, 1],
    [640,2],
    [992,1]
    ],
    autoPlay: 3000,
    loop: true,
    navigationText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
    navigation : true,
    pagination:false
  });
});
  

// brand-logo                                               
$(document).ready(function() {
  $("#logo_carousel").owlCarousel({
  itemsCustom : [
    [0, 3],
    [640,4],
    [991,5],
    [1200,5],
    [1410,5],
    [1840,6]
    ],
    //autoPlay: 6000,
    loop: true,
    navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    navigation : false,
    pagination:false
  });
});

// testimonials

$(document).ready(function() {
  $("#testimonial_carousel").owlCarousel({
  itemsCustom : [
    [0, 1],
    [640,2],
    [1599,2]
    ],
    //autoPlay: 6000,
    loop: true,
    navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    navigation : false,
    pagination:true
  });
});



/* menu more */

$(document).ready(function(){
if (($(document).width() >= 1410)){
     var count_block = $(' .h_menu  .level-1').length;
     var number_blocks = 10;
     if(count_block < number_blocks){
          return false; 
     } else {
          
          $('  .h_menu  .level-1').each(function(i,n){
                if(i == number_blocks) {
                     $('  .h_menu ').append('<li class="view_more"><a><i class="fa fa-plus"></i><span>More</span></a></li>');
                }
                if(i> number_blocks) {
                     $(this).addClass('wr_hide_menu');
                }
          })
          $('.wr_hide_menu').hide();
          $('.view_more').click(function() {
                $(this).toggleClass('active');
                $('.wr_hide_menu').slideToggle();
          });
     }
}
});

$(document).ready(function(){
if (($(document).width() >= 1200) && ($(document).width() <= 1409)){
     var count_block = $(' .h_menu  .level-1').length;
     var number_blocks = 9;
     if(count_block < number_blocks){
          return false; 
     } else {
          
          $('  .h_menu  .level-1').each(function(i,n){
                if(i == number_blocks) {
                     $('  .h_menu ').append('<li class="view_more"><a><i class="fa fa-plus"></i><span>More</span></a></li>');
                }
                if(i> number_blocks) {
                     $(this).addClass('wr_hide_menu');
                }
          })
          $('.wr_hide_menu').hide();
          $('.view_more').click(function() {
                $(this).toggleClass('active');
                $('.wr_hide_menu').slideToggle();
          });
     }
}
});

$(document).ready(function(){
if (($(document).width() >= 992) && ($(document).width() <= 1199)){
     var count_block = $('  .h_menu  .level-1').length;
     var number_blocks = 6  ;
     if(count_block < number_blocks){
          return false; 
     } else {
          
          $('  .h_menu  .level-1').each(function(i,n){
                if(i == number_blocks) {
                     $('  .h_menu ').append('<li class="view_more"><a><i class="fa fa-plus"></i><span>More</span></a></li>');
                }
                if(i> number_blocks) {
                     $(this).addClass('wr_hide_menu');
                }
          })
          $('.wr_hide_menu').hide();
          $('.view_more').click(function() {
                $(this).toggleClass('active');
                $('.wr_hide_menu').slideToggle();
          });
     }
}
});

/* menu more */

/* responsive menu */
function openNav() {
    $('body').addClass("active");
    document.getElementById("mySidenav").style.width = "280px";
}
function closeNav() {
    $('body').removeClass("active");
    document.getElementById("mySidenav").style.width = "0";
}
/* responsive menu */


// append-header

$(document).ready(function () {
   if($(window).width() < 992) {
        $( ".input-class" ).appendTo( ".header-top " ); 
        $( ".navbar-header" ).appendTo( ".head-logo" );
        $( ".md_acc" ).appendTo( ".md_login " );
        $( ".md_compare" ).appendTo( ".md_login " );
        $( ".md_wish" ).appendTo( ".md_login " );
        $( ".md_1" ).appendTo( ".md_login " );
        $( ".md_2" ).appendTo( ".md_login " );
     }
 });
// append-header

$('.user span').click(function(event){
  $(this).toggleClass('active');
  event.stopPropagation();
  $(".head_").slideToggle("fast");
  return false;
});
 
// ..................................................................HOME...............................................................


// ........................................SINGLE PRODUCT PAGE....................................................................



//cart product remove
     	$( document ).ready(function(){

		  $( ".cart_cross" ).click(function() {
		    $(this).fadeOut( "slow", function() {
		      // After animation completed:
		      $(this).remove();
		    });
		    $( this ).fadeOut( "slow", function() {
		      // After animation completed:
		      $( this ).remove();
		    });
		  });

      $( ".wblastcart" ).click(function() {
          $(this).parent().remove();
      });

		 });



//cart-page product remove
      $( document ).ready(function(){

      $( ".cart_cart_cross" ).click(function() {
        $(this).fadeOut( "slow", function() {
          // After animation completed:
          $(this).remove();
        });
        $( this ).fadeOut( "slow", function() {
          // After animation completed:
          $( this ).remove();
        });
      });

      $( ".cart_p_remove" ).click(function() {
          $(this).parent().remove();
      });

     });


      $( document ).ready(function(){
        $( ".view-cart-d" ).click(function() {
          $(this).fadeOut( "slow", function() {
            // After animation completed:
            $(this).remove();
          });
          $( this ).fadeOut( "slow", function() {
            // After animation completed:
            $( this ).remove();
          });
        });

         $( ".cart_p_remove1" ).click(function() {
          $(this).parent().remove();
      });

       });  




// append-header

$(document).ready(function () {
   if($(window).width() > 991) {
         $( "#sp_vertical_menu .vertical_menu " ).insertBefore( "#sp_header_top .col-lg-9.text-left" );
        }
 });


//product carousel

$('#sp_pro_carousel').owlCarousel({
  loop: true,  
  pagination:false,
  navigation:false,
  nav: true,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>"
  ],
  autoplay: false,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 2
    },
    381: {
      items: 3
    },
    600: {
      items: 4
    },
    768: {
      items: 3
    },
    1200: {
      items: 3
    },
    1410: {
      items: 4
    },
    1850: {
      items: 4
    }
  }
})

//onclick image

function myFunction(imgs) {
  var expandImg = document.getElementById("expandedImg");
  expandImg.src = imgs.src;
  imgText.innerHTML = imgs.alt;
  expandImg.parentElement.style.display = "block";
}

//related product

$(document).ready(function() {
  $("#related_product_carousel").owlCarousel({
  itemsCustom : [
     [0, 1],
    [375,2],
    [600, 3],
    [768,4],
    [1200,4]
    ],
    //autoPlay: 6000,
    loop: true,
    navigationText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
    navigation : true,
    pagination:false
  });
});

//custom product

$(document).ready(function() {
  $("#custom_product_carousel").owlCarousel({
  itemsCustom : [
     [0, 1],
    [375,2],
    [600, 3],
    [768,4],
    [1200,4]
    ],
    //autoPlay: 6000,
    loop: true,
    navigationText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
    navigation : true,
    pagination:false
  });
});





// ............................................................./  SINGLE PRODUCT PAGE....................................................................

// .....................................................................  SHOP  ..........................................................................

  
$(document).ready(function() {
      $('#list').click(function(event){event.preventDefault();$('#products .item').addClass('shop_list_item');});
      $('#grid').click(function(event){event.preventDefault();$('#products .item').removeClass('shop_list_item');$('#products .item').addClass('shop_grid_item');});
});


// ..................................................................../  SHOP  ...........................................................................



//scroll
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#scroll').fadeIn();
        } else {
            $('#scroll').fadeOut();
        }
    });
    $('#scroll').click(function () {
        $("html, body").animate({scrollTop: 0}, 600);
        return false;
    });
});
//scroll


$('.gallery').each(function() { // the containers for all your galleries
    $(this).magnificPopup({
        delegate: 'a', // the selector for gallery item
        type: 'image',
        gallery: {
          enabled:true
        }
    });
});


// $(document).ready(function () {
//    // init Masonry
// var $grid = $('.grid').masonry({
//   itemSelector: '.grid-item',
//   percentPosition: true,
//   columnWidth: '.grid-sizer'
// });

// // layout Masonry after each image loads
// $grid.imagesLoaded().progress( function() {
//   $grid.masonry();
// });  
//    });

//category style (category style page)
$('#cat_style1_carousel').owlCarousel({
  // loop: true,  
  pagination:false,
  navigation:false,
  nav: false,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>"
  ],
  autoplay: false,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 2 
    },
    375: {
      items: 2
    },
    475: {
      items: 3
    },
    992: {
      items: 4
    },
    1200: {
      items: 5
    },
    1410: {
      items: 5
    },
    1850: {
      items: 6
    }
  }
})


//category style (category style page)
$('#cat_style2_carousel').owlCarousel({
  // loop: true,  
  pagination:false,
  navigation:false,
  nav: false,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>"
  ],
  autoplay: false,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1  
    },
    475: {
      items: 2
    },
    992: {
      items: 2
    },
    1850: {
      items: 3
    }
  }
})


//category style (category style page)
$('#cat_style3_carousel').owlCarousel({
  // loop: true,  
  pagination:false,
  navigation:false,
  nav: false,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>"
  ],
  autoplay: false,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 2  
    },
    375: {
      items: 2
    },
    576: {
      items: 3
    },
    768: {
      items: 4
    },
    1200: {
      items: 5
    },
    1850: {
      items: 6
    }
  }
})


//multi slider product
$('#multi_product_1').owlCarousel({
  // loop: true,  
  pagination:true,
  navigation:false,
  nav: false,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>"
  ],
  autoplay: false,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1
    },
    576: {
      items: 2
    },
    992: {
      items: 1
    }
  }
})

$('#multi_product_2').owlCarousel({
  // loop: true,  
   pagination:true,
  navigation:false,
  nav: false,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>"
  ],
  autoplay: false,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1
    },
    576: {
      items: 2
    },
    992: {
      items: 1
    }
  }
})

$('#multi_product_3').owlCarousel({
  // loop: true,  
  pagination:true,
  navigation:false,
  nav: false,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>"
  ],
  autoplay: false,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1
    },
    576: {
      items: 2
    },
    992: {
      items: 1
    }
  }
})


//blog sidebar
$(document).ready(function () {
   if($(window).width() < 768) {
        $( ".b_left_side" ).insertAfter( ".b_left_blog " ); 
     }
 });


$(document).ready(function() {
  $("#ab_customer").owlCarousel({
  itemsCustom : [
    [0, 1],
    [992, 2]
    ],
    //autoPlay: 6000,
    loop: true,
    navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    navigation : false,
    pagination:false
  });
});

$('#ab_team').owlCarousel({
  // loop: true,  
  pagination:false,
  navigation:false,
  nav: false,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>"
  ],
  autoplay: false,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1  
    },
    576: {
      items: 2
    },
    768: {
      items: 3
    },
    992: {
      items: 4
    },
    1200: {
      items: 4
    },
    1850: {
      items: 5
    }
  }
})

//........................................................................ANIMATION.........................................................................



//........................................................................ANIMATION.........................................................................


