document.querySelectorAll('.square').forEach(square => {
  square.addEventListener('click', () => {
    square.classList.toggle('red');
  });
});
document.querySelectorAll('.time').forEach(time => {
  time.addEventListener('click', () => {
    time.classList.toggle('red');
  });
});
