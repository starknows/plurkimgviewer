let timeout
let bodyDom = $('body.timeline')
let size = { width: null, height: null }

function reSetSize(size) {
  $('.plurkIMG-popup-wrapper')
    .css('top', `${(100 - size.height) / 2}%`)
    .children('img')
    .css({ width: `${size.width}vw`, height: `${size.height}vh` })
}

function viewerAction(isOpen) {
  let target = isOpen
    ? `.plurkIMG-place-${isOpen}`
    : '.plurkIMG-popup-wrapper.active'
  $(target).toggleClass('notActive active')
}

chrome.storage.sync.get(['size'], function (result) {
  size.width = result.size.width
  size.height = result.size.height
  reSetSize(size)
})

chrome.storage.onChanged.addListener(function (changes) {
  size = changes.size.newValue
  reSetSize(size)
})

$(bodyDom)
  .css('position', 'relative')
  .append(
    `<figure class="plurkIMG-popup-wrapper plurkIMG-place-left notActive">
    <img src="">
    </figure>
    <figure class="plurkIMG-popup-wrapper plurkIMG-place-right notActive">
    <img src="">
    </figure>`
  )
  .on('mouseenter', 'a.pictureservices > img', function (e) {
    if (
      $('.cbox_left .img-holder').length > 0 ||
      e.target.src.indexOf('imgs.plurk')
    )
      return true
    timeout && clearTimeout(timeout)
    //imgs.plurk直接跳過
    //i.ytimg >> default換成hqdefault
    let src
    if (!e.target.alt) {
    } else {
      src = e.target.alt
    }

    let place = e.pageX > $(window).width() / 2 ? 'left' : 'right'
    let activeViewer = $('.plurkIMG-popup-wrapper.active')
    if ($(activeViewer).length < 1) {
      viewerAction(place)
      activeViewer = $('.plurkIMG-popup-wrapper.active')
    }
    $(activeViewer)
      .children('img')
      .attr('src', src)
      .on('load', function (e) {
        e.target.style.filter = 'blur(0) drop-shadow(0 0 0.5rem #333)'
      })
  })
  .on('mouseleave', 'a.pictureservices > img', function () {
    $('.plurkIMG-popup-wrapper.active > img').css('filter', 'blur(10px)')
    timeout = setTimeout(function () {
      viewerAction(false)
      $('.plurkIMG-popup-wrapper')
        .children('img')
        .attr('src', chrome.runtime?.getURL('images/Loading.gif') || null)
        .css('filter', 'blur(0px)')
    }, 150)
  })
