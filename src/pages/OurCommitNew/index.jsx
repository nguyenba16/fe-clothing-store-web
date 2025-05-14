import * as React from 'react'

const OurCommit = () => {
  return (
    <div className='py-20 flex justify-center items-center'>
      <div>
        <div className='text-[60px] font-bold text-primary uppercase text-center'>
          CAM KẾT CỦA ELEGANTE
        </div>
        <div className='mb-10 text-primary font-medium text-[25px] text-center'>
          Chọn Elegante – Tôn Vinh Vẻ Đẹp Nữ Tính
        </div>
        <div className='max-w-[1150px]'>
          <div className='text-[20px] font-light'>
            Tại Elegante, chúng tôi không chỉ mang đến những bộ trang phục thời trang mà còn là sự
            tự tin và phong cách dành cho mọi phụ nữ hiện đại. Dưới đây là những cam kết mà Elegante
            luôn giữ vững:
          </div>
          <div>
            <ol className='list-decimal pl-5'>
              <li className='mt-5 text-[20px] font-bold'>
                Chất Lượng Vải Vượt Trội
                <div className='font-light'>
                  Mỗi sản phẩm của Elegante được lựa chọn tỉ mỉ từ chất liệu đến từng đường may:
                </div>
                <ul className='list-disc pl-10'>
                  <li className='font-light'>Vải cao cấp, mềm mại, thoáng mát và bền đẹp.</li>
                  <li className='font-light'>Đường may tinh tế, đảm bảo độ hoàn thiện cao.</li>
                  <li className='font-light'>Thiết kế tôn dáng, phù hợp nhiều phong cách.</li>
                </ul>
              </li>
              <li className='mt-5 text-[20px] font-bold'>
                Giá Thành Hợp Lý – Ưu Đãi Hấp Dẫn
                <div className='font-light'>
                  Elegante mong muốn mọi khách hàng đều có thể sở hữu thời trang chất lượng:
                </div>
                <ul className='list-disc pl-10'>
                  <li className='font-light'>Mức giá cạnh tranh, phù hợp túi tiền.</li>
                  <li className='font-light'>Ưu đãi hấp dẫn vào các dịp đặc biệt.</li>
                  <li className='font-light'>Chính sách tích điểm cho khách hàng thân thiết.</li>
                </ul>
              </li>
              <li className='mt-5 text-[20px] font-bold'>
                Giao Hàng Nhanh – Đổi Trả Dễ Dàng
                <div className='font-light'>
                  Chúng tôi luôn đặt trải nghiệm mua sắm của bạn lên hàng đầu:
                </div>
                <ul className='list-disc pl-10'>
                  <li className='font-light'>Giao hàng toàn quốc nhanh chóng và đúng hẹn.</li>
                  <li className='font-light'>Chính sách đổi trả trong vòng 7 ngày linh hoạt.</li>
                  <li className='font-light'>Hỗ trợ tư vấn tận tâm trước và sau khi mua.</li>
                </ul>
              </li>
            </ol>
            <div className='text-center mt-10 text-[25px] font-bold'>
              Với tất cả những cam kết trên, <strong className='text-primary'>Elegante</strong> tự
              hào đồng hành cùng bạn trên hành trình khẳng định phong cách và vẻ đẹp riêng!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurCommit
