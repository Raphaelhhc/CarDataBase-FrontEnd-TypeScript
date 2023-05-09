import { Link } from "react-router-dom";
import CarModel from "../../models/carmodel";
import { LeaveReview } from "../utils/leavereview";

export const UserBox: React.FC<{

    car: CarModel | undefined,
    mobile: boolean,
    isFavorite: boolean,
    isAuthenticated: any,
    addToMyFavorite: any,
    removeMyFavorite: any,
    isReviewLeft: boolean,
    submitReview: any

}> = (props) => {

    // Render for display of the state of being added to favorite list 
    function buttonRender() {

        if (props.isAuthenticated) {

            if (!props.isFavorite) {
                return (
                    <button onClick={() => props.addToMyFavorite()} className="btn btn-success btn-lg">
                        Add to My Favorite
                    </button>
                );
            } else if (props.isFavorite) {
                return (
                    <div>
                        <h4>In My Favorite</h4>

                        <Link className="btn btn-success m-1" to="/myfavorite">
                            Go To My Favorite
                        </Link>

                        <button onClick={() => props.removeMyFavorite()} className="btn btn-danger m-1">
                            Delete From My Favorite
                        </button>

                    </div>
                );
            }

        }

        return (
            <Link to={"/login"} className="btn btn-success btn-lg" >
                Log In
            </Link>
        );

    }

    // Render for display of the state of being left review on
    function reviewRender() {

        if (props.isAuthenticated && !props.isReviewLeft) {
            return (
                <p>
                    <LeaveReview submitReview={props.submitReview} />
                </p>
            );
        } else if (props.isAuthenticated && props.isReviewLeft) {
            return (
                <p>
                    Thank you for your review!
                </p>
            );
        }
        return (
            <div>
                <p>
                    Log in to be able to leave a review and to add to favorite list.
                </p>
            </div>
        );

    }

    return (
        <div className={props.mobile ? "card d-flex mt-5" : "card col-3 container d-flex mb-5"}>
            <div className="card-body container">

                {buttonRender()}
                <hr />
                {reviewRender()}

            </div>
        </div>
    );

}