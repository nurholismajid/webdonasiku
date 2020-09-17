import React from 'react';
    const slider = ({sliders}) =>{
        var no = 0;
       
        const loopslider = sliders.map(slider=>{
            if(no == 0){
                var active = "active";
            }else{
                var active = "";
            }
            var background ={
                background:"url("+slider.cover+")",
            }
            no += 1;
            return(
                <div className={"item "+active} style={background}>
                   <a href={slider.url}>
                   <div className="text-box">
                    <h1 className="title-slider">{slider.title}</h1>
                    <p className="desc-slider">{slider.description}</p>   
                    </div>
                    </a> 
                </div>
                )
        })
        
        const loopcontroller = sliders.map(slider=>{
            if(no > 1){
                var active = "active";

            }else{
                var active = "";
            }
            var indext = no;
            no += -1;
            return(
                <li data-target="#myCarousel" data-slide-to={indext} className={active}></li>
                )
        })
        
        if(sliders.length == 1){
            var display ={display:"none"}
        }else{
            var display ={display:"block"}
        }
        
        return (
            <div id="myCarousel" className="carousel slide" data-ride="carousel">
                <ol style={display} className="carousel-indicators">
                {loopcontroller}
                </ol>
                <div className="carousel-inner">                    
                {loopslider}
                </div>
                <a style={display} className="left carousel-control" href="#myCarousel" data-slide="prev">
                <span className="glyphicon glyphicon-chevron-left"></span>
                <span className="sr-only">Previous</span>
                </a>
                <a style={display} className="right carousel-control" href="#myCarousel" data-slide="next">
                <span className="glyphicon glyphicon-chevron-right"></span>
                <span className="sr-only">Next</span>
                </a>
            </div>
        );
    }
    

export default slider;