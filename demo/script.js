;(() => {
// ---

const dialog = document.querySelector(`dialog`)
const clipboard = new Clipboard(`.iconBox`)

clipboard.on(`success`, showSuccessDialog)

function showSuccessDialog(e) {
  dialog.innerHTML = `" <u>${e.text}</u> " copied`
  dialog.showModal()
  setTimeout(() => dialog.close(), 1234)
}

// ---
})()
