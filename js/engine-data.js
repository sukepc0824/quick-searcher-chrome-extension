searcher = {
    engineData: {
        applied: {
            google:{
                name: "検索",
                label:"検索...",
                icon: "img/icon/google.svg",
                url: {
                    suggest: "https://www.google.com/complete/search?client=firefox&q=",
                    search: "https://www.google.com/search?q="
                },
                history:[]
            },
            youtube:{
                name: "Youtube",
                label:"Youtube 検索...",
                icon: "img/icon/youtube.svg",
                url: {
                    suggest: "https://clients1.google.com/complete/search?hl=en&ds=yt&client=firefox&q=",
                    search: "https://www.youtube.com/results?search_query="
                },
                history:[]
            },
            wikipedia:{
                name: "Wikipedia",
                label:"Wikipedia 検索...",
                icon: "img/icon/wikipedia.svg",
                url: {
                    suggest: "https://ja.wikipedia.org/w/api.php?action=opensearch&format=json&search=",
                    search: "https://ja.wikipedia.org/w/index.php?search="
                },
                history:[]
            },
            bing:{
                name: "Bing",
                label:"Bing 検索...",
                icon: "img/icon/bing.svg",
                url: {
                    suggest: "https://api.bing.com/osjson.aspx?market=ja-JP&JsonType=callback&JsonCallback=?&query=",
                    search: "https://bing.com/search?q="
                },
                history:[]
            }
        }
    },
    settings: {
        background:  {
            genre : "default",
            imgURL: '',
            words:''
        }
    }

}

const kari = 
    {
        "name": "Google(image)",
        "icon": "img/icon/bing.svg",
        "url": {
            "suggest": "https://www.google.com/complete/search?hl=ru&ds=i&output=firefox&q=",
            "search": "https://bing.com/search?q="
        },
    }


const engineDataTemplate = [
    {
        "name": "Google",
        "icon": "img/icon/google.svg",
        "url": {
            "suggest": "https://www.google.com/complete/search?client=firefox&q=",
            "search": "https://www.google.com/search?q="
        },
    },
    {
        "name": "Youtube",
        "icon": "img/icon/youtube.svg",
        "url": {
            "suggest": "https://clients1.google.com/complete/search?hl=en&ds=yt&client=firefox&q=",
            "search": "https://www.youtube.com/results?search_query="
        },
    },
    {
        "name": "Wikipedia",
        "icon": "img/icon/wikipedia.svg",
        "url": {
            "suggest": "https://ja.wikipedia.org/w/api.php?action=opensearch&format=json&search=",
            "search": "https://ja.wikipedia.org/w/index.php?search="
        },
    },
    {
        "name": "Bing",
        "icon": "img/icon/bing.svg",
        "url": {
            "suggest": "https://api.bing.com/osjson.aspx?market=ja-JP&JsonType=callback&JsonCallback=?&query=",
            "search": "https://bing.com/search?q="
        },
    },
    {
        "name": "Yahoo!",
        "icon": "img/icon/yahoo.svg",
        "url": {
            "suggest": "https://ff.search.yahoo.com/gossip?output=fxjsonp&command=",
            "search": "https://search.yahoo.com/search?p=\""
        }
    },
    {
        "name": "Yahoo! Japan",
        "icon": "img/icon/yahoo-jp.svg",
        "url": {
            "suggest": "https://ff.search.yahoo.com/gossip?output=fxjsonp&command=",
            "search": "https://search.yahoo.com/search?p=\""
        }
    }
]