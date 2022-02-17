
/*Created by Sanket - BT19CSE032*/



import React from "react";

function About_us()
{
    return(
    <>
        <div className="Header">
            <div className="software_name">
                Name of Software
            </div>
            <div className="login_signup_etc">
                <a href="#" className="login_signup"> Teacher Login  </a>
                <a href="#" className="login_signup"> Student Login  </a>
                <a href="#" className="login_signup">  Signup  </a>
            </div>
        </div>
        <div className="Aboutus">
            <div className="Aboutus_1">About Us</div>
            <div className="Features">
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
            </div>
        </div>
        <div className="Footer">
            Contact us
            <li className="contactus_1">Drop us an Email at support@xyz.com</li>
        </div>
        
    </>
);
}

export default About_us;