window.onload = function (){

const initSlider = ()=>{
    const slideButtons = document.querySelectorAll('.slide-button')
    const imageList = document.querySelector('.image-list')
    const sliderScrollBar = document.querySelector('.slider-scrollbar')
    const scrollbarThumb = sliderScrollBar.querySelector('.scrollbar-thumb')
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth

    scrollbarThumb.addEventListener('mousedown',(e)=>{
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft

        const handleMouseOver = (e)=>{
            const deltaX = e.clientX -startX
            const newThumbPosition = thumbPosition - deltaX
            scrollbarThumb.style.left =`${newThumbPosition}px` 
        }
        document.addEventListener('mousemove',handleMouseOver())
    })
    
    slideButtons.forEach(button =>{
        button.addEventListener('click',()=>{
            const direction = button.id === 'prev-slide' ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction
            imageList.scrollBy({left:scrollAmount, behavior:"smooth"})
            
        })
    })
    const handleSlideButtons = () =>{
        slideButtons[0].style.display = imageList.srollLeft <= 0 ? 'none' : 'block' 
        slideButtons[1].style.display = imageList.srollLeft >= maxScrollLeft ? 'none' : 'block'
    }
    const updateThumbPosition = ()=>{
        const scrollPosition = imageList.scrollLeft
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollBar.clientWidth - scrollbarThumb.offsetWidth)
        scrollbarThumb.style.left = `${thumbPosition}px`
    }
    imageList.addEventListener('scroll',()=>{        
        handleSlideButtons()
        updateThumbPosition()
    })
}


initSlider()
}