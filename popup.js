let size = { width: null, height: null }

let widthInput = document.getElementById('inputWidth')
let heightInput = document.getElementById('inputHeight')

function setValue() {
  widthInput.value = size.width
  heightInput.value = size.height
}

document.getElementById('widthMinus').addEventListener('click', function (e) {
  handleChangeValue(e)
})
document.getElementById('widthPlus').addEventListener('click', function (e) {
  handleChangeValue(e)
})
document.getElementById('heightMinus').addEventListener('click', function (e) {
  handleChangeValue(e)
})
document.getElementById('heightPlus').addEventListener('click', function (e) {
  handleChangeValue(e)
})

function handleChangeValue(e) {
  console.log(e)
  let step = 5
  let limit = { width: [10, 50], height: [10, 90] }
  let target = e.target
  let type = target.dataset.target
  let action = target.dataset.action
  if (action === 'minus' && size[type] > limit[type][0]) {
    size[type] -= step
  } else if (action === 'plus' && size[type] < limit[type][1]) {
    size[type] += step
  }
  setValue()
  chrome.storage.sync.set({ size })
}

chrome.storage.sync.get(['size'], function (result) {
  size.width = result.size.width
  size.height = result.size.height
  setValue()
  if (result.size === null) {
    chrome.storage.sync.set({ size })
  }
})
