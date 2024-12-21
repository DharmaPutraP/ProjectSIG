//import function Link yang ada pada react router dom
// untuk menangani navigasi
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      {/* melakukan pembagian layout kerja menjadi 2 menggunakan flex */}
      <div className="pt-[2rem] sm:pt-[5rem] flex flex-col sm:flex-row sm:justify-center w-full">
        {/* membuat wave pada background halaman kita */}
        <div className="hidden sm:block absolute bottom-0 left-0 w-full z-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full"
          >
            <path
              fill="#7ed3fc"
              fillOpacity="1"
              d="M0,256L48,250.7C96,245,192,235,288,229.3C384,224,480,224,576,202.7C672,181,768,139,864,106.7C960,75,1056,53,1152,37.3C1248,21,1344,11,1392,5.3L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        {/* Layout pertama untuk teks dan pengenalan sekilas mengenai website  */}
        <div className="relative w-full text-center sm:text-left sm:w-2/5 z-1">
          <p className="text-3xl sm:text-5xl font-semibold leading-tight mb-[3rem]">
            Selamat Datang di Peta Persebaran Perumahan{" "}
            <span className="inline-block relative">
              Pekanbaru{" "}
              <img
                src="/curve.png"
                className="absolute top-full left-0 w-full"
                width={500}
                height={20}
                alt="Curve"
              />
            </span>
          </p>
          <p className="text-gray-900 mb-[1rem]">
            Temukan informasi mengenai lokasi perumahan di kota Pekanbaru dengan
            mudah.
          </p>

          {/* menambahkan button untuk pengguna dapat navigasi langsung ke halaman pencarian kita */}
          <Link to={"/detail"}>
            <button className="btn !font-semibold text-sm !px-[2rem] !py-[1rem]">
              Mulai Explore
            </button>
          </Link>
        </div>

        {/* Layout kerja kedua yang berisi icon perumahan */}
        <div className="relative mt-10 sm:mt-0 z-1">
          <img src="/houseIcon.svg" width={600} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
