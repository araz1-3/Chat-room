import React from 'react';

import styles from "./Navbar.module.css"

const Navbar = ({logout}) => {
    return (
        <div className={styles.container}>
            <div className={styles.name}>
                BotoChat
            </div>
            <div className={styles.logout} onClick={logout}>
                Logout
            </div>
        </div>
    );
};

export default Navbar;