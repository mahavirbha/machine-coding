// https://picsum.photos/id/102/4320/3240
//https://picsum.photos/v2/list?page=2&limit=100

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

let isLoading = false;
const PAGE_SIZE = 5;
let PAGE = 1;
let posts = [];


const init = () => {
    console.log("init()");
    addItems();
};

const generateTitle = (title) => {
    const titleElement = document.createElement('div')
    titleElement.setAttribute('class', 'title')
    titleElement.innerText = title
    return titleElement
}

const generateImage = (image) => {
    const imgEle = document.createElement('img')
    imgEle.setAttribute('class', 'image')
    imgEle.setAttribute('src', image?.download_url)
    imgEle.setAttribute('alt', `image-${image.id}`)
    return imgEle
}

const generatePost = (item) => {
    const postEle = document.createElement('div');
    postEle.setAttribute('class', "item")

    postEle.append(generateTitle(item?.id || "-"))
    postEle.append(generateImage(item || {}))
    return postEle;
}

const addItems = async () => {
    if (isLoading) return;

    isLoading = true;
    showLoader();

    console.log('addItems()');

    const res = await fetch(`https://picsum.photos/v2/list?page=${PAGE}&limit=${PAGE_SIZE}`)
    const json = await res.json()
    posts.push(json)
    console.log("josn:", json, posts)
    for (let i = 0; i < PAGE_SIZE; i++) {
        const postElement = generatePost(json[i])
        listElement.append(postElement)
    }
    isLoading = false;
    hideLoader()
    PAGE++

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
