import { useEffect, useState } from "react";
import ReviewModel from "../../models/reviewmodel";
import { SpinnerLoad } from "../utils/spinnerload";
import { Review } from "../utils/review";
import { Pagination } from "../utils/pagination";

export const ReviewListPage = () => {
    
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(5);
    const [totalAmountOfReviews, SetTotalAmountOfReviews] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const carId = (window.location.pathname).split('/')[2];

    // Call all reviews of the car
    useEffect(() => {

        const fetchCarReviews = async () => {

            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByCarId?carId=${carId}&page=${currentPage-1}&size=${reviewsPerPage}`;
            const responseReviews = await fetch(reviewUrl);

            if (!responseReviews.ok) {
                throw new Error('Something went wrong');
            }

            const responseJsonReviews = await responseReviews.json();

            const responseData = responseJsonReviews._embedded.reviews;

            SetTotalAmountOfReviews(responseJsonReviews.page.totalElements);
            setTotalPages(responseJsonReviews.page.totalPages);
            
            const loadedReviews: ReviewModel[] = [];
            
            for (const key in responseData) {
                loadedReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    car_id: responseData[key].car_id,
                    reviewDescription: responseData[key].reviewDescription
                });
            }

            setReviews(loadedReviews);
            setIsLoading(false);

        };

        fetchCarReviews().catch((error: any) => {

            setIsLoading(false);
            setHttpError(error.message);

        })

    }, [currentPage]);

    // Show spinner when loading
    if (isLoading) {
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

    // Set pagination
    const indexOfLastReview: number = currentPage * reviewsPerPage;
    
    const indexOfFirstReview: number = indexOfLastReview - reviewsPerPage;

    let lastItem = reviewsPerPage * currentPage <= totalAmountOfReviews? reviewsPerPage * currentPage : totalAmountOfReviews;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Return statement to review list page
    return (

        <div className="container m-5">

            <div>
                <h3>
                    Comments: ({reviews.length})
                </h3>
            </div>

            <p>
                {indexOfFirstReview + 1} to {lastItem} of {totalAmountOfReviews} items;
            </p>

            <div className="row">
                {reviews.map(review => (
                    <Review review={review} key={review.id}/>
                ))}
            </div>

            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}

        </div>

    );
}