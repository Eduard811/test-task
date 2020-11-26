import './style/style.scss'

window.addEventListener("orientationchange",() => {
    window.location.reload()
}, false)

//инициализация слайдера
let mySwiper = new Swiper('.swiper-container', {
    breakpoints: {
        1350: {
            slidesPerView: 6,
            slidesPerColumn: 2,
            spaceBetween: 30,
            slidesPerColumnFill: "row",
            watchOverflow: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        },
        1140: {
            slidesPerView: 6,
            slidesPerColumn: 2,
            slidesPerColumnFill: "row",
            spaceBetween: 15,
            watchOverflow: true,
            pagination: {
                el: '.swiper-pagination',
            },
        },
        968: {
            slidesPerView: 5,
            slidesPerColumn: 2,
            slidesPerColumnFill: "row",
            spaceBetween: 15,
            watchOverflow: true,
            pagination: {
                el: '.swiper-pagination',
            },
        },
        768: {
            slidesPerView: 4,
            slidesPerColumn: 2,
            slidesPerColumnFill: "row",
            spaceBetween: 15,
            watchOverflow: true,
            pagination: {
                el: '.swiper-pagination',
            },
        },
        580: {
            slidesPerView: 3,
            slidesPerColumn: 2,
            slidesPerColumnFill: "row",
            spaceBetween: 15,
            watchOverflow: true,
            pagination: {
                el: '.swiper-pagination',
            },
        },
        320: {
            slidesPerView: 2,
            slidesPerColumn: 2,
            slidesPerColumnFill: "row",
            spaceBetween: 15,
            watchOverflow: true,
            pagination: {
                el: '.swiper-pagination',
            },
        }

    }
})

//изменение стилей конструктора слайдера
const resetMargin = () => {
    mySwiper.slides.forEach(el => {
        el.style.marginTop = "0px"
        el.style.marginBottom = mySwiper.params.spaceBetween + "px"
    })
}

let slideActive = document.querySelectorAll('.slide__active, .slide__active--left')
let slideImg = document.querySelectorAll('.slide__card__img')
let shadowSwiper = document.querySelectorAll('.swiper-slide__shadow')

//настройка анимации слайдов
let slidesPerView = mySwiper.params.slidesPerView - 1

let activeSlideArr = []

function pushSlide() {
    if (mySwiper.params.slidesPerView > 3) {
        activeSlideArr.push(mySwiper.slides[mySwiper.activeIndex + (slidesPerView - 1)])
        activeSlideArr.push(mySwiper.slides[mySwiper.activeIndex + slidesPerView])
        activeSlideArr.push(mySwiper.slides[mySwiper.activeIndex + (slidesPerView + 9)])
        activeSlideArr.push(mySwiper.slides[mySwiper.activeIndex + (slidesPerView + 8)])
    } else {
        activeSlideArr.push(mySwiper.slides[mySwiper.activeIndex + slidesPerView])
        activeSlideArr.push(mySwiper.slides[mySwiper.activeIndex + (slidesPerView + 9)])
    }
}

pushSlide()
slideHandlerLeft()
slideHandlerRight()

const animationHandler = (array) => {
    array.forEach(element => {
        for (let sibling of element.children) {

            if (sibling.classList.contains('slide__card--left')) {
                sibling.className = 'slide__card'
            }

            if (sibling.classList.contains('slide__active__wrapper--left')) {
                sibling.className = 'slide__active__wrapper'
                for (let kid of sibling.children) {
                    kid.className = 'slide__active'
                }
            }

            if (sibling.classList.contains('swiper-slide__shadow--left')) {
                sibling.className = 'swiper-slide__shadow'
            }
        }
    })

    activeSlideArr.length = 0

    pushSlide()
    slideHandlerLeft()
    slideHandlerRight()
}

mySwiper.on('slideChange', function () {

    let slides = this.slides

    animationHandler(slides)
})


function slideHandlerLeft() {

    activeSlideArr.forEach(activeSlide => {

        if (!!activeSlide) {
            for (let sibling of activeSlide.children) {

                if (sibling.classList.contains('slide__card')) {
                    sibling.className = 'slide__card--left'
                }

                if (sibling.classList.contains('slide__active__wrapper')) {
                    sibling.className = 'slide__active__wrapper--left'
                    for (let kid of sibling.children) {
                        kid.className = 'slide__active--left'
                    }
                }

                if (sibling.classList.contains('swiper-slide__shadow')) {
                    sibling.className = 'swiper-slide__shadow--left'
                }
            }
        }
    })
}

