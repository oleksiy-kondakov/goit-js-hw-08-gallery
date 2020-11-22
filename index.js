import galleryItems from "./gallery-items.js";
const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.lightbox'),
  lightboxImg: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('.lightbox__button'),
  overlay: document.querySelector('.lightbox__overlay'),
};
let activeIndex;
const galleryMarkupCreate = galleryItems.map(({ preview, original, description }, index) => setGalleryItem(preview, original, description, index)).join('');

function setGalleryItem(preview, original, description, index) {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index = "${index}"
      alt="${description}"
    />
  </a>
</li>`
}
refs.gallery.insertAdjacentHTML('beforeend', galleryMarkupCreate)

function openImage(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    refs.lightboxImg.src = event.target.dataset.source;
    refs.lightboxImg.alt = event.target.alt;
    openModal()
    activeIndex = Number(event.target.dataset.index);
}

function openModal() {
    window.addEventListener('keydown', onKeyPress);
    refs.lightbox.classList.add('is-open');
}

function closeModal() {
    refs.lightbox.classList.remove('is-open')
    window.removeEventListener('keydown', onKeyPress);
    refs.lightboxImg.src = '';
    refs.lightboxImg.alt = '';
    
}
refs.gallery.addEventListener('click', openImage);
refs.closeBtn.addEventListener('click', closeModal);
refs.overlay.addEventListener('click', overlayClickClose)

function overlayClickClose(event) {
  if (event.currentTarget === event.target) {
    closeModal();
  }
}
function onKeyPress(event) {
    switch (event.code) {
        case 'Escape': closeModal();
            break;
        case 'ArrowRight':
            activeIndex + 1 === galleryItems.length ? (activeIndex = 0) : (activeIndex += 1);
            refs.lightboxImg.src = galleryItems[activeIndex].original;
            break;
        case 'ArrowLeft':
            activeIndex === 0 ? (activeIndex = galleryItems.length - 1) : (activeIndex -= 1);
            refs.lightboxImg.src = galleryItems[activeIndex].original;
            break;
    }
    }
