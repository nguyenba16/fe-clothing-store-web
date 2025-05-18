import * as React from 'react'

export default function ContactInstructions() {
  return (
    <div className='py-20 flex justify-center items-center'>
      <div>
        <div className='text-[60px] font-bold text-primary uppercase text-center'>
          HƯỚNG DẪN LIÊN HỆ
        </div>
        <div className='max-w-[1150px] mt-10'>
          <div className='text-[20px] pl-5 font-light'>
            Elegante luôn sẵn sàng hỗ trợ quý khách trong quá trình mua sắm. Nếu bạn cần tư vấn sản
            phẩm, hỗ trợ đơn hàng hoặc phản hồi dịch vụ, vui lòng tham khảo các phương thức liên hệ
            dưới đây:
          </div>
          <div>
            <ol className='list-decimal pl-5'>
              <li className='mt-5 text-[20px] font-bold'>
                Liên hệ qua tổng đài chăm sóc khách hàng
                <ul className='list-disc pl-5 font-light'>
                  <li>Số điện thoại: 0338963327</li>
                  <li>Phí gọi: Miễn phí</li>
                  <li>
                    Hỗ trợ: Tư vấn sản phẩm, cập nhật đơn hàng, đổi trả và các vấn đề liên quan đến
                    dịch vụ khách hàng.
                  </li>
                </ul>
              </li>

              <li className='mt-5 text-[20px] font-bold'>
                Liên hệ qua email
                <ul className='list-disc pl-5 font-light'>
                  <li>Email hỗ trợ: elegante.support@gmail.com</li>
                  <li>Thời gian phản hồi: Trong vòng 1-2 ngày làm việc</li>
                  <li>
                    Vui lòng gửi kèm họ tên, số điện thoại, mã đơn hàng (nếu có) và nội dung cần hỗ
                    trợ để chúng tôi xử lý nhanh hơn.
                  </li>
                </ul>
              </li>

              <li className='mt-5 text-[20px] font-bold'>
                Quy trình xử lý khiếu nại
                <ul className='list-disc pl-5 font-light'>
                  <li>
                    Bước 1: Gửi thông tin khiếu nại qua tổng đài hoặc email hỗ trợ của Elegante.
                  </li>
                  <li>Bước 2: Bộ phận CSKH xác minh nội dung và thông tin liên quan.</li>
                  <li>
                    Bước 3: Chúng tôi phản hồi và đưa ra giải pháp phù hợp trong vòng 24 – 48 giờ.
                  </li>
                  <li>
                    Bước 4: Thông báo kết quả giải quyết đến khách hàng qua phương thức đã cung cấp.
                  </li>
                </ul>
              </li>
            </ol>
            <div className='mt-10 text-[25px] font-bold text-center'>
              Cảm ơn bạn đã tin tưởng và lựa chọn <strong className='text-primary'>Elegante</strong>
              . Chúng tôi luôn đồng hành để mang lại trải nghiệm mua sắm thời trang nữ hiện đại và
              tận tâm nhất!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
