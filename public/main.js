const ledColorInput = document.querySelector('#ledColorInput');
const slider = document.querySelector('#brightnessSlider');
const buttons = document.querySelectorAll('button');

const socket = io();


buttons[0].addEventListener('click', (e) => {
  socket.emit('led1:toggle')
})
buttons[1].addEventListener('click', (e) => {
  socket.emit('led2:toggle')
})
buttons[2].addEventListener('click', (e) => {
  socket.emit('led3:toggle')
})
buttons[3].addEventListener('click', (e) => {
  socket.emit('leds:toggle')
})
buttons[4].addEventListener('click', (e) => {
  socket.emit('leds:pulse')
})

slider.addEventListener('input', (e) => {
  socket.emit('leds:brightness', e.target.value)
})




function changeLedColor(e){
  console.log(e.target.value);
  socket.emit('led:color', `${e.target.value}`);
}