function slideHandlerRight() {

    mySwiper.slides.forEach(slide => {

            for (let card of slide.children) {
                if (card.classList.contains('slide__card')) {
                    card.addEventListener('mouseenter', () => {
                        for (let shadow of card.parentNode.children) {
                            if (shadow.classList.contains('swiper-slide__shadow')) {
                                shadow.classList.add('swiper-slide__shadow--active')
                            }
                        }

                        for (let img of card.children) {
                            if (img.classList.contains('slide__card__img')) {
                                img.classList.add('img--active')
                            }
                        }

                        for (let sibling of slide.children) {
                            if (sibling.classList.contains('slide__active__wrapper')) {
                                for (let kid of sibling.children) {
                                    kid.classList.add('active__slide')
                                    kid.classList.add('--transition')
                                }
                            }
                        }
                    })
                }

                if (card.classList.contains('slide__card--left')) {
                    card.addEventListener('mouseenter', () => {
                        for (let shadow of card.parentNode.children) {
                            if (shadow.classList.contains('swiper-slide__shadow--left')) {
                                shadow.classList.add('swiper-slide__shadow--active')
                            }
                        }

                        for (let img of card.children) {
                            if (img.classList.contains('slide__card__img')) {
                                img.classList.add('img--active')
                            }
                        }

                        for (let sibling of slide.children) {
                            if (sibling.classList.contains('slide__active__wrapper--left')) {
                                for (let kid of sibling.children) {
                                    kid.classList.add('active__slide--left')
                                    kid.classList.add('--transition')
                                }
                            }
                        }
                    })
                }
            }

            slide.addEventListener('mouseleave', () => {
                slideActive.forEach(el => el.classList.remove('active__slide','active__slide--left'))
                slideImg.forEach(el => el.classList.remove('img--active'))
                shadowSwiper.forEach(el => el.classList.remove('swiper-slide__shadow--active'))
            })
    })
}

//навигация Desktop
const navigation = document.querySelectorAll('.nav-btn')

const allSlides = [...mySwiper.slides]

navigation.forEach(element => {

    element.onclick = () => {

        navigation.forEach(item => item.classList.remove('btn-active'))
        mySwiper.removeAllSlides()

        allSlides.forEach((el, index) => element.dataset.id === "1" ?
            mySwiper.addSlide(index, el) : element.dataset.id === el.getAttribute('data-id') &&
                mySwiper.addSlide(index, el))
        resetMargin()
        animationHandler(allSlides)
        element.classList.add('btn-active')
    }
})

//навигация Mobile
const mobileNavigation = document.querySelectorAll('.nav-btn-mobile')
const svg = document.querySelectorAll('.ok')

mobileNavigation.forEach(element => {

    element.onclick = () => {

        mobilePopup.forEach(el =>

            el.classList.remove('mobile-popup--active','mobile-popup__slide--active'))

        mobileNavigation.forEach(item => item.classList.remove('btn-mobile-active'))
        svg.forEach(items => items.classList.remove('ok-active'))
        mySwiper.removeAllSlides()

        allSlides.forEach((el, index) => element.dataset.id === "1" ?
            mySwiper.addSlide(index, el) : element.dataset.id === el.getAttribute('data-id') &&
                mySwiper.addSlide(index, el))
        resetMargin()
        animationHandler(allSlides)
        element.classList.add('btn-mobile-active')

        mySwiper.slides.length < 3 ? container.style.paddingBottom = "280px" :
            container.style.paddingBottom = "50px"


        for (let sibling of element.children) {
            sibling.classList.add('ok-active')
        }
    }
})

const openButton = document.querySelector('.open__button')
const navigationMobile = document.querySelector('.navigation-mobile')
const container = document.querySelector('.swiper-container')

openButton.onclick = () => {
    openButton.classList.toggle('open__button--active')
    navigationMobile.classList.toggle('navigation-mobile--active')
    container.classList.toggle('swiper-container--active')
}

//добавление кнопки закрытия только на мобильные устройства
const exit = document.querySelectorAll('.exit, .mobile-popup__exit')
const mobilePopup = document.querySelectorAll('.mobile-popup')


if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    exit.forEach(el => el.onclick = () => {

        slideActive.forEach(el =>
            el.classList.remove('active__slide','active__slide--left'))

        shadowSwiper.forEach(el =>
            el.classList.remove('swiper-slide__shadow--active'))

        slideImg.forEach(el =>
            el.classList.remove('img--active'))

        mobilePopup.forEach(el =>
            el.classList.remove('mobile-popup--active','mobile-popup__slide--active'))

    })
} else {
    exit.forEach(el => el.outerHTML = '')
}

//mobile popup
const w = window.screen.availWidth;

if (w <= 579) {

    allSlides.forEach(element => element.onclick = () => mobilePopup.forEach(el => {

        element.dataset.name === el.getAttribute('data-name') &&
        el.classList.add('mobile-popup--active')

            setTimeout(() => {
                el.classList.add('mobile-popup__slide--active')
            }, 1000)
    }))
}

//закрытие popup при свайпе слайдера
mySwiper.on('transitionStart', function () {
    mobilePopup.forEach(el =>
        el.classList.remove('mobile-popup--active','mobile-popup__slide--active'))

    slideActive.forEach(el => el.classList.remove('active__slide','active__slide--left'))
    slideImg.forEach(el => el.classList.remove('img--active'))
    shadowSwiper.forEach(el => el.classList.remove('swiper-slide__shadow--active'))
})




