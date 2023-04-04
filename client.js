const state = {
  people,
  currentPersonIndex: Math.floor(Math.random() * people.length)
};

$(document).ready(function () {
  renderCurrentPerson();
  renderPictures();

  $('#pictures').on('click', 'img', function(e) {
    const index = $(e.target).index();
    if (index === state.currentPersonIndex) {
      state.currentPersonIndex = Math.floor(Math.random() * state.people.length);
    } else {
      $(e.target).addClass('wiggle');
      setTimeout(() => $(e.target).removeClass('wiggle'), 400);
    }
    renderCurrentPerson();
  });
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
}

function renderCurrentPerson() {
  const jQElem = $('#guess-name');
  jQElem.text(state.people[state.currentPersonIndex].name);
}

function githubProfileURL(username) {
  return `https://github.com/${username}.png?size=256`;
}
