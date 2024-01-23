export default function Header(){
    return (
        <div> 
                 <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container">
                    <a  href={"/"} className="navbar-brand">Task Management System</a>
                    
                    <a href={"/login"} className="btn btn-light" type="submit">Login</a>
                    
                </div>
                </nav>
        </div>
    )
}