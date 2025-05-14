import * as React from 'react'

export default function OperatingPolicy() {
  return (
    <div className='py-20 flex justify-center items-center'>
      <div>
        <div className='text-[60px] font-bold text-primary uppercase text-center'>
          CHÍNH SÁCH HOẠT ĐỘNG
        </div>
        <div className='max-w-[1150px] mt-10'>
          <div className='text-[20px] pl-5 font-light'>
            Chào mừng quý khách đến với Elegante – nền tảng mua sắm thời trang nữ trực tuyến tiện
            lợi và hiện đại. Chúng tôi cam kết mang đến những sản phẩm thời trang chất lượng, thiết
            kế tinh tế và dịch vụ khách hàng tận tâm.
          </div>
          <div>
            <ol className='list-decimal pl-5'>
              <li className='mt-5 text-[20px] font-bold'>
                Phạm vi hoạt động
                <ul className='list-disc pl-5 font-light'>
                  <li>
                    Elegante phục vụ khách hàng trên toàn quốc, đảm bảo giao hàng đến mọi vùng miền
                    với chất lượng và tốc độ tốt nhất.
                  </li>
                </ul>
              </li>

              <li className='mt-5 text-[20px] font-bold'>
                Quy trình đặt hàng và xác nhận đơn
                <ul className='list-disc pl-5 font-light'>
                  <li>
                    Khách hàng có thể dễ dàng duyệt sản phẩm, chọn size, màu sắc và đặt hàng trực
                    tiếp trên website hoặc ứng dụng Elegante.
                  </li>
                  <li>
                    Sau khi hoàn tất đặt hàng, hệ thống sẽ gửi xác nhận đơn hàng và khách hàng có
                    thể theo dõi tình trạng đơn trên hệ thống.
                  </li>
                </ul>
              </li>

              <li className='mt-5 text-[20px] font-bold'>
                Phí vận chuyển và thời gian giao hàng
                <ul className='list-disc pl-5 font-light'>
                  <li>
                    Phí vận chuyển được tính tùy theo khu vực và có thể được miễn phí khi đạt giá
                    trị đơn hàng nhất định.
                  </li>
                  <li>
                    Elegante hợp tác cùng các đơn vị vận chuyển uy tín, đảm bảo thời gian giao hàng
                    nhanh chóng và chính xác.
                  </li>
                </ul>
              </li>

              <li className='mt-5 text-[20px] font-bold'>
                Cam kết chất lượng
                <ul className='list-disc pl-5 font-light'>
                  <li>
                    Sản phẩm của Elegante được chọn lọc kỹ lưỡng từ chất liệu đến đường may, nhằm
                    mang đến sự hài lòng tuyệt đối cho khách hàng.
                  </li>
                  <li>
                    Nếu có lỗi từ nhà sản xuất, chúng tôi cam kết hỗ trợ đổi trả hoặc hoàn tiền theo
                    chính sách dịch vụ.
                  </li>
                </ul>
              </li>

              <li className='mt-5 text-[20px] font-bold'>
                Chính sách đổi trả và khiếu nại
                <ul className='list-disc pl-5 font-light'>
                  <li>
                    Khách hàng có thể yêu cầu đổi trả sản phẩm trong vòng 7 ngày kể từ ngày nhận
                    hàng, với điều kiện sản phẩm chưa qua sử dụng.
                  </li>
                  <li>
                    Mọi phản hồi, khiếu nại sẽ được tiếp nhận và xử lý trong vòng 1–2 ngày làm việc
                    bởi bộ phận chăm sóc khách hàng của Elegante.
                  </li>
                </ul>
              </li>
            </ol>
            <div className='mt-10 text-[25px] font-bold text-center'>
              Cảm ơn quý khách đã tin tưởng và lựa chọn{' '}
              <strong className='text-primary'>Elegante</strong>. Chúng tôi luôn nỗ lực mang đến
              trải nghiệm mua sắm thời trang tuyệt vời và đẳng cấp cho bạn!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
