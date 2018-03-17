const dialog = document.querySelector('dialog')
const icons = document.querySelectorAll('.iconBox')
const filter = document.querySelector('.filter')
const clipboard = new Clipboard('.iconBox')

filter.addEventListener('input', onInput)
clipboard.on('success', showSuccessDialog)

function showSuccessDialog(e) {
  dialog.innerHTML = `" <u>${e.text}</u> " copied`
  dialog.showModal()
  setTimeout(() => dialog.close(), 1234)
}

function onInput(e) {
  const text = e.currentTarget.value

  icons.forEach(icon => {
    if (
      text === '' ||
      icon.getAttribute('data-clipboard-text').includes(text)
    ) {
      icon.classList.remove('hidden')
    } else {
      icon.classList.add('hidden')
    }
  })
}
