// import { useNavigate } from "react-router-dom";
// import { useContext,useEffect } from "react";

// import { AuthContext } from "../../contexts/AuthContext";

// import * as authService from '../../services/authService';

export const AddLandmark = () => {
    // const { userLogin,isAuth } = useContext(AuthContext);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (isAuth) {
    //         return navigate('/404');
    //     }
    // }, []);

    // const onSubmit = (e) => {
    //     e.preventDefault();

    //     const {email,password,repass} = Object.fromEntries(new FormData(e.target)); 

    //     authService.register(email,password,repass)
    //         .then(result => {
    //             userLogin(result)
    //             navigate('/');
    //         })
    //         .catch(error => alert(error.message))
    // }

    return (
        <section id="add" className="add-section">
            <form >
                <div>
                    <h1>Add a Landmark</h1>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" placeholder="name" />

                    <label htmlFor="town">Town:</label>
                    <input type="text" id="town" name="town" />

                    <label htmlFor="country">Country:</label>
                    <input type="text" id="country" name="country" />

                    <label htmlFor="imageUrl">Image URL:</label>
                    <input type="text" id="imageUrl" name="imageUrl" />

                    <label htmlFor="discoveryYear">Year of discovery:</label>
                    <input type="text" id="discovery-year" name="discoveryYear" />

                    <input type="submit" className="addBtn" value="Add" />
                </div>
            </form>
        </section>
    );
}