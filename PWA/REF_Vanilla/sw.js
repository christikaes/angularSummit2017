
urlsToCache=[
    "/",
    "/chicago.jpg",
    "/styles.css"
]

// When the service worker is installed cache all our static assets
self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open("vanillaCache")
            .then(function(cache){
            console.log("installing")
            cache.addAll(urlsToCache);
        })
    )
})

// When we fetch serve these files from the cache
self.addEventListener("fetch", function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            return response || fetch(event.request);
        })
    )
})

//Handle push message
self.addEventListener("push", function(event){
    event.waitUntil(
        self.registration.showNotification(event.data)
    )
});