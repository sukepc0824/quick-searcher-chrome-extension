$(function () {
    engineData = [
        {
            name: 'google',
            icon: "img/icon/google.svg",
            command: "",
            url: {
                suggest: "https://www.google.com/complete/search?client=firefox&q=",
                search: "https://www.google.com/search?q=",
                home: "https://www.google.com"
            },

        },
        {
            name: "youtube",
            icon: "img/icon/youtube.svg",
            command: "/y ",
            url: {
                suggest: "https://clients1.google.com/complete/search?hl=en&ds=yt&client=firefox&q=",
                search: "https://www.youtube.com/results?search_query=",
                home: "https://www.youtube.com"
            },
        },
        {
            name: "wikipedia",
            icon: "img/icon/wikipedia.svg",
            command: "/w ",
            url: {
                suggest: "https://ja.wikipedia.org/w/api.php?action=opensearch&format=json&search=",
                search: "https://ja.wikipedia.org/w/index.php?search=",
                home: "https://ja.wikipedia.org"
            },
        },
        {
            name: "x",
            icon: "img/icon/twitter.svg",
            command: "/x ",
            url: {
                suggest: "",
                search: "https://ja.wikipedia.org/w/index.php?search=",
                home: "https://www.x.com"
            },
        }, {
            name: "facebook",
            icon: "img/icon/facebook.svg",
            command: "/f ",
            url: {
                suggest: "",
                search: "https://www.facebook.com/search/?q=",
                home: "https://www.facebook.com"
            }
        }
    ]

    let realValue
    class SearchBox {
        constructor(val) {
            this.val = val
        }
        create() {
            $("form").submit(function (e) {
                e.preventDefault()
                if ($("#search-bar input").val().length === 0) {
                    tabPageToggle()
                }
                if (new SearchBox().value.length === 0 && $("#search-bar input").val().length === 3) {
                    if (tabPageWay === "page") {
                        window.top.location.href = new Suggest().selectingEngineData.url.home
                    } else {
                        if (tabPageWay === "tab") {
                            window.open(new Suggest().selectingEngineData.url.home)
                        }
                    }
                }
                if (new SearchBox().value.length) {
                    if (tabPageWay === "page") {
                        window.top.location.href = new Suggest().selectingEngineData.url.search + new SearchBox().value
                    } else {
                        if (tabPageWay === "tab") {
                            window.open(new Suggest().selectingEngineData.url.search + new SearchBox().value)
                        }
                    }
                }
            })

            $("button.reset").on("click", function () {
                $("#search-bar input").val("")
                $("#search-bar input").focus()
            })

            $("#search-bar input").keydown(function (e) {
                if (e.isComposing || e.key === "Process" || e.keyCode === 229) {
                    return false
                }
                if (e.key === "ArrowUp") {
                    e.preventDefault()
                    let index = new Suggest().selectingSuggestItemIndex - 1
                    new Suggest(index).select()
                }
                if (e.key === "ArrowDown") {
                    e.preventDefault()
                    let index = new Suggest().selectingSuggestItemIndex + 1
                    new Suggest(index).select()
                }
            })

            $("#search-bar input").on("keyup", (e) => {
                //アイコン変更
                $("#search-bar img.right-icon").attr("src", new Suggest().selectingEngineData.icon)
                if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                    return false
                }
                new Suggest().create()

            })

            $("#search-bar button[type='reset']").click((e) => {
                this.formReset()
            })
        }
        get value() {
            if (new Suggest().selectingEngineData.name != "google") {
                return $("#search-bar input").val().slice(3)
            }
            return $("#search-bar input").val()
        }
        setValue() {
            $("#search-bar input").val(this.val)
            $("#search-bar input").select()
        }
        formReset() {
            this.setValue()
            new Suggest().remove()
        }
    }

    if (!localStorage.hasOwnProperty("tabpage-way")) {
        localStorage.setItem("tabpage-way", "tab")
    }

    tabPageWay = localStorage.getItem("tabpage-way");
    function tabPageSet() {
        if (tabPageWay === "page") {
            $("#search-bar input").attr("placeholder", "ページに移動...")
            $("#bottom-bar button.tab-page span.tab-page-context").text("新しいタブで開く")
            $("#search-bar img.tab").hide()
            $("#search-bar img.page").show()
        } else {
            if (tabPageWay === "tab") {
                $("#search-bar input").attr("placeholder", "新しいタブで開く...")
                $("#bottom-bar button.tab-page span.tab-page-context").text("ページに移動")
                $("#search-bar img.tab").show()
                $("#search-bar img.page").hide()
            }
        }
    }
    function tabPageToggle() {
        if (tabPageWay === "page") {
            tabPageWay = "tab"
            localStorage.setItem("tabpage-way", "tab")
            tabPageSet()
        } else {
            if (tabPageWay === "tab") {
                tabPageWay = "page"
                localStorage.setItem("tabpage-way", "page")
                tabPageSet()
            }
        }
    }

    function suggestAppend(value, icon, title, caption) {

        $("#suggest ul").loadTemplate($(".suggest-item"), {
            value: value, icon: icon, title: title, caption: caption, onclick: "window.open('" + new Suggest().selectingEngineData.url.search + title + "')"
        }, {
            append: true,
        })
        if ($("#suggest ul").hasClass("command")) {
            $("#suggest ul button").removeAttr("onclick")
        }
        if (icon === undefined) {
            $("#suggest button img").addClass("hide")
        }
    }

    class Suggest {
        constructor(index) {
            this.index = index
        }

        create() {


            if ($("#search-bar input").val().length) {
                $("#bottom-bar .tab-page").hide()
                if (tabPageWay === "page") {
                    $("#bottom-bar .page").show()
                } else {
                    if (tabPageWay === "tab") {
                        $("#bottom-bar .tab").show()
                    }
                }
            } else {
                $("#bottom-bar .tab-page").show()
                $("#bottom-bar .page").hide()
                $("#bottom-bar .tab").hide()
            }



            realValue = $("#search-bar input").val()
            if (!realValue.length) {  //0
                $("#suggest ul").remove()
                $("#suggest").loadTemplate($(".suggest-box"), "command", {
                    append: true
                })
                suggestAppend("/y ", "img/icon/youtube.svg", "Youtubeで検索", "/y")
                suggestAppend("/w ", "img/icon/wikipedia.svg", "Wikipediaで検索", "/w")
                suggestAppend("/x ", "img/icon/twitter.svg", "Xで検索", "/x")
                suggestAppend("/f ", "img/icon/facebook.svg", "Facebookで検索", "/f")

                $("#suggest ul button").on("click", function () {
                    new Suggest($("#suggest ul button").index(this)).select()
                })
                return false;
            } else {
                if (this.selectingEngineData.name === "x" || this.selectingEngineData.name === "facebook") {
                    $("#suggest ul.command").remove()
                    $("#suggest ul").remove()
                }
            }
            $.ajax({
                url: this.selectingEngineData.url.suggest + new SearchBox().value,
                type: "GET",
                dataType: "jsonp",
                jsonpCallback: "callback",
            }).done(data => {
                $("#suggest ul").remove()
                $("#suggest").loadTemplate($(".suggest-box"), new SearchBox().value, {
                    append: true, complete: () => {
                        if (!data[1].length) {
                            $("#suggest ul").remove()
                        }
                    }
                })
                data[1].forEach(element => {
                    suggestAppend(this.selectingEngineData.command + element, undefined, element, "")
                })
                $("#suggest ul").loadTemplate($(".suggest-item"), data[1], {
                    append: true,
                })
                $("#suggest button:has(.title:empty)").remove()
            })
        }

        remove() {
            $("#suggest ul").remove()
        }

        get selectingSuggestItemIndex() {
            return $("#suggest ul button").index($("#suggest ul button.selected"))
        }

        get selectingSuggestItemWord() {
            return $("#suggest ul button").eq(this.index).val()
        }

        get selectingEngineData() {
            switch ($("#search-bar input").val().slice(0, 3)) {
                case "/y ":
                    return engineData.find(e => e.command === "/y ")
                    break
                case "/w ":
                    return engineData.find(e => e.command === "/w ")
                    break
                case "/x ":
                    return engineData.find(e => e.command === "/x ")
                    break
                case "/f ":
                    return engineData.find(e => e.command === "/f ")
                    break
                default:
                    return engineData.find(e => e.name === "google")
            }
        }

        select() {
            if (this.index === -2 || this.index === $("#suggest button").length) { // ストッパー
                return false
            }

            this.deselect()
            if (this.index === -1) {
                $("#search-bar input").focus()
                return false
            }

            $("#suggest ul button").eq(this.index).addClass("selected")
            new SearchBox(this.selectingSuggestItemWord).setValue()
            if (new SearchBox().value.length) {
                if (this.selectingSuggestItemWord.toLowerCase().indexOf(realValue.toLowerCase()) === 0) {
                    $("#search-bar input").focus()
                    $("#search-bar input")[0].setSelectionRange(realValue.length, this.selectingSuggestItemWord.length)
                }
            } else {
                $("#search-bar input").focus()
                $("#search-bar input")[0].setSelectionRange(3, 3)
            }
        }

        deselect() {
            $("#suggest ul button").removeClass("selected")
            new SearchBox(realValue).setValue()
            window.getSelection().removeAllRanges()
            $("#search-bar input")[0].focus()
            $("#search-bar input")[0].setSelectionRange(realValue.length, realValue.length)
        }
    }

    new SearchBox().create()
    new Suggest().create()
    $("#searcher").draggable()
    tabPageSet()
    
    $("#searcher").on("mousedown",function(){
        $('#searcher input').focus()
    })
})
