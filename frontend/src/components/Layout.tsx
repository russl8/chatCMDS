import Navbar from "./Navbar";

interface LayoutProps {
    children:React.ReactNode | any;
}

const Layout = ({children}:LayoutProps) => {
    return (  
        <div className="h-full bg-background">
            <Navbar/>
            {children}
        </div>
    );
}
 
export default Layout;