import { useState, useRef, useEffect } from "react";
import Label from "./components/label";
import { Kota } from "./datadummy.js/kota";
import { Switch } from "@headlessui/react";
import SelectSearch from "react-select-search";
import { useSelect } from "react-select-search";
import CustomSelect from "./components/selectcust";
import Link from "next/link";
import { useRouter } from "next/router";
import SelectKota from "./components/selectKota";
import Calender from "./components/Calender";

export default function Home() {
  const [state, setState] = useState(Kota);
  const [search, setSearch] = useState("");
  const [click, setClick] = useState(false);
  const [click2, setClick2] = useState(false);

  const Router = useRouter();
  // data submit
  const [status, setStatus] = useState();
  const [pakta, setPakta] = useState("no");
  const [pph, setPph] = useState("no");
  const [image, setImage] = useState(null);
  const [nama, setNama] = useState("");
  const [telp, setTelp] = useState();
  const [fax, setFax] = useState();
  const [alamat, setAlamat] = useState("");
  const [kodepos, setKodePos] = useState();
  const [kodePerusahaan, setKodePerusahaan] = useState();
  const [kotaId, setKotaId] = useState();

  const [date, setDate] = useState({
    Fromdate: new Date().toISOString().slice(0,10),
    Todate: new Date().toISOString().slice(0,10)
  })

 const FromdateOnchange = (e) => {
    setDate({Fromdate:e.target.value})
  }

 const TodateOnchange = (e) => {
    setDate({Todate:e.target.value})
  }

  const StatusUpdate = (data) => {
    setStatus(data);
    setClick2(false);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("image", image);
    formData.append("kodePerusahaan", kodePerusahaan);
    formData.append("telepon", telp);
    formData.append("fax", fax);
    formData.append("Kode Pos", kodepos);
    formData.append("alamat", alamat);
    console.log(formData);

    console.log(
      "nama :",
      nama,
      "\n",
      "image :",
      image,
      "\n",
      "kodePerusahaan :",
      kodePerusahaan,
      "\n",
      "telepon :",
      telp,
      "\n",
      "fax :",
      fax,
      "\n",
      "kodepos :",
      kodepos,
      "\n",
      "alamat :",
      alamat,
      "\n",
      "status :",
      status,
      "\n",
      "Id Kota :",
      kotaId,
      "\n",
      "pakta:",
      pakta,
      "\n",
      "pph :",
      pph
    );
  };

   // "nama :",
                // values.nama, "\n",
                // "kode Perusahaan :",  parseInt(values.kodePerusahaan), "\n",
                // "Telepon :",  parseInt(values.telp), "\n",
                // "alamat :", values.alamat, "\n",
                // "fax :",  parseInt(values.fax), "\n",
                // "Kode Pos :",  parseInt(values.kodePos), "\n",
  return (
    <div>
      <div className="w-auto h-full pb-24 rounded- bg-white mx-2 lg:mx-72 my-2">
        <div>
          <div className="text-center text-2xl pt-4">Add Perusahaan</div>

          <a onClick={() => Router.push("/form")}>form validation</a>

          <form onSubmit={handleOnSubmit} className="px-11 md:px-20">
            {/*logo perusahaan */}
            <div className="mt-5 py-2 flex flex-col ">
              <Label htmlFor="image">Foto </Label>
              <input
                className="border p-1.5 "
                type="file"
                id="image"
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setImage(e.target.files[0]);
                }}
              />
            </div>

            {/*Kode Perusahaan */}
            <div className="mt-1 flex flex-col ">
              <Label htmlFor="kodePerusahaan">Kode Perusahaan </Label>
              <input
                className="border p-1.5 placeholder:text-xs"
                type="text"
                id="kodePerusahaan"
                value={kodePerusahaan}
                onChange={(e) => setKodePerusahaan(e.target.value)}
              />
            </div>

            {/* Nama Perusahaan  */}
            <div className=" mt-1 flex flex-col ">
              <Label> Nama Perusahaan </Label>
              <input
                className="border p-1.5 placeholder:text-xs"
                type="text"
                id="nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>

            {/* Telpon */}
            <div className=" mt-1 flex flex-col">
              <Label>Telepon </Label>
              <input
                className="border p-1.5 placeholder:text-xs"
                type="text"
                id="telp"
                value={telp}
                onChange={(e) => setTelp(e.target.value)}
              />
            </div>

            {/* fax */}
            <div className="mt-1 flex flex-col ">
              <Label>Fax </Label>
              <input
                className="border p-1.5 placeholder:text-xs"
                type="text"
                id="fax"
                value={fax}
                onChange={(e) => setFax(e.target.value)}
              />
            </div>

            {/* alamat rumah */}
            <div className="mt-1 flex flex-col ">
              <Label>Alamat </Label>
              <textarea
                className="border p-1 placeholder:text-xs"
                type="textarea"
                id="alamat"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              />
            </div>

            {/* nama kota */}
            <div className="mt-1 flex flex-col ">
              <Label>Kota </Label>
              <SelectKota setKotaId={setKotaId} />
            </div>
            {/* <div className="mt-1 flex flex-col ">
            
              
               <input 
          className="border p-1.5 placeholder:text-black hover:cursor-pointer "
          placeholder="Padang"
          name = "kotaId"
          type="input"
          value={search}  
          onChange={(event) => setSearch(event.target.value) }
          onClick={()=> setClick(!click)}
        />
    
          <div ref={wrapperRef} className={`${click ? 'block' : 'hidden'} ${search ? "h-auto" : "h-28"}  rounded-sm p-2 hover:cursor-pointer  w-full border mt-2 overflow-y-scroll`}>
        
          {DataSearch.map((item) => (
             <div key={item.id} onClick={()=> setSearch(item.kota)} >{item.kota}</div>
          ))}
            </div>
            </div> */}

            {/* kode pos */}
            <div className="mt-2 flex flex-col ">
              <Label>Kode Pos </Label>
              <input
                className="border p-1.5 placeholder:text-xs"
                type="text"
                id="kodepos"
                value={kodepos}
                onChange={(e) => setKodePos(e.target.value)}
              />
            </div>

            {/* Switch */}
            <div className="border-b my-7 py-3 font-bold">Setting</div>

            {/* pakta */}
            <div className="flex">
              <div className="justify-start flex w-full">
                <Label>Pakta Integritas</Label>
              </div>
              <div className="justify-end flex w-full">
                <div className="mx-2">
                  <Switch
                    onChange={() => {
                      if (pakta == "no") {
                        setPakta("ya");
                      } else {
                        setPakta("no");
                      }
                    }}
                    className={`${
                      pakta === "ya" ? "bg-black" : "bg-red-300"
                    } relative inline-flex h-4 w-8 items-center rounded-full`}
                  >
                    <span className="sr-only">Enable notifications</span>
                    <span
                      className={`${
                        pakta === "ya"
                          ? "translate-x-4 bg-white"
                          : "translate-x-1 bg-red-500"
                      } inline-block h-3 w-3 transform rounded-full duration-300`}
                    />
                  </Switch>{" "}
                </div>
                <div>{pakta === "ya" ? "Yes" : "no"} </div>
              </div>
            </div>

            {/* PPH */}
            <div className="flex">
              <div className="justify-start flex w-full">
                <Label>PPH Agreement</Label>
              </div>
              <div className="justify-end flex w-full">
                <div className="mx-2">
                  <Switch
                    onChange={() => {
                      if (pph == "no") {
                        setPph("ya");
                      } else {
                        setPph("no");
                      }
                    }}
                    className={`${
                      pph === "ya" ? "bg-black" : "bg-red-300"
                    } relative inline-flex h-4 w-8 items-center rounded-full`}
                  >
                    <span className="sr-only">Enable notifications</span>
                    <span
                      className={`${
                        pph === "ya"
                          ? "translate-x-4 bg-white"
                          : "translate-x-1 bg-red-500"
                      } inline-block h-3 w-3 transform rounded-full duration-300`}
                    />
                  </Switch>{" "}
                </div>
                <div>{pph === "ya" ? "Yes" : "no"} </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col ">
              <Label>status </Label>

              <CustomSelect setStatus={setStatus} status={status} />
            </div>

            {/* calender */}
            <Calender
            stateFrom={date.Fromdate} stateTo={date.Todate} FromDate={FromdateOnchange} ToDate={TodateOnchange}/>

            {/* tombol */}
            <button
              type="onSubmit"
              className="my-11 w-full p-2 hover:cursor-pointer bg-red-500 text-sm text-white rounded-xl"
            >
              Tambahkan Perusahaan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
