import gallery from "./../gallery-items.js";

const refs = {
    jsGallery: document.querySelector('.js-gallery'),
    jsLightbox: document.querySelector('.js-lightbox'),
    lightboxImage: document.querySelector('.lightbox__image'),
    lightboxButton: document.querySelector('.lightbox__button'),
    lightboxOverlay: document.querySelector('.lightbox__overlay'),
    
};
// ==============MARKUP===========================================================
const galleryMarkup = (arr) => {
    return arr.reduce((acc, item) => {
        acc +=
            `<li class="gallery__item">
        <a class="gallery__link" href="${item.original}">
        <img
        class="gallery__image"
        src="${item.preview}"
        data-source="${item.original}"
        alt="${item.description}"
        data-index = "${arr.indexOf(item)}"
         />
        </a>
        </li>`
        return acc;
    }, '');
   
};
 
refs.jsGallery.innerHTML = galleryMarkup(gallery);

//==================OPEN MODAL==============================================================================
function onClickOpenModal (event) {
    event.preventDefault()
    if (event.target.nodeName !== 'IMG') {
        return
    } else {
        refs.jsLightbox.classList.add('is-open')
        refs.lightboxImage.src = event.target.dataset.source;
        refs.lightboxImage.alt = event.target.alt;
        refs.lightboxImage.dataset.index = event.target.dataset.index;
        window.addEventListener('keydown', supervisorFunction);
        refs.lightboxOverlay.addEventListener('click', supervisorFunction);
        refs.lightboxButton.addEventListener('click', closeModal);
    }
};

refs.jsGallery.addEventListener('click', onClickOpenModal);

//==========SET CLOSES OPTIONS=============================

const closeModal = () => {
    refs.jsLightbox.classList.remove('is-open');
    refs.lightboxImage.src = "#";
    window.removeEventListener('keydown', supervisorFunction);
    refs.lightboxOverlay.removeEventListener('click', supervisorFunction);
    refs.lightboxButton.removeEventListener('click', closeModal);
};

//==================SCROLL LAGE IMG=================================

function scroll(nextIndex) {
    const nextImage = document.querySelector(`[data-index = "${nextIndex}"]`);
    refs.lightboxImage.src = nextImage.dataset.source;
    refs.lightboxImage.dataset.index = nextImage.dataset.index;
};


const onRightScroll = () => {
    let nextIndex = Number(refs.lightboxImage.dataset.index) + 1;
    (nextIndex < gallery.length) ? nextIndex : nextIndex = 0;
    scroll(nextIndex);
};

const onLeftScroll = () => {
    let nextIndex = Number(refs.lightboxImage.dataset.index) - 1;
    (nextIndex > 0) ? nextIndex : nextIndex = 0;
    scroll(nextIndex);

};
 
//==============================LISTENERS==============================================

const supervisorFunction = (event) => {
    if (event.code === "Escape") {
        closeModal();
    };
    if(event.target === event.currentTarget){
        closeModal();
    };
    if (event.key === 'ArrowRight') {
        onRightScroll();
    };
    if (event.key === 'ArrowLeft') {
        onLeftScroll();  
    };
};









