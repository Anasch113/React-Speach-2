import Cards from '../../components/home/Cards'
import Hero from '../../components/home/Hero'
import Parallex from '../../components/home/Parallex'
import Reporting from '../../components/home/Reporting'
import Value from '../../components/home/Value'
import Footer from '../../components/layout/footer/Footer'

export default function Main() {
    return (
        <div>
            <Hero />
            <Cards />
            <Value />
            <Parallex />
            <Reporting />
            <Footer/>
        </div>
    )
}
