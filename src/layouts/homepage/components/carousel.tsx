import { ReturnCar } from "./returncar";
import { useEffect, useState } from "react";
import CarModel from "../../../models/carmodel";
import { SpinnerLoad } from "../../utils/spinnerload";
import { Link } from "react-router-dom";

export const Carousel = () => {

    const [cars, setCars] = useState<CarModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {

            const baseUrl: string = "http://localhost:8080/api/cars";
            const url: string = `${baseUrl}?page=0&size=9`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.cars;
            const loadedCars: CarModel[] = [];

            for (const key in responseData) {
                loadedCars.push({
                    id: responseData[key].id,
                    modelname: responseData[key].modelname,
                    brand: responseData[key].brand,
                    bodystyle: responseData[key].bodystyle,
                    region: responseData[key].region,
                    segment: responseData[key].segment,
                    powersource: responseData[key].powersource,
                    keydimensions: responseData[key].keydimensions,
                    powertrain: responseData[key].powertrain,
                    driverassistance: responseData[key].driverassistance,
                    infotainment: responseData[key].infotainment,
                    img: responseData[key].img,
                });
            }

            setCars(loadedCars);
            setIsLoading(false);

        };
        fetchCars().catch((error: any) => {

            setIsLoading(false);
            setHttpError(error.message);

        })
    }, []);

    if (isLoading) {
        return (
            <SpinnerLoad/>
        )
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    return (

        <div className="container mt-5">

            <div className="homepage-carousel-title">
                <h3>Find your next "It's my best buddy" Car</h3>
            </div>

            <div id="carouselExampleControls"
                className="carousel carousel-dark slide mt-5 d-none d-lg-block" data-bs-interval="false">

                {/* Desktop */}
                <div className="carousel-inner">

                    <div className="carousel-item active">
                        <div className="row d-flex justify-content-center align-items-center">
                            {cars.slice(0, 3).map(car => (
                                <ReturnCar car={car} key={car.id} />
                            ))}
                        </div>
                    </div>

                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            {cars.slice(3, 6).map(car => (
                                <ReturnCar car={car} key={car.id} />
                            ))}
                        </div>
                    </div>

                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            {cars.slice(6, 9).map(car => (
                                <ReturnCar car={car} key={car.id} />
                            ))}
                        </div>
                    </div>

                </div>

                <button className="carousel-control-prev" type="button"
                    data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>

                <button className="carousel-control-next" type="button"
                    data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>

            </div>

            {/* Modile */}
            <div className="d-lg-none mt-3">
                <div className="row d-flex justify-content-center align-items-center">
                    <ReturnCar car={cars[7]} key={cars[7].id} />
                </div>
            </div>

            <div className="homepage-carousel-title mt-3">
                <Link className="btn btn-outline-secondary btn-lg" to='/search'>
                    View More
                </Link>
            </div>

        </div>


    );
}