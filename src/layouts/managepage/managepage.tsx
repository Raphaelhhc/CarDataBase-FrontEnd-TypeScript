import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { AddNewCar } from "./components/addnewcar";
import { EditCars } from "./components/editcars";

export const ManagePage = () => {

    const { authState } = useOktaAuth();

    const [editCarClick, setEditCarClick] = useState(false);

    function addCarClickFunction() {
        setEditCarClick(false);
    }
    function editCarClickFunction() {
        setEditCarClick(true);
    }

    // Redirect for non-admins
    if (authState?.accessToken?.claims.userType === undefined) {
        return <Redirect to="/home" />
    }

    return (

        <div className="container">
            <div className="mt-5">

                <h3>Manage Garage</h3>

                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">

                        <button onClick={addCarClickFunction} className="nav-link active" id="nav-add-car-tab" data-bs-toggle="tab"
                            data-bs-target="#nav-add-car" type="button" role="tab" aria-controls="nav-add-book" aria-selected="false">
                            Add new car
                        </button>

                        <button onClick={editCarClickFunction} className="nav-link" id="nav-edit-car-tab" data-bs-toggle="tab"
                            data-bs-target="#nav-edit-car" type="button" role="tab" aria-controls="nav-edit-book" aria-selected="false">
                            Edit car infomation
                        </button>

                    </div>
                </nav>

                <div className="tab-content" id="nav-tabContent">

                    <div className="tab-pane fade show active" id="nav-add-car" role="tabpanel" aria-labelledby="nav-add-car-tab">
                        <AddNewCar />
                    </div>

                    <div className="tab-pane fade" id="nav-edit-car" role="tabpanel" aria-labelledby="nav-edit-car-tab">
                        {editCarClick ?
                            <EditCars />
                            :
                            <></>
                        }
                    </div>

                </div>

            </div>
        </div>

    );
}