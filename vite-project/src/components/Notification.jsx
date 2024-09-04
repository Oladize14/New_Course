import React, { useEffect, useState } from 'react';

const Notification = ({ message, success }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (message) {
            setShow(true);
            // Hide the notification after 3 seconds
            const timer = setTimeout(() => {
                setShow(false);
            }, 5000);

            // Cleanup the timer if the component unmounts or message changes
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (message === null) {
        return null;
    }

    return (
        <>
            <div className={`notification ${success ? 'success' : 'error'} ${show ? 'show' : ''}`}>
                {message}
            </div>
        </>
    );
}

export default Notification;
