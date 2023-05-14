import { useEffect, useState } from "react";
import CarModel from "../../../models/carmodel";
import { SpinnerLoad } from "../../utils/spinnerload";
import { Pagination } from "../../utils/pagination";
import { EditCarInfo } from "./editcarinfo";

export const EditCars = () => {

    const [cars, setCars] = useState<CarModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [carsPerPage] = useState(5);
    const [totalAmountOfCars, setTotalAmountOfCars] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [carDelete, setCarDelete] = useState(false);

    useEffect(() => {
        const fetchCars = async () => {

            const baseUrl: string = `${process.env.REACT_APP_API}/cars?page=${currentPage - 1}&size=${carsPerPage}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.cars;

            setTotalAmountOfCars(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

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
    }, [currentPage, carDelete]);

    if (isLoading) {
        return (
            <SpinnerLoad />
        )
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    const indexOfLastCar: number = currentPage * carsPerPage;
    const indexOfFirstCar: number = indexOfLastCar - carsPerPage;
    let lastItem = carsPerPage * currentPage <= totalAmountOfCars ? carsPerPage * currentPage : totalAmountOfCars;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const deleteCar = () => setCarDelete(!carDelete);

    return (
        <div className="container mt-5">
            {
                totalAmountOfCars > 0 ?
                    <>
                        <div className="mt-3">
                            <h5>Number of results: ({totalAmountOfCars})</h5>
                        </div>


                        <p>
                            {indexOfFirstCar + 1} to {lastItem} of {totalAmountOfCars} items:
                        </p>


                        {cars.map(car => (
                            <EditCarInfo car={car} key={car.id} deleteCar={deleteCar}/>
                        ))}
                    </>
                    :
                    <div className="m-5">
                        <h3>
                            Add a car before editting
                        </h3>
                    </div>
            }

            {totalPages > 1 &&
                <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
            }
        </div>
    );

}