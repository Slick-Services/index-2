(function() {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        })
    });

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
                // if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }

    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }


    /**
     * Header fixed top on scroll
     */
    // let selectHeader = select('#header')
    // if (selectHeader) {
    //     let headerOffset = selectHeader.offsetTop
    //     let nextElement = selectHeader.nextElementSibling
    //     const headerFixed = () => {
    //         if ((headerOffset - window.scrollY) <= 200) {
    //             selectHeader.classList.add('fixed-top')
    //             nextElement.classList.add('scrolled-offset')
    //         } else {
    //             selectHeader.classList.remove('fixed-top')
    //             nextElement.classList.remove('scrolled-offset')
    //         }
    //     }
    //     window.addEventListener('load', headerFixed)
    //     onscroll(document, headerFixed)
    // }

    /**
     * Header fixed top on scroll
     */
    document.addEventListener("DOMContentLoaded", function() {

        window.addEventListener('scroll', function() {

            if (window.scrollY > 50) {
                document.getElementById('header').classList.add('header-scrolled');
                // add padding top to show content behind navbar
                // navbar_height = document.querySelector('.header').offsetHeight;
                // document.body.style.paddingTop = navbar_height + 'px';
            } else {
                document.getElementById('header').classList.remove('header-scrolled');
                // remove padding top from body
                document.body.style.paddingTop = '0';
            }
            // window.addEventListener('load', headerFixed)
            //     onscroll(document, headerFixed)
        });
    });
    // DOMContentLoaded  end

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('la-bars')
        this.classList.toggle('la-times')
    })

    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e) {
        if (select('#navbar').classList.contains('navbar-mobile')) {
            e.preventDefault()
            this.nextElementSibling.classList.toggle('dropdown-active')
        }
    }, true)

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#navbar')
            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('la-bars')
                navbarToggle.classList.toggle('la-times')
            }
            scrollto(this.hash)
        }
    }, true)

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    /**
     * Initiate glightbox 
     */
    // const glightbox = GLightbox({
    //     selector: '.glightbox'
    // });

    /**
     * Clients Slider
     */
    new Swiper('.clients-slider', {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            480: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 80
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 7
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 90
            },
            1400: {
                slidesPerView: 4,
                spaceBetween: 0
            }
        }
    });


    /**
     * Porfolio isotope and filter
     */
    // window.addEventListener('load', () => {
    //     let portfolioContainer = select('.portfolio-container');
    //     if (portfolioContainer) {
    //         let portfolioIsotope = new Isotope(portfolioContainer, {
    //             itemSelector: '.portfolio-item',
    //             layoutMode: 'fitRows'
    //         });

    //         let portfolioFilters = select('#portfolio-flters li', true);

    //         on('click', '#portfolio-flters li', function(e) {
    //             e.preventDefault();
    //             portfolioFilters.forEach(function(el) {
    //                 el.classList.remove('filter-active');
    //             });
    //             this.classList.add('filter-active');

    //             portfolioIsotope.arrange({
    //                 filter: this.getAttribute('data-filter')
    //             });
    //             portfolioIsotope.on('arrangeComplete', function() {
    //                 AOS.refresh()
    //             });
    //         }, true);
    //     }

    // });

    /**
     * Initiate portfolio lightbox 
     */
    // const portfolioLightbox = GLightbox({
    //     selector: '.portfolio-lightbox'
    // });

    /**
     * Portfolio details slider
     */
    // new Swiper('.portfolio-details-slider', {
    //     speed: 400,
    //     loop: true,
    //     autoplay: {
    //         delay: 5000,
    //         disableOnInteraction: false
    //     },
    //     pagination: {
    //         el: '.swiper-pagination',
    //         type: 'bullets',
    //         clickable: true
    //     }
    // });


    $(function() {
        $(".profilesurvey").slice(0, 7).show();
        $("body").on('click touchstart', '.load-more', function(e) {
            e.preventDefault();
            $(".profilesurvey:hidden").slice(0, 10).slideDown();
            if ($(".profilesurvey:hidden").length == 0) {
                $(".load-more").css('visibility', 'hidden');
            }
            $('html,body').animate({
                scrollTop: $(this).offset().top
            }, 1000);
        });
    });

    $(function() {
        $(".mainprofile").slice(0, 3).show();
        $("body").on('click touchstart', '.profilebtn', function(e) {
            e.preventDefault();
            $(".mainprofile:hidden").slice(0, 7).slideDown();
            if ($(".mainprofile:hidden").length == 0) {
                $(".profilebtn").css('visibility', 'hidden');
            }
            $('html,body').animate({
                scrollTop: $(this).offset().top
            }, 1000);
        });
    });

    /*================================
    Fullscreen Page
    ==================================*/

    if ($('#full-view').length) {

        var requestFullscreen = function(ele) {
            if (ele.requestFullscreen) {
                ele.requestFullscreen();
            } else if (ele.webkitRequestFullscreen) {
                ele.webkitRequestFullscreen();
            } else if (ele.mozRequestFullScreen) {
                ele.mozRequestFullScreen();
            } else if (ele.msRequestFullscreen) {
                ele.msRequestFullscreen();
            } else {
                console.log('Fullscreen API is not supported.');
            }
        };

        var exitFullscreen = function() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else {
                console.log('Fullscreen API is not supported.');
            }
        };

        var fsDocButton = document.getElementById('full-view');
        var fsExitDocButton = document.getElementById('full-view-exit');

        fsDocButton.addEventListener('click', function(e) {
            e.preventDefault();
            requestFullscreen(document.documentElement);
            $('body').addClass('expanded');
        });

        fsExitDocButton.addEventListener('click', function(e) {
            e.preventDefault();
            exitFullscreen();
            $('body').removeClass('expanded');
        });
    }

})()