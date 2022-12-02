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
                            <div className="re-got"> My Github! </div>
                            </a>
                    <a
                        className="linked-in-contained"
                        href="https://www.linkedin.com/in/randy-y-chang/"
                        >
                        <div className="pic-size">
                                <div className="re-got">
                                    My LinkedIn!
                                </div>
                         </div>
                        </a>
                            </div>
                </div>

                    </footer>
    )
}

export default FooterComponent;
