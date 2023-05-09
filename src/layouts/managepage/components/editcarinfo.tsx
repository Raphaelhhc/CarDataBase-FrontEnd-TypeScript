import { useEffect, useState } from "react";
import CarModel from "../../../models/carmodel";
import { useOktaAuth } from "@okta/okta-react";
import EditCarRequest from "../../../models/editcarrequest";

export const EditCarInfo: React.FC<{ car: CarModel, deleteCar: any }> = (props, key) => {

    const { authState } = useOktaAuth();

    // Car State
    const [modelname, setModelname] = useState('');
    const [brand, setBrand] = useState('');
    const [bodystyle, setBodystyle] = useState('Bodystyle');
    const [region, setRegion] = useState('');
    const [segment, setSegment] = useState('');
    const [powersource, setPowersource] = useState('');
    const [keydimensions, setKeydimensions] = useState('');
    const [powertrain, setPowertrain] = useState('');
    const [driverassistance, setDriverassistance] = useState('');
    const [infotainment, setInfotainment] = useState('');

    // Displays State
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    // Set Bodystyle from dropdown menu
    function bodystyleField(value: string) {
        setBodystyle(value);
    }

    useEffect(() => {
        const fetchCarInState = () => {
            props.car.modelname ? setModelname(props.car.modelname) : setModelname('');
            props.car.brand ? setBrand(props.car.brand) : setBrand('');
            props.car.bodystyle ? setBodystyle(props.car.bodystyle) : setBodystyle('Bodystyle');
            props.car.region ? setRegion(props.car.region) : setRegion('');
            props.car.segment ? setSegment(props.car.segment) : setSegment('');
            props.car.powersource ? setPowersource(props.car.powersource) : setPowersource('');
            props.car.keydimensions ? setKeydimensions(props.car.keydimensions) : setKeydimensions('');
            props.car.powertrain ? setPowertrain(props.car.powertrain) : setPowertrain('');
            props.car.driverassistance ? setDriverassistance(props.car.driverassistance) : setDriverassistance('');
            props.car.infotainment ? setInfotainment(props.car.infotainment) : setInfotainment('');
        };
        fetchCarInState();
    }, []);

    // Update car info to database
    async function submitEditCar() {

        const url = `http://localhost:8080/api/secure/admin/update/car?carId=${props.car?.id}`;

        if (
            authState?.isAuthenticated &&
            modelname !== '' &&
            brand !== '' &&
            bodystyle !== 'Bodystyle' &&
            region !== '' &&
            segment !== '' &&
            powersource !== '' &&
            keydimensions !== '' &&
            powertrain !== '' &&
            driverassistance !== '' &&
            infotainment !== ''
        ) {
            const car: EditCarRequest = new EditCarRequest(
                modelname,
                brand,
                bodystyle,
                region,
                segment,
                powersource,
                keydimensions,
                powertrain,
                driverassistance,
                infotainment
            );

            const requestOptions = {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(car)
            };

            const submitEditCarResponse = await fetch(url, requestOptions);
            if (!submitEditCarResponse.ok) {
                throw new Error('Something went wrong');
            }

            // Setting latest states
            setModelname(car.modelname);
            setBrand(car.brand);
            setBodystyle(car.bodystyle);
            setRegion(car.region);
            setSegment(car.segment);
            setPowersource(car.powersource);
            setKeydimensions(car.keydimensions);
            setPowertrain(car.powertrain);
            setDriverassistance(car.driverassistance);
            setInfotainment(car.infotainment);
            // Set Success Display
            setDisplaySuccess(true);
            setDisplayWarning(false);
        } else {
            // Set Warning Display
            setDisplaySuccess(false);
            setDisplayWarning(true);
        }

    }

    // Delete car from database
    async function deleteCar() {

        const url = `http://localhost:8080/api/secure/admin/delete/car?carId=${props.car?.id}`;
        
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const deleteResponse = await fetch(url, requestOptions);
        if (!deleteResponse.ok) {
            throw new Error('Something went wrong!');
        }

        props.deleteCar();

    }


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

                        {/* Delete Button */}
                        <div className="mt-3">
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-danger" onClick={deleteCar}>
                                    Delete this car
                                </button>
                            </div>
                        </div>

                    </div>


                    <div className="col-md-9">
                        <div className="card-body">

                            <form method="PUT">

                                <div className="row">

                                    {/* Model Name */}
                                    <div className='col-md-4 mb-1'>

                                        <label className='form-label'>
                                            Model Name
                                        </label>

                                        <input type="text" className='form-control' name='modelname' required
                                            onChange={e => setModelname(e.target.value)} value={modelname} />
                                    </div>

                                    {/* Brand */}
                                    <div className='col-md-4 mb-1'>

                                        <label className='form-label'>
                                            Brand
                                        </label>

                                        <input type="text" className='form-control' name='brand' required
                                            onChange={e => setBrand(e.target.value)} value={brand} />
                                    </div>

                                    {/* Body Style */}
                                    <div className='col-md-4 mb-1'>

                                        <label className='form-label'>
                                            Body Style
                                        </label>

                                        <button className='form-control btn btn-secondary dropdown-toggle' type='button'
                                            id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                                            {bodystyle}
                                        </button>

                                        <ul id='addNewCarId' className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                            <li>
                                                <a onClick={() => bodystyleField('Hatchback')} className='dropdown-item'>
                                                    Hatchback
                                                </a>
                                            </li>
                                            <li>
                                                <a onClick={() => bodystyleField('SED')} className='dropdown-item'>
                                                    Sedan
                                                </a>
                                            </li>
                                            <li>
                                                <a onClick={() => bodystyleField('SUV')} className='dropdown-item'>
                                                    SUV
                                                </a>
                                            </li>
                                            <li>
                                                <a onClick={() => bodystyleField('SportsCar')} className='dropdown-item'>
                                                    Sports Car
                                                </a>
                                            </li>
                                            <li>
                                                <a onClick={() => bodystyleField('PickUp')} className='dropdown-item'>
                                                    Pick-Up
                                                </a>
                                            </li>
                                        </ul>

                                    </div>

                                </div>

                                <div className="row">

                                    {/* Region */}
                                    <div className='col-md-6 mb-1'>

                                        <label className='form-label'>
                                            Region
                                        </label>

                                        <input type="text" className='form-control' name='region' required
                                            onChange={e => setRegion(e.target.value)} value={region} />
                                    </div>

                                    {/* Segment */}
                                    <div className='col-md-6 mb-1'>

                                        <label className='form-label'>
                                            Segment
                                        </label>

                                        <input type="text" className='form-control' name='segment' required
                                            onChange={e => setSegment(e.target.value)} value={segment} />
                                    </div>

                                </div>

                                {/* Power Source */}
                                <div className='col-md-12 mb-1'>

                                    <label className='form-label'>
                                        Power Source
                                    </label>

                                    <textarea className='form-control' id='exampleFormControlTextarea1' rows={2} required
                                        onChange={e => setPowersource(e.target.value)} value={powersource}></textarea>
                                </div>

                                {/* Key dimensions */}
                                <div className='col-md-12 mb-1'>

                                    <label className='form-label'>
                                        Key dimensions
                                    </label>

                                    <textarea className='form-control' id='exampleFormControlTextarea2' rows={2} required
                                        onChange={e => setKeydimensions(e.target.value)} value={keydimensions}></textarea>
                                </div>

                                {/* Power Train */}
                                <div className='col-md-12 mb-1'>

                                    <label className='form-label'>
                                        Power Train
                                    </label>

                                    <textarea className='form-control' id='exampleFormControlTextarea3' rows={2} required
                                        onChange={e => setPowertrain(e.target.value)} value={powertrain}></textarea>
                                </div>

                                {/* Driver Assistance */}
                                <div className='col-md-12 mb-1'>

                                    <label className='form-label'>
                                        Driver Assistance
                                    </label>

                                    <textarea className='form-control' id='exampleFormControlTextarea4' rows={2} required
                                        onChange={e => setDriverassistance(e.target.value)} value={driverassistance}></textarea>
                                </div>

                                {/* Infotainment */}
                                <div className='col-md-12 mb-1'>

                                    <label className='form-label'>
                                        Infotainment
                                    </label>

                                    <textarea className='form-control' id='exampleFormControlTextarea5' rows={2} required
                                        onChange={e => setInfotainment(e.target.value)} value={infotainment}></textarea>
                                </div>

                                {/* Submit */}
                                <div>
                                    <button type='button' className='btn btn-primary mt-3' onClick={submitEditCar}>
                                        Update Car Info
                                    </button>
                                </div>

                                {/* Submit State Alarm */}
                                {displaySuccess &&
                                    <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
                                        Car updated successfully
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>

                                }
                                {displayWarning &&
                                    <div className="alert alert-danger alert-dismissible fade show mt-3" role="alert">
                                        All fields must be filled out
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                }

                            </form>

                        </div>
                    </div>


                </div>
            </div>

    );

}