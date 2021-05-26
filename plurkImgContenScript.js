let timeout
let bodyDom = $('body.timeline')
let size = { width: null, height: null }
let keyWord = [
  { host: 'twitter', key: 'pbs.twimg' },
  { host: 'youtube', key: 'i.ytimg' },
]

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
  .on(
    'mouseenter',
    '.ex_link.pictureservices , .ex_link.meta > img, a.ogvideo > img',
    function (e) {
      if (
        $('.cbox_left .img-holder').length > 0 ||
        e.target.src.indexOf('imgs.plurk') > 0
      ) {
        return true
      }
      timeout && clearTimeout(timeout)
      let src, host
      if (!e.target.alt) {
        for (let i = 0; i < keyWord.length; i++) {
          if (e.target.src.indexOf(keyWord[i].key) > 0) {
            host = keyWord[i].host
            break
          }
        }
        switch (host) {
          case 'twitter':
            src = e.target.src.replace(':large', ':medium')
            break
          case 'youtube':
            src = e.target.src.replace('/default', '/sddefault')
          default:
            break
        }
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
    }
  )
  .on(
    'mouseleave',
    '.ex_link.pictureservices , .ex_link.meta > img, a.ogvideo > img',
    function () {
      $('.plurkIMG-popup-wrapper.active > img').css('filter', 'blur(10px)')
      timeout = setTimeout(function () {
        viewerAction(false)
        $('.plurkIMG-popup-wrapper')
          .children('img')
          .attr('src', chrome.runtime?.getURL('images/Loading.gif') || null)
          .css('filter', 'blur(0px)')
      }, 150)
    }
  )
