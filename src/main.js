import './style.css'

console.log('Vite frontend loaded');

fetch('/api/')
  .then(res => res.json())
  .then(data => console.log(data));

