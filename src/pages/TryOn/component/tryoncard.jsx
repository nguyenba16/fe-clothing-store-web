
const TryOnCard = ({ item, onClick }) => {
    const { image, title, description, rating, price, badge, discount } = item
    return (
        <div
            className='bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-[450px]'
            onClick={onClick}
        >
            {/* Image container with overlay */}
            <div className='relative w-full h-[250px] overflow-hidden'>
                {/* Product image with zoom effect */}
                <img
                    src={image}
                    alt={title}
                    className='w-full h-full object-cover'
                    onError={(e) => {
                        e.target.onerror = null
                        e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found'
                    }}
                />
            </div>
        </div>
    )
}