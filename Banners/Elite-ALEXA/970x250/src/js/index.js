var nameSpace = LINEAGE || {};

(function() {
    "use strict";

    var timeline;
    var wrapper, clickThrough, logo, copy, cta, width, height, ids;

    // Query elements
    var scrollWrapper = document.getElementById("scroll-wrapper");
    var content = document.getElementById("content");
    var anchor = document.getElementById("anchor");
    var scrollbar = document.getElementById("scrollbar");
    var track = document.getElementById("track");
    var thumb = document.getElementById("thumb");

    // Get the bounding rectangles
    var wrapperRect = scrollWrapper.getBoundingClientRect();
    // console.group("wrapper rect: ", wrapperRect);
    var anchorRect = anchor.getBoundingClientRect();
    // console.log("anchor rect:", anchorRect);

    // Set the scrollbar position
    var top = wrapperRect.top - anchorRect.top;
    // console.log("wrapper rect top: ", wrapperRect.top);
    var left = wrapperRect.left - 25;
    //scrollbar.style.top = top + "px";
    // scrollbar.style.left = left + "px";

    // The scrollbar has the same height as the wrapper
    scrollbar.style.height = wrapperRect.height + "px";

    // Set the initial height for thumb
    var scrollRatio = content.clientHeight / scrollWrapper.scrollHeight;
    // var thumbRatio = 0.61;
    //  track.offsetHeight / content.scrollHeight;
    console.log("scrollbar height: ", scrollbar.offsetHeight);
    console.log("track height: ", track.offsetHeight);
    console.log("scroll ratio: ", scrollRatio);
    console.log("scroll height: ", content.scrollHeight);

    var pos = { top: 0, y: 0 };

    var mouseDownThumbHandler = function(e) {
        // console.log("mouseDown");
        pos = {
            // The current scroll
            top: content.scrollTop,
            // Get the current mouse position
            y: e.clientY,
        };

        thumb.classList.add("grabbing");
        document.body.classList.add("grabbing");

        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
    };

    var mouseMoveHandler = function(e) {
        // How far the mouse has been moved
        var dy = e.clientY - pos.y;
        // Scroll the content
        content.scrollTop = pos.top + dy / scrollRatio;
    };

    var mouseUpHandler = function(e) {
        thumb.classList.remove("grabbing");
        document.body.classList.remove("grabbing");

        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
    };

    var scrollContentHandler = function() {
        window.requestAnimationFrame(function() {
            // var p = content.scrollTop / (track.scrollHeight - 15);
            var p = content.scrollHeight / (track.offsetHeight + thumb.offsetHeight);

            // console.log(p);
            // console.log("content SCROLL TOP: ", content.scrollTop);
            // console.log(content.scrollHeight - content.clientHeight);
            // console.log("track offset height: ", track.offsetHeight);
            // console.log("track client height: ", track.clientHeight);
            // console.log("content offset height: ", content.offsetHeight);
            // console.log("content client height: ", content.clientHeight);
            // console.log("wrapper offset height: ", scrollWrapper.offsetHeight);
            // console.log("wrapper client height: ", scrollWrapper.clientHeight);
            thumb.style.top = p * content.scrollTop + "px";
            //         thumb.style.top = `${
            //     (content.scrollTop * content.clientHeight) /
            //     (content.scrollHeight * track.clientHeight)
            //   }%`;
        });
    };

    var trackClickHandler = function(e) {
        var bound = track.getBoundingClientRect();
        var percentage = (e.clientY - bound.top) / bound.height;
        // console.log("Track Client HEIGHT: ", track.clientHeight);
        // console.log("CONTENT SCROLL HEIGHT: ", content.scrollHeight);
        // console.log("CONTENT CLIENT HEIGHT: ", content.clientHeight);
        // console.log("SCROLL WRAPPER CLIENT HEIGHT: ", scrollWrapper.clientHeight);
        content.scrollTop =
            percentage * (content.scrollHeight - scrollWrapper.clientHeight);
    };

    content.addEventListener("scroll", scrollContentHandler);
    thumb.addEventListener("mousedown", mouseDownThumbHandler);
    track.addEventListener("click", trackClickHandler);

    nameSpace.init = function() {
        // Initialize any variables here
        ids = [];

        width = 970;
        height = 250;

        //SET IDs IN DOM TO GLOBAL VARIABLES
        var allElements = document.getElementsByTagName("*");
        //grabs all elements and makes them variables
        for (var q = 0; q < allElements.length; q++) {
            var el = allElements[q];
            if (el.id) {
                window[el.id] = document.getElementById(el.id);
                //separates what we don't want to hide initially
                if (
                    el.id !== "wrapper" &&
                    el.id !== "click_through" &&
                    el.id !== "bg"
                ) {
                    ids.push(el);
                }
            }
        }

        // gsap.set("#allNums", { autoAlpha: 0 });

        gsap.set(["#copy-1"], {
            x: 0,
            y: 0,
            autoAlpha: 1,
        });
        gsap.set(["#cta"], {
            x: 0,
            autoAlpha: 0,
        });
        // gsap.set(['#cta', '#code'], { autoAlpha: 0 });

        wrapper = nameSpace.$("#wrapper");
        clickThrough = document.getElementById("click_through");
        cta = nameSpace.$("#cta");
        /* end added by me */

        wrapper.addClass("show");

        nameSpace.initClickTag();
        nameSpace.initAnimation();

        if (nameSpace.useFallback()) {
            nameSpace.injectFallback();
        } else {
            nameSpace.startAnimation();
        }

        click_through.onmouseover = function() {
            gsap.to("#cta", 0.1, {
                scale: 1,
                opacity: 0.8,
                y: 0,
                transformOrigin: "10% 50%",
                force3D: true,
                rotationZ: 0.01,
                transformPerspective: 400,
            });
        };

        click_through.onmouseout = function() {
            gsap.to("#cta", 0.1, {
                scale: 1,
                opacity: 1,
                force3D: true,
                z: 0.01,
                rotationZ: 0.01,
                transformPerspective: 400,
                y: 0,
            });
        };
    };

    nameSpace.initClickTag = function() {
        clickThrough.onclick = function() {
            window.open(window.clickTag);
        };
    };

    nameSpace.injectFallback = function() {
        // var body = document.body;

        // while (body.firstChild) {
        //     body.removeChild(body.firstChild);
        // }

        // var anchor = document.createElement("a");
        // anchor.style.cursor = "pointer";

        // var img = new Image();
        // img.src = "./img/static.jpg";

        // anchor.appendChild(img);
        // anchor.onclick = function() {
        //     window.open(window.clickTag);
        // };
        // document.body.appendChild(anchor);
    };

    nameSpace.initAnimation = function() {
        // gsap can be used to set css
        // It will even take care of browser prefixes
        // gsap.set(logo, {x:100, y:50, opacity:0});

        timeline = new gsap.timeline({
            delay: 0.5,
            onComplete: nameSpace.onAnimationComplete,
        });

        timeline.pause();

        timeline.to(
            ["#cta"],

            { duration: 1, autoAlpha: 1, ease: Cubic.easeInOut },
            "+=0.5"
        );
    };

    // function traceTime(){
    // 	console.log("slideTime: " + timeline.time());
    // }

    nameSpace.startAutoScroll = function() {
        // console.log("should be scrolling");
        var contentHeight = document.querySelector("#scroll-wrapper").offsetHeight;
        // console.log("content height: ", contentHeight);
        // console.log("content height: ", content.scrollHeight);

        gsap.to("#content", {
            duration: 80,
            scrollTo: {
                y: content.clientHeight,
                autoKill: true,
                force3D: true,
                rotationZ: 0.01,
            },
        });
    };

    nameSpace.hideBg = function() {
        gsap.to("#bg", { duration: 0, autoAlpha: 0 });
    };

    nameSpace.startAnimation = function() {
        // Code for animation
        timeline.play();
        // startBgImg();
        gsap.delayedCall(4, nameSpace.startAutoScroll);
        // gsap.delayedCall(	7.5, loop);
    };

    nameSpace.onAnimationComplete = function() {
        // Log duration of timeline
        console.log("Animation Duration: " + timeline.time() + "s");

        // Show a CTA or any animations outside main timeline
        // gsap.from( cta, 0.4, { y: '110%' } );
        // gsap.to( cta, 0.4, { opacity: 1 } );
    };
})();

var count = 1;

function loop() {
    if (count < 2) {
        console.log(count);
        count++;
        LINEAGE.init();
    }
}
//