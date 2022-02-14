
// 해커뉴스 api 명세 https://github.com/tastejs/hacker-news-pwas/blob/master/docs/api.md
//2022-02-13-페이징

const container = document.getElementById('root');
const content = document.createElement('div');

const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

// 공유되는 자원
const store ={
    currentPage: 1,
    feeds: [],
}

function getData(url) {
    const ajax = new XMLHttpRequest();
    ajax.open('GET', url, false);
    ajax.send();

    return JSON.parse(ajax.response);
}

function makeFeed(feeds){
    for(let i =0; i<feeds.length; i++){
        // read 속성을 추가
        feeds[i].read = false;
    }

    return feeds;
}

function newsFeed() {
    let newsFeed = store.feeds;
    let lastPage = Math.round(newsFeed.length/10);
    const newsList = [];


    if(newsFeed.length === 0 ){
        newsFeed = store.feeds = makeFeed(getData(NEWS_URL));
    }

    let template = 
    `
        <div class="continer m-auto p-10">
            <h1>Hacker News</h1>
            <ul>
                {{__news_feed__}}
            </ul>

            <div>
                <a href="#/page/{{__prev__page__}}">이전페이지</a>
                <a href="#/page/{{__next__page__}}">다음페이지</a>
            </div>
        </div>
    `

    for (let i = (store.currentPage-1)*10; i < (store.currentPage*10); i++) {
        newsList.push(`
            <li class = ${newsFeed[i].read ? 'text-pink-700' : 'text-black'}>
                <a href="#/show/${newsFeed[i].id}">
                    ${newsFeed[i].title} (${newsFeed[i].comments_count})
                </a>
            </li>
        `);
    }

    template = template.replace('{{__news_feed__}}', newsList.join(''));
    template = template.replace('{{__prev__page__}}', store.currentPage >1 ? store.currentPage-1 : 1);
    template = template.replace('{{__next__page__}}', store.currentPage < lastPage ? store.currentPage+1 : lastPage );

    container.innerHTML = template;
}

function newsDetail(){
    const id = location.hash.substr(7);
    const newsContent = getData(CONTENT_URL.replace('@id', id));

    container.innerHTML = `
    <h1>${newsContent.title}</h1>
    
    <div>
        <a href="#/page/${store.currentPage}">목록으로</a>
    </div>`;

    for(let i =0; i<store.feeds.length; i++){
        if(store.feeds[i].id === Number(id)){
            store.feeds[i].read = true;
            break;
        }
    }

}

function router(){
    const routePath = location.hash;

    if(routePath === ''){
        newsFeed();

    }else if(routePath.indexOf('#/page/') >= 0){
        store.currentPage = Number(routePath.substr(7));
        newsFeed();

    }else{
        newsDetail();
    }
}

window.addEventListener('hashchange', router);

// newsFeed();
router();






