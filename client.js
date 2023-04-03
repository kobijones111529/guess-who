$(document).ready(function () {
  renderPictures();
});

function renderPictures() {
  const jQElem = $('#pictures');
  jQElem.empty();

  people
    .map(person => githubProfileURL(person.githubUsername))
    .forEach(url => {
      jQElem.append(`
        <img src="${url}">
      `);
    });
};

function githubProfileURL(username) {
  return `https://github.com/${username}.png?size=250`;
}
