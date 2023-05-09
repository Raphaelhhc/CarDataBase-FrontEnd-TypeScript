import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import CarModel from "../../../models/carmodel";
import { SpinnerLoad } from "../../utils/spinnerload";
import { Link } from "react-router-dom";

export const FavoriteCars = () => {

    const { authState } = useOktaAuth();
    const [httpError, setHttpError] = useState(null);

    // Current Favorite Cars
    const [favoriteCars, setFavoriteCars] = useState<CarModel[]>([]);
    const [isLoadingUserCars, setIsLoadingUserCars] = useState(true);

    useEffect(() => {

        const fetchFavoriteCars = async () => {

            if (authState && authState.isAuthenticated) {

                const url = `http://localhost:8080/api/secure/cars/currentfavorite`;

                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };

                const favoriteCarsResponse = await fetch(url, requestOptions);

                if (!favoriteCarsResponse.ok) {
                    throw new Error('Something went wrong!');
                }

                const favoriteCarsResponseJson = await favoriteCarsResponse.json();
                setFavoriteCars(favoriteCarsResponseJson);

            }

            setIsLoadingUserCars(false);

        }

        fetchFavoriteCars().catch((error: any) => {
            setIsLoadingUserCars(false);
            setHttpError(error.message);
        })

        window.scrollTo(0, 0);

    }, [authState]);

    // Show spinner when loading
    if (isLoadingUserCars) {
        return (
            <SpinnerLoad />
        )
    }

    // Show error message
    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div>
            {favoriteCars.length > 0 ?
                <>
                    {favoriteCars.map(favoriteCar => (
                        <div key={favoriteCar.id}>
                            <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
                                <div className="row g-0">

                                    <div className="col-md-4">

                                        {/* Desktop */}
                                        <div className="d-none d-lg-block">
                                            <div className='carouselcenter' style={{ height: 150 }}>
                                                {favoriteCar.img ?
                                                    <img
                                                        src={favoriteCar.img}
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
                                                {favoriteCar.img ?
                                                    <img
                                                        src={favoriteCar.img}
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

                                    <div className="col-md-4">
                                        <div className="card-body">

                                            <h5 className="card-title">
                                                {favoriteCar.brand}
                                            </h5>

                                            <h4>
                                                {favoriteCar.modelname}
                                            </h4>

                                        </div>
                                    </div>

                                    <div className="col-md-4 d-flex justify-content-center align-items-center">

                                        <Link className="btn btn-md main-color text-white" to={`/detail/${favoriteCar.id}`}>
                                            View Detail
                                        </Link>

                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </>
                :
                <>
                    <h3 className='mt-3'>
                        Currently no favorite cars
                    </h3>

                    <Link className="btn btn-outline-secondary btn-lg" to='/search'>
                        View cars
                    </Link>

                </>
            }

        </div>
    );
}