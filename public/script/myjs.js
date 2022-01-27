



const weatherForm=document.querySelector('form')
const city=document.querySelector('input')
const msgone =document.querySelector('#msg1');
const msgtwo =document.querySelector('#msg2');
msgone.textContent='';
const msgthree =document.querySelector('#msg3');
msgthree.textContent='';

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
  console.log(city.value);
  
const url='/weather?city='+city.value;
console.log(url);
fetch(url).then((res)=>{
  res.json().then((data)=>{
    console.log(data);
    msgone.textContent=data.location;
    msgtwo.textContent=data.temp;
    msgthree.textContent=data.prec;
  });
})
})