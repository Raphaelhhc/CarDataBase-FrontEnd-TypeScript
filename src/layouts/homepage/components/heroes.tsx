import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

export const Heroes = () => {

    const { authState } = useOktaAuth();

    return (

        <div>

            {/* Desktop */}
            <div className="d-none d-lg-block">

                <div className="row g-0 mt-5">

                    <div className="col-sm-6 col-md-6">
                        <div className="col-image-left"></div>
                    </div>

                    <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
                        <div className="ml-2">

                            <h1>What have you been driving?</h1>

                            <p className="lead">
                                The My Garage team would love to know what you have been driving.
                                Whether it is for enjoyable driving fun or convenient daily use,
                                we will be able to provide the top models information for you!
                            </p>

                            {authState?.isAuthenticated ?
                                <Link type="button" className="btn main-color btn-lg text-white" to="/search">
                                    Explore top cars
                                </Link>
                                :
                                <Link className="btn main-color btn-lg text-white" to="/login">
                                    Log In
                                </Link>
                            }

                        </div>
                    </div>

                </div>

                <div className="row g-0 mb-5">

                    <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">

                        <div className="ml- 2">

                            <h1>Our information is always updating!</h1>

                            <p className="lead">
                                We work nonstop to provide the most useful information
                                for our My Garage users! We are diligent about our car information!
                            </p>

                        </div>

                    </div>

                    <div className="col-sm-6 col-md-6">
                        <div className="col-image-right"></div>
                    </div>

                </div>

            </div>

            {/* Modile */}
            <div className="d-lg-none">

                <div className="m-2">
                    <div className="col-image-left"></div>
                    <div className="mt-2">

                        <h1>What have you been driving?</h1>

                        <p className="lead">
                            The My Garage team would love to know what you have been driving.
                            Whether it is for enjoyable driving fun or convenient daily use,
                            we will be able to provide the top models information for you!
                        </p>

                        {authState?.isAuthenticated ?
                            <Link type="button" className="btn main-color btn-lg text-white" to="/search">
                                Explore top cars
                            </Link>
                            :
                            <Link className="btn main-color btn-lg text-white" to="/login">
                                Log In
                            </Link>
                        }

                    </div>
                </div>

                <div className="m-2">
                    <div className="col-image-right"></div>
                    <div className="mt-2">

                        <h1>Our information is always updating!</h1>

                        <p className="lead">
                            We work nonstop to provide the most useful information
                            for our My Garage users! We are diligent about our car information!
                        </p>

                    </div>
                </div>

            </div>

        </div>

    )
}