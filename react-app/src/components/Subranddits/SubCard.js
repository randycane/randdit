import "./Subranddits.css"

function SubrandditCardComponent({ subranddit }) {

    return (
        <div className="sub-card">
            <div className="sub-name">
                <img src = {subranddit.image_url} alt="nah" className="sub-logo"/>
                <div className="sub-title">{subranddit.title}</div>
                <div className="sub-deet">{subranddit.description}</div>
            </div>
        </div>
    )
}

export default SubrandditCardComponent;
