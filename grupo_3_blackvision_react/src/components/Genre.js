import React from 'react'
function Genre({genero,valores}) {
    
;
    return (
        
        <div className="col-lg-6 mb-4">
            <div className="card bg-dark text-white shadow">
                <div className="card-body">
                    {genero} : {valores}
                </div>
            </div>
        </div>
    )




}


export default Genre