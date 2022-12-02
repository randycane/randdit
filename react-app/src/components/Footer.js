import "./Footer.css";

function FooterComponent() {
    return (
        <footer className="whole-foot">
            <div className="feet">
                <div className="re-got">
                    Get to know me!
                </div>
                <div className="about-me">
                    <a
                        className="git-me-contained"
                        href="https://github.com/randycane"
                        >
                        <div className="re-got"> My Github:
                        <i class="fa-brands fa-github"></i>
                        </div>
                            </a>
                    <a
                        className="linked-in-contained"
                        href="https://www.linkedin.com/in/randy-y-chang/"
                        >
                        <div className="size">
                                <div className="re-got">
                                My LinkedIn:
                                <i class="fab fa-linkedin-in"></i>
                                </div>
                         </div>
                        </a>
                            </div>
                </div>

                    </footer>
    )
}

export default FooterComponent;
