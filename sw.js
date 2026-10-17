const CACHE_NAME = "eagler-offline-v1";
// 需要预缓存的本地文件列表
const PRE_CACHE_LIST = [
    "./index.html",
    "./mc.html",
    "./1234.mp3"
];

// 安装：联网首次打开，存入缓存
self.addEventListener("install", (event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache=>cache.addAll(PRE_CACHE_LIST))
        .then(()=>self.skipWaiting())
    )
});

// 请求拦截，断网读取缓存
self.addEventListener("fetch", (event)=>{
    event.respondWith(
        fetch(event.request)
        .catch(()=>{
            return caches.match(event.request);
        })
    )
});
