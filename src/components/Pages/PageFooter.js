import React from 'react';


const PageFooter = (props) => {
    const year = new Date().getFullYear();

    return(
        <div className="p-3 text-center">
            <span className="mr-2">&copy;</span>
            <span>{year}</span>
            <span className="mx-2">-</span>
            <span>Bizz Apps</span>
        </div>
    );

};

export default PageFooter;