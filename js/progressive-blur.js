$(function () {
    for (let i = 0; i < 100; i++) {
        $("<div>").appendTo("progressive-blur")
            .css({
                "height": (100 - i) + "%",
                "backdrop-filter": "blur(" + i * 0.04 + "px)",
                "-webkit-backdrop-filter": "blur(" + i* 0.04 + "px)"
            })
    }
})