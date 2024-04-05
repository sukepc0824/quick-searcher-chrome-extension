$(function () {
    engineData = searcher.engineData.applied

    class Background {
        create() {
            new Searcher().saveLocalStorage()

            $("background-img").removeAttr("class")
            $("background-img img").hide()
            $("background-img").addClass(searcher.settings.background.genre)

            $("#searcher").addClass("background")
            $("background-img").attr("time", this.time)

            switch (searcher.settings.background.genre) {
                case "default":
                    $("footer").removeClass("inversion")
                    $("#searcher").removeClass("background")
                    $("body>button").removeClass("inversion")
                    break

                case "timechange":
                    $("footer").removeClass("inversion")
                    $("body>button").addClass("inversion")
                    $("background-img").fadeIn()
                    break

                case "random":
                    $("body>button").addClass("inversion")
                    $("footer").addClass("inversion")
                    $("background-img img").attr("src",
                        'https://source.unsplash.com/random/1920x1080/?' + searcher.settings.background.words
                    )
                    $("background-img img").on('load', () => {
                        $("background-img img").fadeIn()
                    })
                    break

                case "image":
                    $("body>button").addClass("inversion")
                    $("footer").removeClass("inversion")
                    $("background-img img").attr("src",
                        searcher.settings.background.imgURL
                    )
                    $("background-img img").on('load', () => {
                        $("background-img img").fadeIn()
                    })
            }
        }
        get time() {
            const currentTime = new Date().getHours()
            switch (true) {
                case currentTime >= 5 && currentTime < 7: return 'twilight'
                    break
                case currentTime >= 7 && currentTime < 9: return 'sunrise'
                    break
                case currentTime >= 9 && currentTime < 18: return 'day'
                    break
                case currentTime >= 18 && currentTime < 21: return 'evening'
                    break
                case currentTime >= 21 && currentTime < 22: return 'twilight'
                    break
                default: return "night"
            }
        }
    }

    class BackgroundDialog {
        create() {
            $("#settings input#keyword").val(searcher.settings.background.words)
            $("#settings input#url").val(searcher.settings.background.imgURL)
            console.log(searcher.settings.background)
            if (searcher.settings.background.genre === 'default') {
                $(`#settings input#toggle`).prop("checked", false)
            } else {
                $(`#settings input#toggle`).prop("checked", true)
                $(`#settings input[type='radio']`).val([searcher.settings.background.genre])
            }

            $("#settings input").on("input", () => {
                if ($("#settings input#toggle").prop("checked")) {
                    searcher.settings.background.words = $("input#keyword").val()
                    searcher.settings.background.imgURL = $("input#url").val()
                    searcher.settings.background.genre = $("#settings input[type='radio']:checked").prop("id")
                } else {
                    searcher.settings.background.genre = "default"
                }
                new Background().create()
            })

        }
    }

    class Searcher {
        create() {
            if (localStorage.getItem("searcher") === null) {

            } else {
                searcher = JSON.parse(localStorage.getItem("searcher"))
            }
        }
        saveLocalStorage() {
            localStorage.setItem("searcher", JSON.stringify(searcher))
        }
    }

    class Tabs {
        constructor(name) {
            this.name = name
        }
        create() {
            $("#tabs .engine-tabs").loadTemplate($(".engine-button"), engineData)

            $("#tabs input").click(function (e) {
                let name = $(this).val()
                new Tabs(name).select()
                new Suggest().create()
                new Suggest().deselect()
            })

            $("#tabs").sortable({
                animation: 350,
                draggable: 'button',
                ghostClass: 'sortable-ghost',
                onUpdate: () => {
                    $("#tabs button").blur()
                }
            })
        }
        select() {
            if (this.selectingEngineData === "settings") {
                $("#search-bar").hide()
                $("#suggest").hide()
                $("#settings table").show()
            } else {
                $(`#tabs input[value="${this.name}"]`).prop("checked", true)
                $("#suggest").show()
                $("#settings table").hide()
                $("#search-bar").show()
                new SearchBox().setPlaceholder()
            }
        }

        get selectingEngineData() {
            let name = $(`#tabs input:checked`).val()
            if (name === "settings") {
                return "settings"
            } else {
                let data = engineData.find(engineData => engineData.name === name)

                return data
            }
        }

        get selectingEngineIndex() {
            return engineData.indexOf(this.selectingEngineData)
        }
    }

    let realValue
    class SearchBox {
        constructor(val) {
            this.val = val
        }
        create() {
            $("form").submit(function (e) {
                e.preventDefault()
                engineData[new Tabs().selectingEngineIndex].history.unshift(new SearchBox().data.value)
                new Searcher().saveLocalStorage()
                console.log(engineData)
                //location.assign(new Tabs().selectingEngineData.url.search + new SearchBox().data.value)
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
                if (e.key === "ArrowLeft" & new SearchBox().data.value.length === 0) {
                    e.preventDefault()
                    new Tabs(engineData[new Tabs().selectingEngineIndex - 1].name).select()
                }
                if (e.key === "ArrowRight" & new SearchBox().data.value.length === 0) {
                    e.preventDefault()
                    new Tabs(engineData[new Tabs().selectingEngineIndex + 1].name).select()
                }
            })

            $("#search-bar input").on("input", (e) => {
                if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
                    return false
                }
                new Suggest().create()
            })

            $("#search-bar button[type='reset']").click((e) => {
                this.formReset()
            })
        }
        get data() {
            return {
                value: $("#search-bar input").val(),

                toha: $("#search-bar input").val().includes("とは"),
                wordValue: $("#search-bar input").val().replace("とは", "")
            }
        }
        setValue() {
            $("#search-bar input").val(this.val)
            $("#search-bar input").select()
        }
        setPlaceholder() {
            $("#search-bar input")[0].placeholder = new Tabs().selectingEngineData.label
        }
        formReset() {
            this.setValue()
            new Suggest().remove()
        }
    }

    function getIsDuplicate(arr1, arr2) {
        return arr1.filter(item => arr2.includes(item)).length
    }

    class Suggest {
        constructor(index) {
            this.index = index
        }
        create() {
            realValue = new SearchBox().data.value
            $.ajax({
                url: new Tabs().selectingEngineData.url.suggest + new SearchBox().data.value,
                type: "GET",
                dataType: "jsonp",
                jsonpCallback: "callback",
            }).done(data => {
                $("#suggest ul").remove()
                $("#suggest").loadTemplate($(".suggest-box"), new SearchBox().data.value, {
                    append: true,
                })

                data[1].map((e) => data[1].push({ title: e, type: "suggest" }))

                $("#suggest ul").loadTemplate($(".suggest-item"), data[1], { append: true })


                $("#suggest button:has(.title:empty)").remove()


                let websiteListNameArray = website_list.map(element => {
                    return element.name.toLowerCase()
                })
            })

            //Suggest Wikipedia
            if (new SearchBox().data.toha === true) {
                $.ajax({
                    url: "https://ja.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" + new SearchBox().data.wordValue + "&format=json",
                    type: "GET",
                    dataType: "jsonp",
                }).done(data => {
                    let extract = data.query.pages[Object.keys(data.query.pages)].extract
                    $("#suggest ul").loadTemplate($(".suggest-item"), {
                        title: new SearchBox().data.wordValue,
                        caption: extract,
                        type: "caption"
                    }, {
                        append: true, success: () => {
                            $("#suggest button span:empty").parents(".caption").remove()
                        }
                    })
                })
            }

        }
        remove() {
            $("#suggest ul").remove()
        }

        get selectingSuggestItemIndex() {
            return $("#suggest ul button").index($("#suggest ul button.selected"))
        }

        get selectingSuggestItemWord() {
            return $("#suggest ul button .title").eq(this.index).html()
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

            if (this.selectingSuggestItemWord.toLowerCase().indexOf(realValue.toLowerCase()) === 0) {
                $("#search-bar input").focus()
                $("#search-bar input")[0].setSelectionRange(realValue.length, this.selectingSuggestItemWord.length)
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

    new Tabs().create()
    new SearchBox().create()

    new Tabs('検索').select()

    new Searcher().create()
    new Background().create()
    new BackgroundDialog().create()
})