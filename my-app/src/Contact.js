import React, { useEffect } from 'react';

function Contact(){

    useEffect(() => {        
        document.title ="Contact"
    },[])

    return(
        <a href="mailto:jdarling183@gmail.com?subject=Inquiry%20from%20jdarling.dev">Email me at 'jdarling183@gmail.com'</a>
    )
}

export default Contact;