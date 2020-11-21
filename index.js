import galleryItems from "./gallery-items.js";
const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.lightbox'),
  lightboxImg: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('.lightbox__button'),
  overlay: document.querySelector('.lightbox__overlay'),
};

const galleryMarkupCreate = galleryItems.map(({ preview, original, description }) => setGalleryItem(preview, original, description)).join('');

function setGalleryItem(preview, original, description) {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
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
}

function openModal() {
    refs.lightbox.classList.add('is-open')
}

function closeModal() {
    refs.lightbox.classList.remove('is-open')
    // refs.closeBtn.removeEventListener('click', closeModal)
    refs.lightboxImg.src = '';
    refs.lightboxImg.alt = '';
    
}
refs.gallery.addEventListener('click', openImage);
refs.closeBtn.addEventListener('click', closeModal);
 