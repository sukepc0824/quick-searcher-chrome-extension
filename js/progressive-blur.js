$(function () {
    for (let i = 0; i < 50; i++) {
        $("<div>").appendTo("progressive-shadow")
            .addClass("shadow")
            .css({
                "top": -i + "px",
                "left": -i + "px",
                "width": "calc(100% + " + i * 2 + "px)",
                "height": "calc(100% + " + i * 2 + "px)",
                "backdrop-filter": "blur(" + (50 - i) * 0.04 + "px)",
                "-webkit-backdrop-filter": "blur(" + (50 - i) * 0.04 + "px)"
            })
    }
})
