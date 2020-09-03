//const { response } = require("express")

console.log('client side js file loaded')


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#message-1')
const message2=document.querySelector('#message-2')
weatherForm.addEventListener('submit',(e)=>
{
    e.preventDefault();
    const location=search.value;
    message1.textContent=  'Loading.......'
    message2.textContent= 'sorry,for being awaited! '
if(!location)
{
    message1.textContent=  'must provide address'
    message2.textContent= ' '
}
fetch(`http://localhost:3000/weather?address=${encodeURIComponent(location)}`).then((response)=>
{
    
    response.json().then((data)=>
    {
        if(data.error)
        {
            return message2.textContent=data.error;
        }
        message1.textContent=`location :${data.location}`
        message2.textContent=`forcast :${data.forcast}`
    })
}
)
})
