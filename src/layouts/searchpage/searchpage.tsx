import { useEffect, useState } from "react";
import CarModel from "../../models/carmodel";
import { SpinnerLoad } from "../utils/spinnerload";
import { SearchCar } from "./components/searchcar";
import { Pagination } from "../utils/pagination";

export const SearchPage = () => {

    const [cars, setCars] = useState<CarModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [carsPerPage] = useState(5);
    const [totalAmountOfCars, setTotalAmountOfCars] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [bodystyleSelection, setBodystyleSelection] = useState('');

    useEffect(() => {
        const fetchCars = async () => {

            const baseUrl: string = `${process.env.REACT_APP_API}/cars`;
            let url: string = '';
            if (searchUrl === '') {
                url = `${baseUrl}?page=${currentPage - 1}&size=${carsPerPage}`;
            } else {
                let searchWithPage = searchUrl.replace('<pageNumber>', `${currentPage - 1}`);
                url = baseUrl + searchWithPage;
            }

            const response = await fetch(url);

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
        window.scrollTo(0, 0);
    }, [currentPage, searchUrl]);

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

    const searchHandleChange = () => {
        setCurrentPage(1);
        if (search === '') {
            setSearchUrl('');
        } else {
            setSearchUrl(`/search/findByModelnameContaining?modelname=${search}&page=<pageNumber>&size=${carsPerPage}`);
        }
        setBodystyleSelection('');
    }

    const bodystyleField = (value: string) => {
        setCurrentPage(1);
        if (
            value.toLowerCase() === 'hatchback' ||
            value.toLowerCase() === 'sed' ||
            value.toLowerCase() === 'suv' ||
            value.toLowerCase() === 'sportscar' ||
            value.toLowerCase() === 'pickup'
        ) {
            setSearchUrl(`/search/findByBodystyle?bodystyle=${value}&page=<pageNumber>&size=${carsPerPage}`);
            switch(value) {
                case 'hatchback':
                    setBodystyleSelection(': Hatchback');
                    break;
                case 'sed':
                    setBodystyleSelection(': Sedan');
                    break;
                case 'suv':
                    setBodystyleSelection(': SUV');
                    break;
                case 'sportscar':
                    setBodystyleSelection(': Sports Car');
                    break;
                case 'pickup':
                    setBodystyleSelection(': Pick-Up');
                    break;
            }   
        } else {
            setSearchUrl(`?page=<pageNumber>&size=${carsPerPage}`);
            setBodystyleSelection('');
        }
    }

    const indexOfLastCar: number = currentPage * carsPerPage;
    const indexOfFirstCar: number = indexOfLastCar - carsPerPage;
    let lastItem = carsPerPage * currentPage <= totalAmountOfCars ? carsPerPage * currentPage : totalAmountOfCars;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className="container">
                <div>


                    <div className="row mt-5">

                        <div className="col-6">
                            <div className="d-flex">

                                <input className="form-control me-2" type="search" placeholder="Search" aria-labelledby="Search"
                                    onChange={e => setSearch(e.target.value)} />

                                <button className="btn btn-outline-success"
                                    onClick={() => searchHandleChange()}>
                                    Search
                                </button>

                            </div>
                        </div>

                        <div className="col-4">
                            <div className="dropdown">

                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    Body Style {bodystyleSelection}
                                </button>

                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">

                                    <li onClick={() => bodystyleField('All')}>
                                        <a className="dropdown-item" href="#">
                                            All
                                        </a>
                                    </li>

                                    <li onClick={() => bodystyleField('hatchback')}>
                                        <a className="dropdown-item" href="#">
                                            Hatchback
                                        </a>
                                    </li>

                                    <li onClick={() => bodystyleField('sed')}>
                                        <a className="dropdown-item" href="#">
                                            Sedan
                                        </a>
                                    </li>

                                    <li onClick={() => bodystyleField('suv')}>
                                        <a className="dropdown-item" href="#">
                                            SUV
                                        </a>
                                    </li>

                                    <li onClick={() => bodystyleField('sportscar')}>
                                        <a className="dropdown-item" href="#">
                                            Sports Car
                                        </a>
                                    </li>

                                    <li onClick={() => bodystyleField('pickup')}>
                                        <a className="dropdown-item" href="#">
                                            Pick-up
                                        </a>
                                    </li>

                                </ul>

                            </div>
                        </div>

                    </div>

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
                                    <SearchCar car={car} key={car.id} />
                                ))}
                            </>
                            :
                            <div className="m-5">
                                <h3>
                                    No Search Result
                                </h3>
                            </div>
                    }

                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                    }

                </div>
            </div>
        </div>
    );

}