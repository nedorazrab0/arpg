"use strict";
// SPDX-License-Identifier: 0BSD

const CACHE_NAME = "vv0";
const ASSETS = [
    "/",
    "/index.html",
    "/404.html",
    "/manifest.webmanifest",
    "/scripts/password-generator.js",
    "/fonts/Inter-Regular-ASCII.woff2",
    "/fonts/Inter-Bold-ASCII.woff2",
    "/fonts/JetBrainsMono-Regular.woff2",
    "/icons/icon.svg",
    "/images/main-done.svg",
    "/images/sub-done.svg",
    "/images/show.svg",
    "/images/hide.svg",
    "/images/generate.svg",
    "/images/copy.svg"
];

self.addEventListener(
    "install", (event) => {
        event.waitUntil(
            caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
        );
    }
);

self.addEventListener(
    "activate", (event) => {
        event.waitUntil(
            caches.keys().then(
                (keys) => Promise.all(
                    keys.filter((key) => key !== CACHE_NAME)
                        .map((key) => caches.delete(key))
                )
            )
        );
    }
);

self.addEventListener(
    "fetch", (event) => {
        event.respondWith(
            caches.match(event.request).then(
                (cachedResponse) => {
                    return cachedResponse || fetch(event.request);
                }
            )
        );
    }
);
