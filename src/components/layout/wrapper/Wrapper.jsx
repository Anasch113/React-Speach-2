/* eslint-disable react/prop-types */

const Wrapper = ({ children }) => {
    return (
        <div className='max-w-screen-2xl mx-auto lg:px-24  md:px-24 px-4'>
            {children}
        </div>
    )
}

export default Wrapper