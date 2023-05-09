import { Carousel } from "./components/carousel"
import { ExploreCars } from "./components/explorecars"
import { Heroes } from "./components/heroes"

export const HomePage = () => {
    window.scrollTo(0, 0);
    return (
        <>
            <ExploreCars/>
            <Carousel/>
            <Heroes/>
        </>
    )
}