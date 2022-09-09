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

const FormikReal = () => {
  // const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
  const [state, setState] = useState();

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
    kodePerusahaan: Yup.number()
      .min(1000, "Must be more than 3 characters")
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
    status: Yup.number(),

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

    password: Yup.string()
      .min(8, "Password must be at least 6 charaters")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol")
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      // )
      .required("Password is Required!"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Your Confirm Password mush match"
    ),
    fromDate: Yup.date().required("start date is required"),
    tooDate: Yup.date()
      .when("fromDate", (fromDate, schema) => {
        return schema.test({
          test: (tooDate) => new Date(fromDate) < new Date(tooDate),
          message: "tooDate should be > fromDate",
        });
      })
      .required(),
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
    <div className="bg-[url('../public/buldingsatu.jpg')] w-[100%] bg-center h-[100vh]">
      <div className="w-auto h-[100vh] pb-24 rounded- bg-white mx-2 lg:mx-72 my-2 overflow-scroll">
        <div className="text-center text-2xl pt-4">Add Perusahaan</div>
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
            pph: "",
            pakta: "",
            status: "",
            warna: {},
            sertifikasi: [{ title: "", startDate: "", endDate: "" }],
            radioButton: "",
            date: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { resetForm }) => {
            setState(
              "nama :",
              values.nama,
              "\n",
              "Logo :",
              values.logo,
              "\n",
              "kode Perusahaan :",
              values.kodePerusahaan,
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
              "pph :",
              "\n",
              values.pakta,
              "\n",
              "pph :",
              "\n",
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
              "password :",
              values.password,
              "\n",
              "confirm password :",
              values.confirmPassword,
              "\n",
              "confirm password :",
              values.fromDate,
              "\n",
              "confirm password :",
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
            <Form className="px-11 md:px-20">
              {/* logo Perusahaan */}
              <div className=" mt-1 flex flex-col  my-2">
                <Label htmlFor="logo"> logo Perusahaan </Label>
                <Field
                  className="border p-1.5 placeholder:text-xs"
                  // type="file"
                  // id="logo"
                  name="logo"
                  component={Upload}
                  setFieldValue={setFieldValue}
                  onBlur={handleBlur}
                />
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

              {/* password Perusahaan */}
              <div className=" mt-1 flex flex-col  my-2">
                <Label htmlFor="password"> Password Perusahaan </Label>
                <Field
                  className="border p-1.5 placeholder:text-xs"
                  type="password"
                  id="password"
                  name="password"
                />
                {errors.password && touched.password ? (
                  <div className=" text-red-500 w-full text-xs">
                    {errors.password}
                  </div>
                ) : null}
              </div>

              {/* konfirm password Perusahaan */}
              <div className=" mt-1 flex flex-col  my-2">
                <Label htmlFor="confirmPassword">
                  {" "}
                  Konfirmasi Password Perusahaan{" "}
                </Label>
                <Field
                  className="border p-1.5 placeholder:text-xs"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div className=" text-red-500 w-full text-xs">
                    {errors.confirmPassword}
                  </div>
                ) : null}
              </div>

              {/* kode Perusahaan */}
              <div className=" mt-1 flex flex-col  my-2">
                <Label htmlFor="kodePerusahaan"> Kode Perusahaan </Label>
                <Field
                  className="border p-1.5 placeholder:text-xs"
                  type="text"
                  id="kodePerusahaan"
                  name="kodePerusahaan"
                />
                {errors.kodePerusahaan && touched.kodePerusahaan ? (
                  <div className=" text-red-500 w-full text-xs">
                    {errors.kodePerusahaan}
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

              {/* pph */}
              <div className="flex  my-2">
                <div className="justify-start flex w-full">
                  <Label>Pakta Integritas</Label>
                </div>
                <div className="justify-end flex w-full">
                  <div className="mx-2">
                    <Switch
                      name="pakta"
                      value="Y"
                      checked={values.pakta === "ya"}
                      onChange={(event, checked) => {
                        setFieldValue("pakta", checked ? "ya" : "no");
                      }}
                    />
                  </div>
                  <div className="mt-2 -ml-2">
                    {values.pakta === "ya" ? "Yes" : "no"}{" "}
                  </div>
                </div>
              </div>

              {/* pph */}
              <div className="flex -mt-4">
                <div className="justify-start flex w-full">
                  <Label>PPH Agreement</Label>
                </div>
                <div className="justify-end flex w-full">
                  <div className="mx-2">
                    <Switch
                      name="pph"
                      value="Y"
                      checked={values.pph === "ya"}
                      onChange={(event, checked) => {
                        setFieldValue("pph", checked ? "ya" : "no");
                      }}
                    />
                  </div>
                  <div className="mt-2 -ml-2">
                    {values.pph === "ya" ? "Yes" : "no"}{" "}
                  </div>
                </div>
              </div>

              {/* status Perusahaan */}
              <div className=" mt-1 flex flex-col  my-2">
                <Label htmlFor="kodePos"> status perusahaan </Label>
                {/* <CustomSelect /> */}
                <Field name="status" component={CustomSelect} />

                {errors.kodePos && touched.kodePos ? (
                  <div className=" text-red-500 w-full text-xs">
                    {errors.kodePos}
                  </div>
                ) : null}
              </div>

              {/* warna logo */}
              <div className=" mt-1 flex flex-col  my-2">
                <Label>Warna Logo perusahaan</Label>
                <div className="flex">
                  <label className="mr-3 ">
                    <Field type="checkbox" name="warna" value="biru" />
                    biru
                  </label>
                  <label className="mr-3">
                    <Field type="checkbox" name="warna" value="merah" />
                    merah
                  </label>
                  <label className="mr-3">
                    <Field type="checkbox" name="warna" value="kuning" />
                    kuning
                  </label>
                  <label className="mr-3">
                    <Field type="checkbox" name="warna" value="putih" />
                    putih
                  </label>
                  <label className="mr-3">
                    <Field type="checkbox" name="warna" value="hitam" />
                    hitam
                  </label>
                  <label className="mr-3">
                    <Field type="checkbox" name="warna" value="oren" />
                    oren
                  </label>
                  <label className="mr-3">
                    <Field type="checkbox" name="warna" value="ungu" />
                    ungu
                  </label>
                </div>
                {/* 
                {errors.kodePos && touched.kodePos ? (
                  <div className=" text-red-500 w-full text-xs">{errors.kodePos}</div>
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
                            <label htmlFor={`sertifikasi.${index}.title`}>
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
                            <label >
                              Start Date
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
                    <Field type="radio" name="radioButton" value="corporate" />
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
  );
};

export default FormikReal;
