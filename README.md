# README

# Service Worker Strategy
The expected user experience when

----------
## — Browser Support Service Worker
| **Network** | **Cache** |
| ----------- | --------- |
| True        | Optional  |
| True        | True      |
| True        | False     |
| False       | True      |
| False       | False     |

1. The case if service worker not installed
  - We have two options to install PWA:
    1. Cache on install - as dependency → done
      Cache saved while installing the service worker. Cache used as a dependency means that saving cache need to be finished before the page rendered.
    1. Cache on install - not as dependency → done
      Cache saved while installing the service worker but saving the cache and rendering the view can be initialized at the same time, because view does not need the cache to be rendered.
2. The case if network present and cache is present
  - Stale while re-validate → done
    This strategy is ideal for apps that frequently updating the resources where having the very latest version is non-essential, why? Because the strategy works from the pages generated and service worker will load cache and showing the cache content to the page, the service send the request after that and the requested data will be saved to the cache and will be rendered when user asking the next request.
  - Cache and network race →done
    This strategy is ideal for small asset and slow storage access device. But if the storage access is fast that means cache will always be called first.
  - Cache then network 
    This strategy is rendering page from the cache first, then when the network ready, its replacing the new view from the network
  - On user interaction
    Actually this behavior didn’t need cache to be present but it is a good strategy if we need to cache every user interaction like ‘Exam apps’ or like watch later on YouTube. This method triggered when use triggered an event listener like ‘click’, the network requesting data, save its data to cache
  - On network response
    This kind of strategy is also use full to an apps like ‘Exam apps’. To know how this strategy works, we can start imagine if ‘Exam apps’ questions rendered to be one question one page, so whenever user answer and request the cache, its falling back to the network when the server request the next question page and update the data to cache
  - On push message → We do not implement the push notification yet
    This strategy is ideal for apps that send a notification. How this strategy work? So, before the notification received, when the user receive push message the service worker intercept it, the it will request the network to get the data for the user then saving it to cache.
  - On background sync (Need further research) →Need more research
  - On user interaction
    Actually this behavior didn’t need cache to be present but it is a good strategy if we need to cache every user interaction like ‘Exam apps’ or like watch later on YouTube. This method triggered when use triggered an event listener like ‘click’, the network requesting data, save its data to cache
  - On network response
    This kind of strategy is also use full to an apps like ‘Exam apps’. To know how this strategy works, we can start imagine if ‘Exam apps’ questions rendered to be one question one page, so whenever user answer and request the cache, its falling back to the network when the server request the next question page and update the data to cache
  - On push message → We do not implement the push notification yet
    This strategy is ideal for apps that send a notification. How this strategy work? So, before the notification received, when the user receive push message the service worker intercept it, the it will request the network to get the data for the user then saving it to cache.
  - On background sync (Need further research) →Need more research
2. Network present cache does not
  - Network Only
    This strategy is only for information that could not or should not be cached. So the service worker will not calling that resource from the cache.
  - Cache falling back to network → done
    This could be happen when the cache is cleared, so the strategy is service worker asking the data from the cache first, when it does not get the cache, its getting the data or the asset from the network
5. Network does not present cache present
  - Cache only →done
    This strategy is suitable for static page or game application that does not need  the network. After installing the service worker then the page will never asking request to the network
  - Network falling back to cache 
    This strategy is suitable for the network first. The service worker will asking data or asset from the cache if network is not available
6. Network and cache does not present
  - Generic fallback 
    This strategy is needed to notify the user that the application could not get the data either from the web or the cache.
  - Dinosaur page → done
    We don’t need an explain on this don’t we?
7. The service worker is outdated
  - On Activate
    We can use on activate event to delete the previous cache version
----------
## — Browser does not Support Service Worker 
| Network | Cache |
| ------- | ----- |
| True    | False |
| False   | False |

1. If network present but didn’t have cache
  The page will install the service worker, we have two case if that happen:
  - The browser doesn’t support PWA but will render page normally
    - Solution:
        Suggest the user to update or install supported browser
  - The browser doesn’t support rendered JavaScript, so the apps will be buggy.
    - Solution:
        Prevent the user to load the apps, then suggest the user to update or install supported browser


2. If both network and cache not present
  - Dinosaur page
    We don’t need an explain on this don’t we?
