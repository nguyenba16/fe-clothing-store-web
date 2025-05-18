import * as React from 'react'

export default function OrderInstructions() {
  return (
    <div className='py-20 flex justify-center items-center'>
      <div>
        <div className='text-[60px] font-bold text-primary uppercase text-center'>
          HƯỚNG DẪN ĐẶT HÀNG
        </div>
        <div className='max-w-[1150px] mt-10'>
          <div className='text-[20px] pl-5 font-light'>
            Chào mừng bạn đến với Elegante! Chúng tôi luôn mong muốn mang lại trải nghiệm mua sắm
            thời trang nữ trực tuyến dễ dàng và nhanh chóng. Dưới đây là các bước giúp bạn đặt hàng
            thành công:
          </div>
          <div>
            <ol className='list-decimal pl-5'>
              <li className='mt-5 text-[20px] font-bold'>
                Đăng nhập hoặc Đăng ký tài khoản
                <ul className='list-disc pl-5 font-light'>
                  <li>Truy cập website hoặc ứng dụng của Elegante.</li>
                  <li>
                    Chọn Đăng nhập nếu bạn đã có tài khoản, hoặc Đăng ký nếu là khách hàng mới.
                  </li>
                  <li>
                    Nhập đầy đủ thông tin như họ tên, số điện thoại và email để hoàn tất đăng ký.
                  </li>
                </ul>
              </li>

              <li className='mt-5 text-[20px] font-bold'>
                Duyệt và chọn sản phẩm
                <ul className='list-disc pl-5 font-light'>
                  <li>Khám phá bộ sưu tập váy, áo, quần và phụ kiện thời trang mới nhất.</li>
                  <li>Sử dụng bộ lọc để tìm theo size, màu sắc, kiểu dáng hoặc mức giá phù hợp.</li>
                </ul>
              </li>

              <li className='mt-5 text-[20px] font-bold'>
                Thêm vào giỏ hàng
                <ul className='list-disc pl-5 font-light'>
                  <li>Nhấn "Thêm vào giỏ hàng" khi đã chọn sản phẩm và size mong muốn.</li>
                  <li>Kiểm tra lại danh sách sản phẩm trong giỏ hàng trước khi thanh toán.</li>
                </ul>
              </li>

              <li className='mt-5 text-[20px] font-bold'>
                Thanh toán và xác nhận đơn hàng
                <ul className='list-disc pl-5 font-light'>
                  <li>
                    Chọn phương thức thanh toán: tiền mặt khi nhận hàng hoặc chuyển khoản/thẻ.
                  </li>
                  <li>Điền địa chỉ giao hàng và xác nhận thông tin đơn hàng.</li>
                </ul>
              </li>

              <li className='mt-5 text-[20px] font-bold'>
                Theo dõi đơn hàng
                <ul className='list-disc pl-5 font-light'>
                  <li>Bạn có thể kiểm tra trạng thái đơn hàng trong mục "Lịch sử đơn hàng".</li>
                </ul>
              </li>

              <li className='mt-5 text-[20px] font-bold'>
                Nhận hàng và trải nghiệm sản phẩm
                <ul className='list-disc pl-5 font-light'>
                  <li>
                    Khi đơn hàng được giao đến, vui lòng kiểm tra sản phẩm trước khi thanh toán.
                  </li>
                  <li>Tận hưởng sự thoải mái và phong cách cùng sản phẩm từ Elegante!</li>
                </ul>
              </li>
            </ol>
            <div className='mt-10 text-[25px] font-bold text-center'>
              <strong className='text-primary'>Elegante</strong> hy vọng hướng dẫn này sẽ giúp bạn
              có trải nghiệm mua sắm thời trang dễ dàng và thú vị. Cảm ơn bạn đã đồng hành cùng{' '}
              <strong className='text-primary'>Elegante</strong>!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
