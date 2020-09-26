import React from 'react';
    const Angka = ({penerimas, donasis}) =>{
        const jumlahpenerima = penerimas.length
        console.log(donasis)
        var totalbiaya = 0;
         penerimas.map(penerima=>{
         totalbiaya += penerima.kebutuhan_biaya
        })

        var totaldonasi = 0;
        donasis.map(donasi=>{
            totaldonasi += donasi.nominal_donasi
           })

        const priceSplitter = (number) => (number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
        return (
            <section className="wow fadeIn bg-light-gray subartikel animated">
            <div className="container">
               <div className="row">
                    <div className="col col-lg-3 col-md-6 col-sm-6">
                        <div className="card-angka">    
                        <h1>{jumlahpenerima}</h1>
                        <h4>Yang harus dibantu</h4>
                        </div>
                    </div> 
                    <div className="col col-lg-3 col-md-6 col-sm-6">
                    <div className="card-angka">
                        <h1>{"Rp. "+priceSplitter(totalbiaya)+",00"}</h1>
                        <h4>Total dana dibutuhkan</h4>
                        </div>  
                    </div>
                    <div className="col col-lg-3 col-md-6 col-sm-6">
                    <div className="card-angka">
                        <h1>{"Rp. "+priceSplitter(totaldonasi)+",00"}</h1>
                        <h4>Dana disalurkan</h4>
                        </div>
                    </div>
                    <div className="col col-lg-3 col-md-6 col-sm-6">
                    <div className="card-angka">
                        <h1>10</h1>
                        <h4>Dokumentasi</h4>
                    </div>   
                    </div>
                </div> 
            </div>

            </section>
        );
    }
    

export default Angka;