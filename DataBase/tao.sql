use QuanLyHeThongHocTap;
go

CREATE TABLE TaiKhoan (
    MaTaiKhoan INT IDENTITY(1,1) PRIMARY KEY,
    TenDangNhap NVARCHAR(50) UNIQUE NOT NULL,
    MatKhau NVARCHAR(255) NOT NULL,
    VaiTro NVARCHAR(20) NOT NULL CHECK (VaiTro IN ('NguoiHoc','GiaoVien','QuanTri')),
    TrangThai NVARCHAR(20) NOT NULL DEFAULT 'HoatDong' CHECK (TrangThai IN ('HoatDong','Khoa')),
    ThoiGianTao DATETIME DEFAULT GETDATE()
);

CREATE TABLE NguoiHoc (
    MaNguoiHoc INT IDENTITY(1,1) PRIMARY KEY,
    HoTen NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    TrinhDoHienTai NVARCHAR(50),
    PhongCachHoc NVARCHAR(50),
    MaTaiKhoan INT UNIQUE,
    FOREIGN KEY (MaTaiKhoan) REFERENCES TaiKhoan(MaTaiKhoan)
);


CREATE TABLE BaiHoc (
    MaBaiHoc INT IDENTITY(1,1) PRIMARY KEY,
    TieuDe NVARCHAR(200) NOT NULL,
    MoTa NVARCHAR(MAX),
    DoKho INT,
    ChuDe NVARCHAR(100)
);

CREATE TABLE CauHoi (
    MaCauHoi INT IDENTITY(1,1) PRIMARY KEY,
    MaBaiHoc INT,
    NoiDung NVARCHAR(MAX) NOT NULL,
    LoaiCauHoi NVARCHAR(50),
    DoKho INT,
    FOREIGN KEY (MaBaiHoc) REFERENCES BaiHoc(MaBaiHoc)
);


CREATE TABLE NoiDungHoc (
    MaNoiDung INT IDENTITY(1,1) PRIMARY KEY,
    MaBaiHoc INT,
    LoaiNoiDung NVARCHAR(50),
    DuongDanNoiDung NVARCHAR(MAX),
    FOREIGN KEY (MaBaiHoc) REFERENCES BaiHoc(MaBaiHoc)
);


CREATE TABLE HoatDongHocTap (
    MaHoatDong INT IDENTITY(1,1) PRIMARY KEY,
    MaNguoiHoc INT,
    MaBaiHoc INT,
    DiemSo FLOAT,
    ThoiGianLam INT,
    NgayThucHien DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MaNguoiHoc) REFERENCES NguoiHoc(MaNguoiHoc),
    FOREIGN KEY (MaBaiHoc) REFERENCES BaiHoc(MaBaiHoc)
);

CREATE TABLE KetQuaDanhGia (
    MaKetQua INT IDENTITY(1,1) PRIMARY KEY,
    MaNguoiHoc INT,
    MaBaiHoc INT,
    TongDiem FLOAT,
    ThoiGianHoanThanh DATETIME,
    MucDoThanhThao NVARCHAR(50),
    FOREIGN KEY (MaNguoiHoc) REFERENCES NguoiHoc(MaNguoiHoc),
    FOREIGN KEY (MaBaiHoc) REFERENCES BaiHoc(MaBaiHoc)
);


CREATE TABLE GoiYAI (
    MaGoiY INT IDENTITY(1,1) PRIMARY KEY,
    MaNguoiHoc INT,
    MaBaiHoc INT,
    DoTinCay FLOAT,
    ThoiGianGoiY DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MaNguoiHoc) REFERENCES NguoiHoc(MaNguoiHoc),
    FOREIGN KEY (MaBaiHoc) REFERENCES BaiHoc(MaBaiHoc)
);
