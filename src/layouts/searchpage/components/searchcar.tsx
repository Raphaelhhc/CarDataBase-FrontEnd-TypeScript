import { Link } from "react-router-dom";
import CarModel from "../../../models/carmodel";

export const SearchCar: React.FC<{ car: CarModel }> = (props) => {
    return (
        <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
            <div className="row g-0">

                <div className="col-md-3">

                    {/* Desktop */}
                    <div className="d-none d-lg-block">
                        <div className='carouselcenter' style={{ height: 150 }}>
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
                    </div>

                    {/* Mobile */}
                    <div className="d-lg-none d-flex justify-content-center align-items-center">
                        <div className='carouselcenter' style={{ height: 150 }}>
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
                    </div>

                </div>


                <div className="col-md-6">
                    <div className="card-body">

                        <h5 className="card-title">
                            {props.car.brand}
                        </h5>

                        <h4>
                            {props.car.modelname}
                        </h4>

                        <p className="card-text">
                            {props.car.powersource}
                        </p>

                        <p className="card-text">
                            {props.car.keydimensions}
                        </p>

                        <p className="card-text">
                            {props.car.powertrain}
                        </p>

                    </div>
                </div>


                <div className="col-md-2 d-flex justify-content-center align-items-center">

                    <Link className="btn btn-md main-color text-white" to={`/detail/${props.car.id}`}>
                        View Detail
                    </Link>

                </div>


            </div>
        </div>
    );
}