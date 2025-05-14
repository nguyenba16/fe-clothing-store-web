import * as React from 'react'

const PolicyAndRegulations = () => {
  return (
    <div className='py-20 flex justify-center items-center'>
      <div>
        <div className='text-[60px] font-bold text-primary uppercase text-center'>
          CHÍNH SÁCH VÀ QUY ĐỊNH
        </div>
        <div className='mb-10 text-primary font-medium text-[25px] text-center'>
          Điều khoản sử dụng dịch vụ tại Elegante
        </div>
        <div className='max-w-[1150px]'>
          <div className='text-[20px] font-light'>
            Khi mua sắm tại Elegante, bạn đồng ý tuân thủ các điều khoản và chính sách dưới đây nhằm
            đảm bảo quyền lợi và trải nghiệm mua hàng tối ưu.
          </div>
          <div>
            <ol className='list-decimal pl-5'>
              <li className='mt-5 text-[20px] font-bold'>
                Chính sách đặt hàng
                <ul className='list-disc pl-10 font-light'>
                  <li>Khách hàng có thể đặt hàng qua website hoặc ứng dụng Elegante.</li>
                  <li>Đơn hàng chỉ được xác nhận khi hệ thống phản hồi và gửi email thông báo.</li>
                  <li>
                    Thời gian xử lý đơn phụ thuộc vào sản phẩm và địa điểm giao hàng của khách.
                  </li>
                </ul>
              </li>

              <li className='mt-5 text-[20px] font-bold'>
                Chính sách thanh toán
                <ul className='list-disc pl-10 font-light'>
                  <li>
                    Chúng tôi chấp nhận thanh toán qua tiền mặt, thẻ ngân hàng hoặc ví điện tử.
                  </li>
                  <li>Tất cả giá niêm yết là giá cuối cùng, không phát sinh thêm chi phí.</li>
                  <li>
                    Hóa đơn điện tử sẽ được gửi qua email sau khi hoàn tất đơn hàng thành công.
                  </li>
                </ul>
              </li>

              <li className='mt-5 text-[20px] font-bold'>
                Chính sách giao hàng
                <ul className='list-disc pl-10 font-light'>
                  <li>Thời gian giao hàng từ 2–5 ngày làm việc tùy khu vực.</li>
                  <li>
                    Bạn có thể theo dõi trạng thái đơn hàng qua tài khoản khách hàng trên hệ thống.
                  </li>
                  <li>
                    Trong trường hợp giao hàng trễ do điều kiện đặc biệt, Elegante sẽ chủ động liên
                    hệ để thông báo.
                  </li>
                </ul>
              </li>

              <li className='mt-5 text-[20px] font-bold'>
                Chính sách đổi trả & hủy đơn
                <ul className='list-disc pl-10 font-light'>
                  <li>Khách hàng có thể hủy đơn hàng trong vòng 30 phút sau khi đặt.</li>
                  <li>
                    Sản phẩm lỗi kỹ thuật, sai mẫu hoặc không đúng mô tả được hỗ trợ đổi trong vòng
                    7 ngày.
                  </li>
                  <li>Không áp dụng hoàn tiền với lý do đổi ý sau khi nhận hàng.</li>
                </ul>
              </li>
            </ol>
            <div className='text-center mt-10 text-[25px] font-bold'>
              Elegante cam kết mang đến trải nghiệm mua sắm thời trang tuyệt vời cho khách hàng. Mọi
              thắc mắc vui lòng liên hệ với chúng tôi qua hotline hoặc email hỗ trợ!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PolicyAndRegulations
