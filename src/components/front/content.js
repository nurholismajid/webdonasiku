import React from 'react';
    const slider = ({content}) =>{
        
        return (
            <section className="wow fadeIn bg-light-gray subartikel animated">
            <div className="container">
                <div className="font-body font-justify">
                <div dangerouslySetInnerHTML={ { __html: content } }></div>
                </div>
            </div>

            </section>
        );
    }
    

export default slider;