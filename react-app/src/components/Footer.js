import "./Footer.css"



function FooterComponent() {
    return (
        <footer className="whole-foot">
            <div className="feet">
                <div className="my-feet">
                    Get to know me!
                </div>
                <div className="about-me">
                    <a
                        className="git-me-contained"
                        href="https://github.com/randycane"
                        >
                        <div className="pic-size">
                            </div>
                            <span> My Github! </span>
                            </a>
                            </div>
                    <a className="linked-in-contained"
                        href="https://www.linkedin.com/in/randy-y-chang/">

                        <div className="pic-size">
                                <span>
                                    My LinkedIn!
                                </span>
                         </div>
                        </a>
                </div>

                    </footer>
    )
}

export default FooterComponent;
