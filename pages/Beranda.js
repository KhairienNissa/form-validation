import React from "react";
import { useRouter } from "next/router";

function Beranda() {
  const Router = useRouter();
  return (
    <>
      <div className="bg-[url('../public/buldingsatu.jpg')] w-[100%] h-screen bg-cover ">
        <div className="md:pt-36 pt-44">
          <div className="bg-white mx-auto  md:h-80 md:w-80 w-64 h-64 border-2 border-[#174963]">
            <div className="text-center my-14 md:my-20">
              <button
                onClick={() => Router.push("/normalState")}
                className="mx-auto w-auto h-auto py-5 px-6 rounded-xl text-sm bg-[#587087] text-white md:w-48 "
              >
                Form with State
              </button>
              <button
                onClick={() => Router.push("/formformik")}
                className="mx-auto my-3 w-auto h-auto p-5 rounded-xl text-sm bg-[#587087] md:w-48 text-white "
              >
                Form with Formik
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Beranda;
