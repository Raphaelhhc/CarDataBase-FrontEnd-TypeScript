import { useEffect, useState } from "react";
import CarModel from "../../models/carmodel";
import { SpinnerLoad } from "../utils/spinnerload";
import { StarsReview } from "../utils/starsreview";
import { UserBox } from "./userbox";
import ReviewModel from "../../models/reviewmodel";
import { LatestReviews } from "./latestreviews";
import { useOktaAuth } from "@okta/okta-react";
import ReviewRequestModel from "../../models/reviewrequestmodel";

export const DetailPage = () => {

    const { authState } = useOktaAuth();

    // Car Data State
    const [car, setCar] = useState<CarModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    // Review State
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

    // Is car added to Favorite? State
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoadingIsFavorite, setIsLoadingIsFavorite] = useState(true);

    // Is review left to this car? State
    const [isReviewLeft, setIsReviewLeft] = useState(false);
    const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

    // Car ID
    const carId = (window.location.pathname).split('/')[2];


    // Call Car Data
    useEffect(() => {

        const fetchCar = async () => {

            const baseUrl: string = `${process.env.REACT_APP_API}/cars/${carId}`;
            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            const responseJson = await response.json();
            const loadedCar: CarModel = {
                id: responseJson.id,
                modelname: responseJson.modelname,
                brand: responseJson.brand,
                bodystyle: responseJson.bodystyle,
                region: responseJson.region,
                segment: responseJson.segment,
                powersource: responseJson.powersource,
                keydimensions: responseJson.keydimensions,
                powertrain: responseJson.powertrain,
                driverassistance: responseJson.driverassistance,
                infotainment: responseJson.infotainment,
                img: responseJson.img,
            };

            setCar(loadedCar);
            setIsLoading(false);

        };

        fetchCar().catch((error: any) => {

            setIsLoading(false);
            setHttpError(error.message);

        })

        window.scrollTo(0, 0);

    }, [isFavorite]);


    // Call Reviews of a car
    useEffect(() => {

        const fetchCarReviews = async () => {

            const reviewUrl: string = `${process.env.REACT_APP_API}/reviews/search/findByCarId?carId=${carId}`;
            const responseReviews = await fetch(reviewUrl);

            if (!responseReviews.ok) {
                throw new Error('Something went wrong');
            }

            const responseJsonReviews = await responseReviews.json();
            const responseData = responseJsonReviews._embedded.reviews;
            const loadedReviews: ReviewModel[] = [];
            let weightedStarReviews: number = 0;
            for (const key in responseData) {
                loadedReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    car_id: responseData[key].car_id,
                    reviewDescription: responseData[key].reviewDescription
                });
                weightedStarReviews = weightedStarReviews + responseData[key].rating;
            }

            if (loadedReviews) {

                //Rounded number to nearest point 5.
                const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);

                //Set the rounded number
                setTotalStars(Number(round));

            }

            setReviews(loadedReviews);
            setIsLoadingReview(false);

        };

        fetchCarReviews().catch((error: any) => {

            setIsLoadingReview(false);
            setHttpError(error.message);

        })

    }, [isReviewLeft]);


    // Call the state of the user's review is left or not on the car
    useEffect(() => {

        const fetchUserReviewCar = async () => {

            if (authState && authState.isAuthenticated) {

                const url = `${process.env.REACT_APP_API}/secure/reviews/user/car?carId=${carId}`;

                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };

                const userReview = await fetch(url, requestOptions);

                if (!userReview.ok) {
                    throw new Error('Something went wrong');
                }

                const userReviewResponseJson = await userReview.json();
                setIsReviewLeft(userReviewResponseJson);
            }

            setIsLoadingUserReview(false);

        }

        fetchUserReviewCar().catch((error: any) => {

            setIsLoadingUserReview(false);
            setHttpError(error.message);

        })

    }, [authState]);


    // Call the state of if the car is in favorite list or not
    useEffect(() => {

        const fetchUserCurrentIsFavorite = async () => {

            if (authState && authState.isAuthenticated) {

                const url = `${process.env.REACT_APP_API}/secure/cars/isfavorite/byuser?carId=${carId}`;

                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };

                const currentIsFavoriteResponse = await fetch(url, requestOptions);

                if (!currentIsFavoriteResponse.ok) {
                    throw new Error('Something went wrong');
                }

                const currentIsFavoriteResponseJson = await currentIsFavoriteResponse.json();
                setIsFavorite(currentIsFavoriteResponseJson);
            }

            setIsLoadingIsFavorite(false);

        }

        fetchUserCurrentIsFavorite().catch((error: any) => {

            setIsLoadingIsFavorite(false);
            setHttpError(error.message);

        })

    }, [authState, isFavorite]);


    // Show spinner when loading
    if (
        isLoading ||
        isLoadingReview ||
        isLoadingIsFavorite ||
        isLoadingUserReview
    ) {
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


    // Add the car to my favorite list
    async function addToMyFavorite() {

        const url = `${process.env.REACT_APP_API}/secure/cars/favorite?carId=${car?.id}`;

        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const addToMyFavoriteResponse = await fetch(url, requestOptions);

        if (!addToMyFavoriteResponse.ok) {
            throw new Error('Something went wrong');
        }

        setIsFavorite(true);
    }

    // Remove the car from my favorite list
    async function removeMyFavorite() {

        const url = `${process.env.REACT_APP_API}/secure/cars/removefavorite?carId=${car?.id}`;

        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const removeMyFavoriteResponse = await fetch(url, requestOptions);

        if (!removeMyFavoriteResponse.ok) {
            throw new Error('Something went wrong');
        }

        setIsFavorite(false);
    }

    // Submit a review to the car
    async function submitReview(starInput: number, reviewDescription: string) {
        
        let carId: number = 0;
        if (car?.id) {
            carId = car.id;
        }
        const reviewRequestModel = new ReviewRequestModel(starInput, carId, reviewDescription);

        const url = `${process.env.REACT_APP_API}/secure/reviews`;

        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewRequestModel)
        };

        const returnResponse = await fetch(url, requestOptions);

        if (!returnResponse.ok) {
            throw new Error('Something went wrong');
        }

        setIsReviewLeft(true);

    }


    return (
        <div>

            {/* Desktop */}
            <div className="container d-none d-lg-block">
                <div className="row mt-5">


                    <div className="col-sm-2 col-md-2">

                        <div className='carouselcenter' style={{ height: 300 }}>
                            {car?.img ?
                                <img
                                    src={car?.img}
                                    width="300"
                                    alt="car"
                                />
                                :
                                <img
                                    src={require('./../../Images/CarImages/carsample.jpg')}
                                    width="300"
                                    alt="car"
                                />
                            }
                        </div>

                    </div>


                    <div className="col-5 col-md-5 container">
                        <div className="ml-4">

                            <h2>
                                {car?.modelname}
                            </h2>                           

                            <h5 className="text-primary">
                                {car?.brand}
                            </h5>

                            <StarsReview rating={totalStars} size={28} />

                            <p className="lead">
                                Region: {car?.region}
                            </p>

                            <p className="lead">
                                Bodystyle: {car?.bodystyle}
                            </p>

                            <p className="lead">
                                Segment: {car?.segment}
                            </p>

                            <p className="lead">
                                Powersource: {car?.powersource}
                            </p>

                            <p className="lead">
                                Key Dimensions: {car?.keydimensions}
                            </p>

                            <p className="lead">
                                Powertrain: {car?.powertrain}
                            </p>

                            <p className="lead">
                                Driver Assistance: {car?.driverassistance}
                            </p>

                            <p className="lead">
                                Infotainment: {car?.infotainment}
                            </p>
                        
                        </div>
                    </div>

                    <UserBox
                        car={car}
                        mobile={false}
                        isFavorite={isFavorite}
                        isAuthenticated={authState?.isAuthenticated}
                        addToMyFavorite={addToMyFavorite}
                        removeMyFavorite={removeMyFavorite}
                        isReviewLeft={isReviewLeft}
                        submitReview={submitReview}
                    />

                </div>

                <hr />

                <LatestReviews reviews={reviews} carId={car?.id} mobile={false} />

            </div>

            {/* Mobile */}
            <div className="container d-lg-none mt-5">

                <div className="d-flex justify-content-center align-items-center">

                    {car?.img ?
                        <img
                            src={car?.img}
                            width="340"
                            alt="car"
                        />
                        :
                        <img
                            src={require('./../../Images/CarImages/carsample.jpg')}
                            width="340"
                            alt="car"
                        />
                    }

                </div>

                <div className="mt-4">
                    <div className="ml-2">

                        <h2>
                            {car?.modelname}
                        </h2>                       

                        <h5 className="text-primary">
                            {car?.brand}
                        </h5>

                        <StarsReview rating={totalStars} size={28} />

                        <p className="lead">
                            Bodystyle: {car?.bodystyle}
                        </p>

                        <p className="lead">
                            Region: {car?.region}
                        </p>

                        <p className="lead">
                            Segment: {car?.segment}
                        </p>

                        <p className="lead">
                            Powersource: {car?.powersource}
                        </p>

                        <p className="lead">
                            Key Dimensions: {car?.keydimensions}
                        </p>

                        <p className="lead">
                            Powertrain: {car?.powertrain}
                        </p>

                        <p className="lead">
                            Driver Assistance: {car?.driverassistance}
                        </p>

                        <p className="lead">
                            Infotainment: {car?.infotainment}
                        </p>

                    </div>
                </div>

                <UserBox
                    car={car}
                    mobile={true}
                    isFavorite={isFavorite}
                    isAuthenticated={authState?.isAuthenticated}
                    addToMyFavorite={addToMyFavorite}
                    removeMyFavorite={removeMyFavorite}
                    isReviewLeft={isReviewLeft}
                    submitReview={submitReview}
                />

                <hr />

                <LatestReviews reviews={reviews} carId={car?.id} mobile={true} />

            </div>

        </div>
    );
}