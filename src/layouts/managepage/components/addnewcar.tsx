import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import AddCarRequest from "../../../models/addcarrequest";

export const AddNewCar = () => {

    const { authState } = useOktaAuth();

    // New Car State
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
    const [selectedImage, setSelectedImage] = useState<any>(null);

    // Displays State
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    // Set Bodystyle from dropdown menu
    function bodystyleField(value: string) {
        setBodystyle(value);
    }

    // Base64 conversion for image
    async function base64Image(e: any) {
        if (e.target.files[0]) {
            getBase64(e.target.files[0]);
        }
    }
    function getBase64(file: any) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setSelectedImage(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error', error);
        }
    }

    // Create new car to database
    async function submitNewCar() {

        const url = `${process.env.REACT_APP_API}/secure/admin/add/car`;

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
            const car: AddCarRequest = new AddCarRequest(
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
            car.img = selectedImage;

            const requestOptions = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(car)
            };

            const submitNewCarResponse = await fetch(url, requestOptions);
            if (!submitNewCarResponse.ok) {
                throw new Error('Something went wrong');
            }

            // Setting states to default
            setModelname('');
            setBrand('');
            setBodystyle('Bodystyle');
            setRegion('');
            setSegment('');
            setPowersource('');
            setKeydimensions('');
            setPowertrain('');
            setDriverassistance('');
            setInfotainment('');
            setSelectedImage(null);
            // Set Success Display
            setDisplaySuccess(true);
            setDisplayWarning(false);
        } else {
            // Set Warning Display
            setDisplaySuccess(false);
            setDisplayWarning(true);
        }
    }

    return (
        <div className="container mt-5 mb-5">

            {displaySuccess &&
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    Car updated successfully
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }

            {displayWarning &&
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    All fields must be filled out
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }

            <div className="card">

                <div className="card-header">
                    Add a new car
                </div>

                <div className="card-body">
                    <form method="POST">

                        <div className="row">

                            {/* Model Name */}
                            <div className='col-md-6 mb-3'>

                                <label className='form-label'>
                                    Model Name
                                </label>

                                <input type="text" className='form-control' name='modelname' required
                                    onChange={e => setModelname(e.target.value)} value={modelname} />
                            </div>

                            {/* Brand */}
                            <div className='col-md-3 mb-3'>

                                <label className='form-label'>
                                    Brand
                                </label>

                                <input type="text" className='form-control' name='brand' required
                                    onChange={e => setBrand(e.target.value)} value={brand} />
                            </div>

                            {/* Body Style */}
                            <div className='col-md-3 mb-3'>

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
                            <div className='col-md-6 mb-3'>

                                <label className='form-label'>
                                    Region
                                </label>

                                <input type="text" className='form-control' name='region' required
                                    onChange={e => setRegion(e.target.value)} value={region} />
                            </div>

                            {/* Segment */}
                            <div className='col-md-6 mb-3'>

                                <label className='form-label'>
                                    Segment
                                </label>

                                <input type="text" className='form-control' name='segment' required
                                    onChange={e => setSegment(e.target.value)} value={segment} />
                            </div>

                        </div>

                        {/* Power Source */}
                        <div className='col-md-12 mb-3'>

                            <label className='form-label'>
                                Power Source
                            </label>

                            <textarea className='form-control' id='exampleFormControlTextarea1' rows={2} required
                                onChange={e => setPowersource(e.target.value)} value={powersource}></textarea>
                        </div>

                        {/* Key dimensions */}
                        <div className='col-md-12 mb-3'>

                            <label className='form-label'>
                                Key dimensions
                            </label>

                            <textarea className='form-control' id='exampleFormControlTextarea2' rows={2} required
                                onChange={e => setKeydimensions(e.target.value)} value={keydimensions}></textarea>
                        </div>

                        {/* Power Train */}
                        <div className='col-md-12 mb-3'>

                            <label className='form-label'>
                                Power Train
                            </label>

                            <textarea className='form-control' id='exampleFormControlTextarea3' rows={2} required
                                onChange={e => setPowertrain(e.target.value)} value={powertrain}></textarea>
                        </div>

                        {/* Driver Assistance */}
                        <div className='col-md-12 mb-3'>

                            <label className='form-label'>
                                Driver Assistance
                            </label>

                            <textarea className='form-control' id='exampleFormControlTextarea4' rows={2} required
                                onChange={e => setDriverassistance(e.target.value)} value={driverassistance}></textarea>
                        </div>

                        {/* Infotainment */}
                        <div className='col-md-12 mb-3'>

                            <label className='form-label'>
                                Infotainment
                            </label>

                            <textarea className='form-control' id='exampleFormControlTextarea5' rows={2} required
                                onChange={e => setInfotainment(e.target.value)} value={infotainment}></textarea>
                        </div>

                        {/* Image */}
                        <input type="file" onChange={e => base64Image(e)} />

                        {/* Submit */}
                        <div>
                            <button type='button' className='btn btn-primary mt-3' onClick={submitNewCar}>
                                Add Car
                            </button>
                        </div>

                    </form>
                </div>

            </div>

        </div>
    );

}