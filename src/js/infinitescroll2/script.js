console.log('script attached')

const containerElement = document.querySelector('.container')
const listElement = document.getElementById('list')
const bottomElement = document.getElementById('bottom')

const loader = document.createElement('div');
loader.id = 'loader';
loader.textContent = 'Loading...';
loader.style.textAlign = 'center';
loader.style.padding = '10px';
loader.style.display = 'none';

containerElement.append(loader);

const showLoader = () => {
    loader.style.display = 'block';
};

const hideLoader = () => {
    loader.style.display = 'none';
};

let divCounter = 0;
let isLoading = false;
const PAGE_SIZE = 20;

const init = () => {
    console.log("init()");
    addItems();
};

const addItems = () => {
    if (isLoading) return;

    isLoading = true;
    showLoader();

    console.log('addItems()');

    setTimeout(() => {
        for (let i = 0; i < PAGE_SIZE; i++) {
            const newItem = document.createElement('div');
            newItem.className = 'item';
            newItem.textContent = `Item #${divCounter++}`;
            listElement.append(newItem);
        }

        isLoading = false;
        hideLoader();
    }, 1000);
};

window.addEventListener('DOMContentLoaded', init);

const options = {
    root: containerElement,
    rootMargin: '50px',
    threshold: 0.5
};

const callback = (entries) => {
    entries.forEach((entry) => {
        if (entry.target.id === 'bottom' && entry.isIntersecting) {
            addItems();
        }
    });
};

const observer = new IntersectionObserver(callback, options);
observer.observe(bottomElement);
