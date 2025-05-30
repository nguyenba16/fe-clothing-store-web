import {
  FaTshirt,
  FaHeart,
  FaLeaf,
  FaUsers,
  FaAward,
  FaShoppingBag,
  FaGlobe,
  FaRegDotCircle,
} from 'react-icons/fa'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import store from '../../assets/images/contactUs/store.png'
import logo from '../../assets/images/logo.svg'

const AboutUs = () => {
  const milestones = [
    {
      year: '2020',
      title: 'Khởi đầu',
      description: 'Thành lập thương hiệu với tầm nhìn về thời trang bền vững',
      image:
        'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      year: '2021',
      title: 'Phát triển',
      description: 'Mở rộng bộ sưu tập và xây dựng đội ngũ thiết kế tài năng',
      image:
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      year: '2022',
      title: 'Đổi mới',
      description: 'Ra mắt dòng sản phẩm thân thiện với môi trường',
      image:
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      year: '2024',
      title: 'Vươn xa',
      description: 'Mở rộng thị trường quốc tế và nhận được nhiều giải thưởng',
      image: 'https://cfda.imgix.net/2022/09/BFA_33367_4527137.jpg',
    },
  ]

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section with Parallax Effect */}
      <div className='relative h-[500px] mb-16'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat'
          style={{
            backgroundImage: `url(${store})`,
            filter: 'brightness(0.7)',
          }}
        />
        <div className='absolute inset-0 bg-gradient-to-b from-black/50 to-black/30' />
        <div className='relative z-10 h-full flex flex-col items-center justify-center text-white'>
          <img src={logo} alt='Logo' className='w-64 mb-8 animate-fade-in' />
          <h1 className='text-5xl font-bold mb-4 text-center'>Về Chúng Tôi</h1>
          <p className='text-xl text-center max-w-2xl px-4'>
            Khám phá câu chuyện về thương hiệu thời trang của chúng tôi
          </p>
          <Breadcrumb
            className='text-white text-30 mt-8'
            items={[
              {
                title: (
                  <Link to='/' className='text-white hover:text-gray-200'>
                    Trang chủ
                  </Link>
                ),
              },
              { title: <span className='text-gray-300'>Về chúng tôi</span> },
            ]}
          />
        </div>
      </div>

      {/* Main Content Section */}
      <div className='container mx-auto px-4 py-8'>
        {/* Brand Story Section */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold mb-6'>Câu Chuyện Thương Hiệu</h2>
          <div className='max-w-4xl mx-auto text-gray-600 space-y-4 mb-12'>
            <p>
              Được thành lập vào năm 2020, chúng tôi đã phát triển từ một cửa hàng nhỏ thành một
              thương hiệu thời trang được yêu thích. Với tầm nhìn về một thế giới thời trang bền
              vững và đẳng cấp, chúng tôi luôn nỗ lực mang đến những sản phẩm chất lượng cao nhất
              cho khách hàng.
            </p>
            <p>
              Chúng tôi tin rằng thời trang không chỉ là về vẻ đẹp bên ngoài, mà còn là cách thể
              hiện cá tính và phong cách sống của mỗi người. Mỗi sản phẩm của chúng tôi đều được
              thiết kế với sự chú trọng đến từng chi tiết nhỏ nhất.
            </p>
          </div>

          {/* Timeline Section */}
          <div className='relative max-w-5xl mx-auto'>
            {/* Timeline Line */}
            <div className='absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#C49852]'></div>

            {/* Timeline Items */}
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`relative mb-16 flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div
                  className={`w-1/2 ${
                    milestone.year === '2020' || milestone.year === '2022'
                      ? 'pr-12 text-right'
                      : 'pl-12 text-left'
                  }`}
                >
                  <div className='bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300'>
                    <h3 className='text-2xl font-bold text-[#C49852] mb-2'>{milestone.year}</h3>
                    <h4 className='text-xl font-semibold mb-2'>{milestone.title}</h4>
                    <p className='text-gray-600'>{milestone.description}</p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className='absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  <div className='w-8 h-8 bg-[#C49852] rounded-full flex items-center justify-center'>
                    <FaRegDotCircle className='text-white text-xl' />
                  </div>
                </div>

                {/* Image */}
                <div
                  className={`w-1/2 ${
                    milestone.year === '2020' || milestone.year === '2022' ? 'pl-12' : 'pr-12'
                  }`}
                >
                  <div className='relative overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300'>
                    <img
                      src={milestone.image}
                      alt={milestone.title}
                      className='w-full h-64 object-cover'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className='grid md:grid-cols-3 gap-8 mb-16'>
          <div className='bg-gray-50 p-8 rounded-lg transform hover:scale-105 transition-transform duration-300'>
            <FaTshirt className='text-4xl text-[#C49852] mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-center mb-4'>Thiết Kế Độc Đáo</h3>
            <p className='text-gray-600 text-center'>
              Mỗi sản phẩm đều được thiết kế độc đáo, kết hợp giữa xu hướng hiện đại và phong cách
              cổ điển.
            </p>
          </div>

          <div className='bg-gray-50 p-8 rounded-lg transform hover:scale-105 transition-transform duration-300'>
            <FaLeaf className='text-4xl text-[#C49852] mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-center mb-4'>Bền Vững</h3>
            <p className='text-gray-600 text-center'>
              Cam kết sử dụng vật liệu thân thiện với môi trường và quy trình sản xuất bền vững.
            </p>
          </div>

          <div className='bg-gray-50 p-8 rounded-lg transform hover:scale-105 transition-transform duration-300'>
            <FaHeart className='text-4xl text-[#C49852] mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-center mb-4'>Chất Lượng Cao</h3>
            <p className='text-gray-600 text-center'>
              Sử dụng chất liệu cao cấp và quy trình kiểm soát chất lượng nghiêm ngặt.
            </p>
          </div>
        </div>

        {/* Fashion Tips Section */}
        <div className='bg-gray-50 p-12 rounded-lg mb-16'>
          <h2 className='text-3xl font-bold text-center mb-8'>Bí Quyết Thời Trang</h2>
          <div className='grid md:grid-cols-2 gap-8'>
            <div className='space-y-4'>
              <h3 className='text-xl font-semibold mb-4'>Phong Cách Cá Nhân</h3>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li>Khám phá và phát triển phong cách riêng của bạn</li>
                <li>Kết hợp các món đồ một cách sáng tạo</li>
                <li>Tập trung vào sự thoải mái và tự tin</li>
                <li>Đầu tư vào những món đồ cơ bản chất lượng cao</li>
              </ul>
            </div>
            <div className='space-y-4'>
              <h3 className='text-xl font-semibold mb-4'>Xu Hướng Mới</h3>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li>Cập nhật những xu hướng thời trang mới nhất</li>
                <li>Phối hợp màu sắc theo mùa</li>
                <li>Lựa chọn phụ kiện phù hợp</li>
                <li>Chăm sóc và bảo quản trang phục đúng cách</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className='grid md:grid-cols-4 gap-8 py-12 border-t'>
          <div className='text-center transform hover:scale-110 transition-transform duration-300'>
            <FaUsers className='text-4xl text-[#C49852] mx-auto mb-4' />
            <h3 className='font-semibold mb-2'>10,000+</h3>
            <p className='text-gray-600 text-sm'>Khách hàng hài lòng</p>
          </div>

          <div className='text-center transform hover:scale-110 transition-transform duration-300'>
            <FaAward className='text-4xl text-[#C49852] mx-auto mb-4' />
            <h3 className='font-semibold mb-2'>15+</h3>
            <p className='text-gray-600 text-sm'>Giải thưởng thời trang</p>
          </div>

          <div className='text-center transform hover:scale-110 transition-transform duration-300'>
            <FaShoppingBag className='text-4xl text-[#C49852] mx-auto mb-4' />
            <h3 className='font-semibold mb-2'>500+</h3>
            <p className='text-gray-600 text-sm'>Sản phẩm độc đáo</p>
          </div>

          <div className='text-center transform hover:scale-110 transition-transform duration-300'>
            <FaGlobe className='text-4xl text-[#C49852] mx-auto mb-4' />
            <h3 className='font-semibold mb-2'>5+</h3>
            <p className='text-gray-600 text-sm'>Quốc gia phục vụ</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
