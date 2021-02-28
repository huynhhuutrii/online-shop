import React, { Component } from 'react';
import styles from "./styles.module.scss";
import logo from "../../assets/img/logo.jpg";
import iconfooter from "../../assets/img/iconfooter.png";
export default class Footer extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.row}>
          <img src={iconfooter} alt="..." />
          <div>BẠN ĐANG BĂN KHOĂN VỀ THIẾT KẾ NỘI THẤT
          VÀ MUỐN TÌM HIỂU THÊM THÔNG TIN?
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.col1}>
            <img src={logo} alt="..." />
            <div style={{ fontWeight: "500" }}>Chủ quản:<span style={{ fontWeight: "normal" }}>Trí Jerry</span></div>
            <div style={{ fontWeight: "500" }}> Mã số doan nghiệp:<span style={{ fontWeight: "normal" }}>0920389208</span></div>

            <div style={{ fontWeight: "500" }}>Trụ sở:<span style={{ fontWeight: "normal" }}>1/199,Hòa Lân 2, Thuận Giao, Thuận An, Bình Dương</span></div>
            <div style={{ fontWeight: "500" }}>Hotline:<span style={{ fontWeight: "normal" }}>0969060473 <span>-</span></span><span style={{ fontWeight: "500" }}>Email:</span><span style={{ fontWeight: "normal" }}>huynhtri2k11@gamil.com</span> </div>
          </div>
          <div className={styles.col2}>
            <label style={{ color: "#00315C", fontSize: "20px", marginBottom: "20px" }}>Về HTSHOP.VN</label>
            <div>Giới thiệu </div>
            <div>Tuyển dụng</div>
            <div>Quy chế hoạt động</div>
            <div>Bảo mật thông tin</div>
            <div>Giải quyết tranh chấp khiếu nại</div>
          </div>

          <div className={styles.col3}>
            <label style={{ color: "#00315C", fontSize: "20px", marginBottom: "20px" }}>Hỗ trợ người mua</label>
            <div>Đăng ký / Đăng Nhập</div>
            <div>Hướng dẫn mua hàng</div>
            <div>Chính sách giao hàng và thanh toán</div>
            <div>Chính sách đổi trả và bảo hành</div>
            <div>Chính sách giải quyết khiếu nại</div>
          </div>
        </div>
      </div >
    )
  }
}
