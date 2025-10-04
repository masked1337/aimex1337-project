var cTag = null

function go_to(tag, force = true) {
    if (cTag == tag) {
        return
    }
    cTag = tag
    if (force) {
        $('html, body').stop().animate({
            scrollTop: $("#" + tag).offset().top
        }, 500);
    }
    $("nav .active").removeClass("active");
    $(`a[href='/` + "#" + tag + `']`).parent().addClass("active");
}

$("a").on("click", function(e) {
    var href = $(this).attr("href")
    if (href.split("#").length == 2) {
        e.preventDefault()
    }
    go_to(href.split("#")[1])
})
if (window.location.href.split("#")[1]) {
    var tag = window.location.href.split("#")[1]
    go_to(tag)
} else {
    go_to("home")
}
var end = false

$(document).ready(function() {
    $("#home p").text(`Hi, I'm a YouTuber who loves gaming and creating content.
    I also enojoy working with HTML, CSS and Python from time to time.`)
    $("#contact_form").submit(function(event) {
        event.preventDefault();
        if (end) {
            return
        }
        $("button[type='submit']").text("Sending...")
        end = true
        var formData = $(this).serialize();

        var URL = `https://l.webhook.party/hook/---replace`;

        $.ajax({
            url: URL,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                content: `**Ime:** ${$("#name").val()}\n**Email:** ${$("#email").val()}\n**Poruka:** ${$("#message").val()}`
            }),
            success: function(response) {
                $("form input, form textarea").attr("disabled", true)
                $("button[type='submit']").text("Message sent! ^-^")
                $("button[type='submit']").addClass("act")
                $("#contact_form").trigger("reset");
            }
        });
    });
});



$(window).scroll(function() {
    var scrollPosition = $(this).scrollTop();
    var sections = [
        {id: "home",element: $("#home")},
        {id: "thumbnails",element: $("#thumbnails")},
        {id: "websites",element: $("#websites")},
        {id: "skills",element: $("#skills")},
        //{id: "about",element: $("#about")},
        //{id: "feedback",element: $("#feedback")},
        {id: "contact",element: $("#contact")}
    ];

    for (var i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].element.offset().top - 50) {
            go_to(sections[i].id, false);
            break;
        }
    }
});

$("#websites .projects .project").on("click", function() {
    $(this).find(".preview").slideToggle(300)
})

$(".thumbs .project").on("click", function() {
    $(this).find(".photos").slideToggle(300)
})

$(".thumbs .project img").on("click", function(e) {
    e.stopPropagation()
    var src = $(this).attr("src")
    var popup = $(
        '<div id="img-popup" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 9999;">' +
        '<img src="' + src + '" style="max-width: 90vw; max-height: 90vh; box-shadow: 0 0 10px black; cursor: pointer;">' +
        '</div>'
    )
    $("body").append(popup)
    $("#img-popup").on("click", function() {
        $(this).remove()
    })
})
