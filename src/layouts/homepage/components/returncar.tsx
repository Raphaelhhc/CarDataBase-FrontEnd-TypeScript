import React from 'react'
import CarModel from '../../../models/carmodel'
import { Link } from 'react-router-dom'

export const ReturnCar: React.FC<{car: CarModel}> = (props) => {
    return (
        <div className="col-xs-6 col-sm-6 col-med-4 col-lg-3 mb-3">
            <div className="text-center">

                <div className='carouselcenter' style={{height: 150}}>
                    {props.car.img ?
                    <img
                        src={props.car.img}
                        width="170"
                        alt="car"
                    />
                    :
                    <img
                        src={require('./../../../Images/CarImages/carsample.jpg')}
                        width="170"
                        alt="car"
                    />
                    }
                </div>

                <h6 className="mt-2">
                    {props.car.modelname}
                </h6>

                <p>
                    {props.car.brand}
                </p>

                <Link className="btn main-color text-white" to={`/detail/${props.car.id}`}>
                    View Detail
                </Link>

            </div>
        </div>
    )
}