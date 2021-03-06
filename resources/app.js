import pluginCall from "sketch-module-web-view/client"

// Disable the context menu to have a more native feel
if (process.env.NODE_ENV === "production") {
  document.addEventListener("contextmenu", e => e.preventDefault())
}

// All inputs
let allInputs = []
;[
  "gridHorizontalSpace",
  "gridVerticalSpace",
  "snapDistance",
  "renameArtboards",
  "arrangeOnAdd"
].forEach(id => {
  allInputs.push(document.getElementById(id))
})

const populateSettings = () => {
  if (window.settings === undefined) populateSettings()
  allInputs.forEach(input => {
    if (input.type === "checkbox") {
      input.checked = window.settings[input.id]
    } else {
      input.value = window.settings[input.id]
    }
  })
}

const generateSettings = () => {
  let obj = {}
  allInputs.forEach(input => {
    let val = Number(input.value)

    if (input.type === "checkbox") {
      val = Boolean(input.checked)
    } else if (input.type === "text") {
      val = input.value
    }

    obj[input.id] = val
  })

  return obj
}

populateSettings()

document.getElementById("submit").addEventListener("click", function() {
  pluginCall("updateSettings", generateSettings())
})
