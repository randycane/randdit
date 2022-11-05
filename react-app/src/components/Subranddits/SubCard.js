import PostFormComponent from "../Posts/PostForm";

import DeletingModal from "./DeleteSubModal";
import "./Subranddits.css"

function SubrandditCardComponent({ subranddit }) {

    return (
        <div className="sub-card">
            <div className="sub-name">
                <img src = {subranddit.image_url} alt="n/a" onError={(e) => {
                     e.currentTarget.src = "https://res.cloudinary.com/teepublic/image/private/s--n4uagiOn--/c_crop,x_10,y_10/c_fit,h_799/c_crop,g_north_west,h_1051,w_1051,x_-171,y_-121/l_upload:v1507037314:production:blanks:gbajnunp66ec7xftnpq1/fl_layer_apply,g_north_west,x_-276,y_-220/b_rgb:ffffff/c_limit,f_jpg,h_630,q_90,w_630/v1539384919/production/designs/3309274_0.jpg"
                    }} className="sub-logo"/>
                <div className="sub-title">{subranddit.title}</div>
                {/* <div className="sub-deet">{subranddit.description}</div> */}
                {/* <PostFormComponent/> */}

            </div>
        </div>
    )
}

export default SubrandditCardComponent;
