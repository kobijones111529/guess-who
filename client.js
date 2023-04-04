const state = {
  people,
  currentPersonIndex: Math.floor(Math.random() * people.length),
  guessing: true
};

$(document).ready(function () {
  randomizePeople();
  renderPrompt();
  renderPictures();

  $('#pictures').on('click', 'img', function(e) {
    if (!state.guessing) return;

    const index = $(e.target).index();
    if (index === state.currentPersonIndex) {
      // Hide other pictures
      $('.picture').addClass('hide');
      $(e.target).removeClass('hide');

      state.guessing = false;
      renderPrompt();

      // Reset after cooldown
      setTimeout(function() {
        // Reset animation
        $('.picture').removeClass('hide');

        // Reset game
        state.guessing = true;
        randomizePeople();
        renderPictures();
        renderPrompt();
      }, 2000);
    } else {
      // Wiggle picture on incorrect guess
      $(e.target).addClass('wiggle');
      // Reset animation after running
      setTimeout(() => $(e.target).removeClass('wiggle'), 400);
    }
    renderPrompt();
  });
});

function randomizePeople() {
  state.people = state.people
    .map(person => [Math.random(), person])
    .sort()
    .map(([_, person]) => person);
  state.currentPersonIndex = Math.floor(Math.random() * state.people.length);
}

function renderPictures() {
  const jQElem = $('#pictures');
  jQElem.empty();

  state.people
    .map(person => githubProfileURL(person.githubUsername))
    .forEach(url => {
      jQElem.append(`
        <img class="picture" src="${url}">
      `);
    });
}

function renderPrompt() {
  const jQPrompt = $('#prompt');
  jQPrompt.empty();
  const text = state.guessing
    ? `Click on ${state.people[state.currentPersonIndex].name}`
    : 'Correct!';

  jQPrompt.append(`<h1>${text}</h1>`);
}

function githubProfileURL(username) {
  return `https://github.com/${username}.png?size=256`;
}
