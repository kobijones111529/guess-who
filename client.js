const state = {
  people,
  currentPersonID: Math.floor(Math.random() * people.length)
};

$(document).ready(function () {
  renderCurrentPerson();
  renderPictures();
});

function renderPictures() {
  const jQElem = $('#pictures');
  jQElem.empty();

  state.people
    .map(person => githubProfileURL(person.githubUsername))
    .forEach(url => {
      jQElem.append(`
        <img src="${url}">
      `);
    });
};

function renderCurrentPerson() {
  const jQElem = $('#guess-name');
  jQElem.text(state.people[state.currentPersonID].name);
}

function githubProfileURL(username) {
  return `https://github.com/${username}.png?size=256`;
}
