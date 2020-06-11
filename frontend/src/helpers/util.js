export default {
  showSnackbar (message) {
    var notification = document.querySelector('#main-snackbar')
    notification.MaterialSnackbar.showSnackbar({message: message})
  }
}
