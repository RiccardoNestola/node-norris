const loadApi = (url, onSuccess) => {
  fetch(url)
    .then((data) => data.json())
    .then((data) => {
      onSuccess(data)
    })
}


module.exports = loadApi