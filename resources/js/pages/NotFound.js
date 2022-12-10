import React from 'react'

const NotFound = () => {
    return (
        <main>
            <div className="container">
                <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                    <h1>404</h1>
                    <h2>The page you are looking for doesn't exist.</h2>
                    <a className="btn" href="index.html">Back to home</a>
                    <img src={`${process.env.MIX_APP_URL}/img/not-found.svg`} className="img-fluid py-5" alt="Page Not Found" />
                    <div className="credits">
                        Love by <a href="https://freeetemplates.com/">FreeeTemplates</a>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default NotFound
