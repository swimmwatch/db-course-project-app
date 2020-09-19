import * as React from "react";

import "./style.scss"

const Footer = () => {
    const currDate = new Date();

    return (
        <footer className="footer">
            <hr/>
            <p className="footer__copyright">&#169; Сopyright {currDate.getFullYear()}</p>
        </footer>
    );
};

export default Footer;