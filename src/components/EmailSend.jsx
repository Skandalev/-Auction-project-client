import React from 'react'
import emailjs from '@emailjs/browser';

const EmailSend = () => {
    const sendEmail = () =>{
    var templateParams = {
        name: 'James',
        notes: 'Check this out!',
        myman: ' !!!!!!'
    };
     
    emailjs.send('service_fy69ye4', 'template_w6mm3i6', templateParams,'zoYqFXypoDCzjZ-8Z')
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
           console.log('FAILED...', error);
        });
    }
  return (
    <div>
    <button onClick={()=>{sendEmail()}}>11111</button>
    </div>
  )
}

export default EmailSend