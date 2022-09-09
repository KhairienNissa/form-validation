import React, { useState, useRef } from "react";
import {
  Formik,
  Field,
  Form,
  yupToFormErrors,
  FieldArray,
  ErrorMessage,
} from "formik";
import Label from "./components/label";
import * as Yup from "yup";
import CustomSelect from "./components/selectcust";
import SelectKota from "./components/selectKota";
import SwitchPph from "./components/switchPph";
import { Button, Switch } from "@mui/material";
import Upload from "./components/upload";
import Calender from "./components/Calender";

function Formformik() {
  const SignupSchema = Yup.object().shape({
    logo: Yup.mixed()
      .required("Logo is Required!")
      .test(
        "fileSize",
        "Your file is too big :(",
        (value) => value && value.size <= 1024 * 1024
        //1kb
      ),
    nama: Yup.string()
      .min(8, "Must be more than 8 characters")
      .required("name is required !"),
    telp: Yup.number().required("name is required !"),
    alamat: Yup.string()
      .max(140, "character is limit")
      .required("Alamat is required "),
    kotaId: Yup.number().required("kotaId is required"),
    fax: Yup.number().required("Fax is required !"),
    kodePos: Yup.number()
      .max(100000, "ga boleh lebih dari 5 karakter")
      .required("Kode pos is required !"),
    pph: Yup.string(),
    pakta: Yup.string(),
    status: Yup.number().required(),
    radioButton: Yup.string().required("radioButton is required !"),
    sertifikasi: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Required"),
        startDate: Yup.date().required("startdate is required !"),
        endDate: Yup.date()
          .required("startdate is required !")
          .min(
            Yup.ref("startDate"),
            ({ min }) => `Date needs to be after start date!!`
          ),
      })
    ),
    fromDate: Yup.date().required("start date is required"),
    tooDate: Yup.date()
      .when("fromDate", (fromDate, schema) => {
        return schema.test({
          test: (tooDate) => new Date(fromDate) < new Date(tooDate),
          message: "tooDate should be > fromDate",
        });
      }).required(),
  });

  function formatDate(date) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
  }
  function addDays(_date, days) {
    const date = new Date(_date);
    date.setDate(date.getDate() + days);
    return date;
  }

  return (
    <div>
      {/* kiri */}
      <div className="w-[100%] h-[100vh] flex ">
        <div className="h-full hidden md:block w-8/12 bg-[url('../public/buildingdua.jpg')] bg-cover overflow-hidden ">
          <div className="rounded-md py-5 my-[30%] mx-auto bg-white w-80 border-4 border-[#A48668] text-[#A48668] text-center h-auto">
            Form with Formik
          </div>
        </div>

        {/* kanan */}
        <div className="h-full overflow-y-scroll overflow-x-hidden  md:w-4/12 bg-white">
          <div className="w-full py-4 bg-[#A48668] text-center text-white text-sm">
            Pendaftaran Sertifikasi Perusahaan
          </div>
          <Formik
            initialValues={{
              nama: "",
              logo: "",
              kodePerusahaan: "",
              telp: "",
              alamat: "",
              kotaId: "",
              fax: "",
              kodePos: "",
              pph: "no",
              pakta: "no",
              status: "",
              warna: {},
              sertifikasi: [{ title: "", startDate: "", endDate: "" }],
              radioButton: "",
              date: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { resetForm }) => {
              console.log(
                "nama :",
                values.nama,
                "\n",
                "Logo :",
                values.logo,
                "\n",

                "Telepon :",
                values.telp,
                "\n",
                "alamat :",
                values.alamat,
                "\n",
                "Id Kota :",
                values.kotaId,
                "\n",
                "fax :",
                values.fax,
                "\n",
                "Kode Pos :",
                values.kodePos,
                "pakta :",
                "\n",
                values.pakta,
                "\n",
                "pph :",
                values.pph,
                "\n",
                "status : ",
                values.status,
                "\n",
                "warna :",
                values.warna,
                "\n",
                "sertifikasi :",
                values.sertifikasi,
                "\n",
                "From Date:",
                values.fromDate,
                "\n",
                "To Date :",
                values.tooDate,
                "\n",
                "jenis perusahaan :",
                values.radioButton
              );
              alert(JSON.stringify(values, null, 2));
              resetForm({ values: "" });
            }}
          >
            {({
              errors,
              touched,
              values,
              setFieldValue,
              handleBlur,
              handleSubmit,
            }) => (
              <Form className="px-16 md:px-11 pt-3">
                {/* logo Perusahaan */}
                <div className=" mt-1 flex flex-col  my-2">
                  <label className="text-[#A48668] text-xs pb-3" htmlFor="logo">
                    {" "}
                    logo Perusahaan
                    <Field
                      className="border placeholder:text-xs"
                      name="logo"
                      component={Upload}
                      setFieldValue={setFieldValue}
                      onBlur={handleBlur}
                    />
                  </label>
                  {errors.logo && touched.logo ? (
                    <div className=" text-red-500 w-full text-xs">
                      {errors.logo}
                    </div>
                  ) : null}
                </div>

                {/* Nama Perusahaan */}
                <div className=" mt-1 flex flex-col  my-2">
                  <Label htmlFor="nama"> Nama Perusahaan </Label>
                  <Field
                    className="border p-1.5 placeholder:text-xs"
                    type="text"
                    id="nama"
                    name="nama"
                  />
                  {errors.nama && touched.nama ? (
                    <div className=" text-red-500 w-full text-xs">
                      {errors.nama}
                    </div>
                  ) : null}
                </div>

                {/* telp Perusahaan */}
                <div className=" mt-1 flex flex-col  my-2">
                  <Label htmlFor="telp"> telepon </Label>
                  <Field
                    className="border p-1.5 placeholder:text-xs"
                    type="text"
                    id="telp"
                    name="telp"
                  />
                  {errors.telp && touched.telp ? (
                    <div className=" text-red-500 w-full text-xs">
                      {errors.telp}
                    </div>
                  ) : null}
                </div>

                {/* telp Perusahaan */}
                <div className=" mt-1 flex flex-col  my-2">
                  <Label htmlFor="fax"> Fax </Label>
                  <Field
                    className="border p-1.5 placeholder:text-xs"
                    type="text"
                    id="fax"
                    name="fax"
                  />
                  {errors.fax && touched.fax ? (
                    <div className=" text-red-500 w-full text-xs">
                      {errors.fax}
                    </div>
                  ) : null}
                </div>

                {/* alamat Perusahaan */}
                <div className="  mt-1 flex flex-col  my-2">
                  <Label htmlFor="alamat"> Alamat </Label>
                  <Field
                    as="textarea"
                    id="alamat"
                    name="alamat"
                    className="border p-1.5"
                  />
                  {errors.alamat && touched.alamat ? (
                    <div className=" text-red-500 w-full text-xs">
                      {errors.alamat}
                    </div>
                  ) : null}
                </div>

                {/* status Perusahaan */}
                <div className=" mt-1 flex flex-col  my-2">
                  <Label htmlFor="kodePos"> status perusahaan </Label>
                  {/* <CustomSelect /> */}
                  <Field name="kotaId" component={SelectKota} />

                  {errors.status && touched.status ? (
                    <div className=" text-red-500 w-full text-xs">
                      {errors.status}
                    </div>
                  ) : null}
                </div>

                {/* kode pos Perusahaan */}
                <div className=" mt-1 flex flex-col  my-2">
                  <Label htmlFor="kodePos"> Kode Pos </Label>
                  <Field
                    className="border p-1.5 placeholder:text-xs "
                    type="text"
                    id="kodePos"
                    name="kodePos"
                  />
                  {errors.kodePos && touched.kodePos ? (
                    <div className=" text-red-500 w-full text-xs">
                      {errors.kodePos}
                    </div>
                  ) : null}
                </div>

                {/* pakta */}
                <div className="flex  my-2">
                  <div className="justify-start flex w-full">
                    <Label>Pakta Integritas</Label>
                  </div>
                  <div className="justify-end flex w-full">
                    <div className="mx-2 ">
                      <Switch
                        name="pakta"
                        checked={values.pakta === "ya"}
                        onChange={(event, checked) => {
                          setFieldValue("pakta", checked ? "ya" : "no");
                        }}
                      />
                    </div>
                    <div className="mt-3 -ml-2 text-xs text-[#A48668] ">
                      {values.pakta === "ya" ? "Yes" : "no"}{" "}
                    </div>
                  </div>
                </div>

                {/* pph */}
                <div className="flex -mt-4">
                  <div className="justify-start flex w-full">
                    <Label>PPH Agreement</Label>
                  </div>
                  <div className="justify-end flex w-full -mt-1">
                    <div className="mx-2">
                      <Switch
                        name="pph"
                        checked={values.pph === "ya"}
                        onChange={(event, checked) => {
                          setFieldValue("pph", checked ? "ya" : "no");
                        }}
                      />
                    </div>
                    <div className="mt-3 -ml-2 text-xs text-[#A48668]">
                      {values.pph === "ya" ? "Yes" : "no"}{" "}
                    </div>
                  </div>
                </div>

                {/* status Perusahaan */}
                <div className=" mt-1 flex flex-col  my-2">
                  <Label htmlFor="kodePos"> status perusahaan </Label>
                  {/* <CustomSelect /> */}
                  <Field name="status" component={CustomSelect} />

                  {errors.status && touched.status ? (
                    <div className=" text-red-500 w-full text-xs">
                      {errors.status}
                    </div>
                  ) : null}
                </div>

                {/* warna logo */}
                <div className=" mt-1 flex flex-col  my-2">
                  <Label>Warna Logo perusahaan</Label>
                  <div className="flex flex-col text-[#A48668] text-xs">
                    <label className="mr-3 my-1 flex">
                      <Field type="checkbox" name="warna" value="biru" />
                      <p className="ml-2">biru</p>
                    </label>
                    <label className="mr-3 my-1 flex">
                      <Field type="checkbox" name="warna" value="merah" />
                      <p className="ml-2">merah</p>
                    </label>
                    <label className="mr-3 my-1 flex">
                      <Field type="checkbox" name="warna" value="kuning" />
                      <p className="ml-2">kuning</p>
                    </label>
                    <label className="mr-3 my-1 flex">
                      <Field type="checkbox" name="warna" value="putih" />
                      <p className="ml-2">putih</p>
                    </label>
                    <label className="mr-3 my-1 flex">
                      <Field type="checkbox" name="warna" value="hitam" />
                      <p className="ml-2">hitam</p>
                    </label>
                    <label className="mr-3 my-1 flex">
                      <Field type="checkbox" name="warna" value="oren" />
                      <p className="ml-2">oren</p>
                    </label>
                    <label className="mr-3 my-1 flex">
                      <Field type="checkbox" name="warna" value="ungu" />
                      <p className="ml-2">ungu</p>
                    </label>
                  </div>

                  {/* {errors.warna && touched.warna ? (
                    <div className=" text-red-500 w-full text-xs">
                      {errors.warna}
                    </div>
                  ) : null} */}
                </div>

                {/* sertifikasi perusahaan */}
                <div className="flex flex-col w-full my-2">
                  <Label>Sertifikasi</Label>
                  <FieldArray name="sertifikasi">
                    {({ insert, remove, push }) => (
                      <div>
                        {values.sertifikasi.length > 0 &&
                          values.sertifikasi.map((sertifikasi, index) => (
                            <div className="flex flex-col">
                              <label  className="text-[#A48668] text-xs pb-3"  htmlFor={`sertifikasi.${index}.title`}>
                                Title
                              </label>{" "}
                              <Field
                                type="text"
                                name={`sertifikasi.${index}.title`}
                                placeholder="title"
                                className="border mb-2 p-1.5"
                              />
                              <div className=" text-red-500 w-full text-xs mb-2">
                                <ErrorMessage
                                  name={`sertifikasi.${index}.title`}
                                />
                              </div>
                              <div className="grid-cols-2 w-full  ">
                              <label  className="text-[#A48668] text-xs pb-3"  htmlFor={`sertifikasi.${index}.title`}>
                                Title
                              </label>{" "} 
                                <Field
                                  type="date"
                                  name={`sertifikasi.${index}.startDate`}
                                  placeholder="start date"
                                  className="border mb-2 mr-3 w-5/12 p-3 text-xs"
                                />
                                <div className=" text-red-500 w-full text-xs mb-2">
                                  <ErrorMessage
                                    name={`sertifikasi.${index}.startDate`}
                                  />
                                </div>
                                <Field
                                  type="date"
                                  name={`sertifikasi.${index}.endDate`}
                                  placeholder="end Date"
                                  className="border mb-2  w-5/12 p-3 text-xs"
                                />
                                <div className=" text-red-500 w-full text-xs mb-2">
                                  <ErrorMessage
                                    name={`sertifikasi.${index}.endDate`}
                                  />
                                </div>
                              </div>
                              <div className="flex">
                                <button
                                  type="button"
                                  className="p-1 h-auto  bg-red-400 text-white w-7 text-sm"
                                  onClick={() => remove(index)}
                                >
                                  x
                                </button>
                              </div>
                            </div>
                          ))}{" "}
                        <button
                          type="button"
                          className="p-1 h-auto  bg-blue-400 text-white w-36 text-sm"
                          onClick={() =>
                            push({
                              title: "",
                              startDate: "",
                              endDate: "",
                            })
                          }
                        >
                          Add Sertifikasi
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>

                {/* tanggal */}
                <div className="grid-cols-2 w-full  ">
                  <Field
                    type="date"
                    name="fromDate"
                    min={formatDate(new Date())}
                    max={
                      values.tooDate && formatDate(addDays(values.tooDate, -1))
                    }
                    placeholder="start date"
                    className="border mb-2 mr-3 w-5/12 p-3 text-xs"
                  />
                  <div className=" text-red-500 w-full text-xs mb-2">
                    <ErrorMessage name="fromDate" />
                  </div>

                  <Field
                    type="date"
                    name="tooDate"
                    placeholder="end Date"
                    min={values.fromDate}
                    className="border mb-2  w-5/12 p-3 text-xs"
                  />
                  <div className=" text-red-500 w-full text-xs mb-2">
                    <ErrorMessage name="tooDate" />
                  </div>
                </div>

                {/* jenis perusahaan */}
                <div className=" mt-1 flex flex-col  my-2">
                  <Label>Jenis Perusahaan</Label>
                  <div className="flex flex-col">
                    <label className=" my-2 ">
                      <Field type="radio" name="radioButton" value="persero" />
                      Persero
                    </label>
                    <label className="my-2 ">
                      <Field type="radio" name="radioButton" value="startup" />
                      Start Up
                    </label>
                    <label className="my-2 ">
                      <Field type="radio" name="radioButton" value="bumn" />
                      BUMN
                    </label>
                    <label className="my-2 ">
                      <Field
                        type="radio"
                        name="radioButton"
                        value="corporate"
                      />
                      Corporate
                    </label>
                    <label className="my-2 ">
                      <Field type="radio" name="radioButton" value="firma" />
                      Firma
                    </label>
                  </div>

                  {errors.radioButton && touched.radioButton ? (
                    <div className=" text-red-500 w-full text-xs">
                      {errors.radioButton}
                    </div>
                  ) : null}
                </div>

                {/* tombol */}
                <button
                  type="submit"
                  className="my-11 w-full p-2 hover:cursor-pointer bg-red-500 text-sm text-white rounded-xl"
                >
                  Tambahkan Perusahaan
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Formformik;
