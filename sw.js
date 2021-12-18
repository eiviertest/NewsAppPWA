;
//Nombre en cache estatico
const CACHE_STATIC_NAME = 'cache_newsapp_v1';
//Nombre en cache dinamico
const CACHE_DYNAMIC_NAME = "cache_newsapp_dinamyc_v1";
//Archivos que se guardaran en caje
var cacheFiles = [
    './',
    './vendor/fontawesome-free/css/all.min.css',
    'https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700',
    'https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic',
    'vendor/magnific-popup/magnific-popup.css',
    './css/creative.css',
    './css/creative.min.css',
    './vendor/jquery/jquery.min.js',
    './vendor/bootstrap/js/bootstrap.bundle.min.js',
    './vendor/jquery-easing/jquery.easing.min.js',
    './vendor/magnific-popup/jquery.magnific-popup.min.js',
    './js/creative.js',
    './js/funciones_buttons.js',
    'https://kit.fontawesome.com/801633f78a.js',
    './js/startSW.js',
    './img/NewsApp.png',
    './img/bg-masthead.jpg',
    './img/icons/newicon512.png'
]

//Guardar cache con SW
self.addEventListener('install', e => {
    console.log('SW instalado');
    e.waitUntil(
        caches.open(CACHE_STATIC_NAME).then(cache => {
            console.log('Archivos a chace');
            return cache.addAll(cacheFiles)
                .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Fallo registro de cache', err))
    )
})

//Estrategia de cache
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_STATIC_NAME]

    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            cacheNames.map(cacheName => {
                //Eliminar si no se ocupa en cache
                if (cacheWhitelist.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName)
                }
            })
        })
        // Activar el cache actual
        .then(() => self.clients.claim())
    )
})

//Stale while revalidate
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then((cacheResponse) => {
            if (cacheResponse) {
                fetch(event.request).then((networkResponse) => {
                    return caches.open(CACHE_STATIC_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    })
                });
                return cacheResponse;
            } else {
                return fetch(event.request).then((networkResponse) => {
                    return caches.open(CACHE_STATIC_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    })
                });
            }
        })
    );
})